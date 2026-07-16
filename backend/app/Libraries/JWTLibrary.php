<?php

namespace App\Libraries;

use App\Config\JWT;

class JWTLibrary
{
    private string $secret;
    private int $accessExpiry;
    private int $refreshExpiry;
    private string $issuer;

    public function __construct()
    {
        $this->secret = JWT::getSecret();
        $this->accessExpiry = JWT::getAccessExpiry();
        $this->refreshExpiry = JWT::getRefreshExpiry();
        $this->issuer = JWT::getIssuer();
    }

    /**
     * Create an access token
     */
    public function createAccessToken(array $payload): string
    {
        $data = array_merge($payload, [
            'iat' => time(),
            'exp' => time() + $this->accessExpiry,
            'iss' => $this->issuer,
            'type' => 'access',
        ]);
        return $this->encode($data);
    }

    /**
     * Create a refresh token
     */
    public function createRefreshToken(array $payload): string
    {
        $data = array_merge($payload, [
            'iat' => time(),
            'exp' => time() + $this->refreshExpiry,
            'iss' => $this->issuer,
            'type' => 'refresh',
        ]);
        return $this->encode($data);
    }

    /**
     * Create both access and refresh tokens
     */
    public function createTokenPair(array $payload): array
    {
        return [
            'access_token' => $this->createAccessToken($payload),
            'refresh_token' => $this->createRefreshToken($payload),
            'token_type' => 'Bearer',
            'expires_in' => $this->accessExpiry,
        ];
    }

    /**
     * Validate a token
     */
    public function validate(string $token): ?array
    {
        $payload = $this->decode($token);

        if ($payload === null) {
            return null;
        }

        // Check expiry
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return null;
        }

        // Check issuer
        if (isset($payload['iss']) && $payload['iss'] !== $this->issuer) {
            return null;
        }

        return $payload;
    }

    /**
     * Decode a token without validation
     */
    public function decodeWithoutValidation(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [, $payloadB64] = $parts;
        $payload = $this->base64UrlDecode($payloadB64);
        return json_decode($payload, true);
    }

    /**
     * Encode payload to JWT
     */
    private function encode(array $data): string
    {
        $header = $this->base64UrlEncode(json_encode([
            'typ' => 'JWT',
            'alg' => 'HS256',
        ]));

        $payload = $this->base64UrlEncode(json_encode($data));
        $signature = $this->base64UrlEncode(
            hash_hmac('sha256', "$header.$payload", $this->secret, true)
        );

        return "$header.$payload.$signature";
    }

    /**
     * Decode JWT to payload
     */
    private function decode(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$header, $payload, $signature] = $parts;

        // Verify signature
        $expectedSignature = $this->base64UrlEncode(
            hash_hmac('sha256', "$header.$payload", $this->secret, true)
        );

        if (!hash_equals($expectedSignature, $signature)) {
            return null;
        }

        $decoded = json_decode($this->base64UrlDecode($payload), true);
        return is_array($decoded) ? $decoded : null;
    }

    /**
     * Base64 URL encode
     */
    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Base64 URL decode
     */
    private function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
