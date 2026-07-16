# SCPHD Backend Deployment Guide for cPanel

## Prerequisites
- cPanel hosting with PHP 8.2+ and MySQL
- Node.js (for building frontend locally)

## Backend Deployment Steps

### 1. Upload Backend Files
1. Compress the `backend/` folder into a `.zip` file
2. Upload to cPanel File Manager → `public_html/`
3. Extract the zip file

### 2. Directory Structure
After extraction, your `public_html/` should look like:
```
public_html/
├── app/
│   ├── Config/
│   ├── Controllers/
│   ├── Models/
│   ├── Libraries/
│   ├── Helpers/
│   ├── Filters/
│   ├── Database/
│   └── Enums/
├── public/
│   ├── index.php
│   └── .htaccess
└── .env
```

### 3. Configure .env
Edit `backend/.env` with your production settings:
```env
APP_BASE_URL=https://yourdomain.com/api
APP_ENV=production

DB_HOST=localhost
DB_NAME=your_cpanel_username_scphd
DB_USER=your_cpanel_username_scphd
DB_PASS=your_database_password
DB_PORT=3306

JWT_SECRET=your-random-64-character-secret-key-here
JWT_ACCESS_EXPIRY=900
JWT_REFRESH_EXPIRY=604800
JWT_ISSUER=https://yourdomain.com

CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 4. Create MySQL Database
1. Go to cPanel → MySQL Databases
2. Create a new database: `scphd`
3. Create a new user with a strong password
4. Add the user to the database with ALL PRIVILEGES
5. Import `backend/app/Database/database.sql` via phpMyAdmin

### 5. Configure Apache
The `.htaccess` file handles URL rewriting. Ensure `mod_rewrite` is enabled.

### 6. API Base URL
The API will be available at:
```
https://yourdomain.com/api/v1/auth/login
https://yourdomain.com/api/v1/programs
...
```

## Frontend Deployment (Vercel)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/scphd-frontend.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to vercel.com
2. Import your GitHub repository
3. Framework: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variable:
   - `VITE_API_URL` = `https://yourdomain.com/api/v1`

### 3. Custom Domain
1. Add your domain in Vercel project settings
2. Update DNS records as instructed by Vercel

## Post-Deployment Checklist
- [ ] Test API endpoints with Postman
- [ ] Test frontend login/register flow
- [ ] Verify CORS is working
- [ ] Check all page routes work
- [ ] Test on mobile devices
- [ ] Verify image uploads work
- [ ] Check email functionality
- [ ] Test admin dashboard
