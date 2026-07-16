export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  appName: import.meta.env.VITE_APP_NAME || 'SCPHD',
  appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:8443',
  jwtStorageKey: 'scphd_access_token',
  refreshTokenKey: 'scphd_refresh_token',
  userKey: 'scphd_user',
  tokenRefreshThreshold: 60000,
}
