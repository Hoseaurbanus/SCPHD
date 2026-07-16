# SCPHD - Springfield Center for Peace and Humanitarian Development

A modern NGO Management Platform built with React 19, Vite, Tailwind CSS v4, and PHP CodeIgniter 4.

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- React Router v7
- Framer Motion (animations)
- Recharts (charts)
- React Hook Form + Yup (forms/validation)
- TanStack Query (data fetching)
- React Toastify (notifications)
- React Helmet Async (SEO)

### Backend
- PHP CodeIgniter 4 (standalone, no Composer)
- MySQL
- JWT Authentication
- RESTful API

## Project Structure

```
├── src/                    # Frontend source
│   ├── api/               # API client and services
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Design system (Button, Card, Modal, etc.)
│   │   ├── layout/       # Nav, Footer, ScrollProgress
│   │   ├── home/         # Home page sections
│   │   ├── auth/         # Auth forms
│   │   └── dashboard/    # Dashboard components
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom hooks
│   ├── layouts/          # Page layouts
│   ├── pages/            # Page components
│   │   ├── public/       # Public pages
│   │   ├── auth/         # Auth pages
│   │   ├── volunteer/    # Volunteer portal
│   │   ├── donor/        # Donor portal
│   │   └── admin/        # Admin dashboard
│   ├── routes/           # Route definitions
│   ├── services/         # API services
│   ├── utils/            # Utilities and helpers
│   └── config/           # App configuration
├── backend/               # PHP CodeIgniter 4 API
│   ├── app/
│   │   ├── Controllers/  # API controllers
│   │   ├── Models/       # Database models
│   │   ├── Libraries/    # JWT, Response helpers
│   │   ├── Filters/      # Auth, CORS, Rate limiting
│   │   ├── Helpers/      # Utility functions
│   │   └── Database/     # SQL schema
│   └── public/           # Entry point
└── package.json
```

## Getting Started

### Frontend
```bash
npm install
npm run dev
# Opens at http://localhost:8443
```

### Backend
1. Import `backend/app/Database/database.sql` into MySQL
2. Configure `backend/.env` with database credentials
3. Point your web server to `backend/public/`

## Features

### Public Pages
- Home (Hero, Impact Stats, Programs, Map, Donations, Events, News, Volunteers, Partners)
- About (Mission, Values, Timeline, Team)
- Programs (Filterable grid, Detail modals)
- Donate (Multi-step wizard, Campaign selection)
- Contact (Form, FAQ, Office locations)
- News (Editorial grid)
- Events (Registration, Availability)

### Volunteer Portal
- Dashboard (Progress ring, Stats, Missions)
- My Missions (Assignment cards)
- My Impact (Hours chart, Certificate)
- Resources (Downloadable PDFs)
- Profile (Edit form)

### Donor Portal
- Dashboard (Giving progress, Impact metrics)
- Donation History (Transaction table)
- Recurring Gifts (Manage subscriptions)
- My Impact (Stories, Giving breakdown)
- Tax Receipts (Annual cards)

### Admin Dashboard
- Overview (Stats, Revenue chart, Campaign donut)
- Donations (Filterable table, CSV export)
- Volunteers (Roster, Levels, Approve/Edit)
- Programs (Budget tracking, Status)
- Users (Management, Role assignment)
- Reports (Downloads, Audit log)
- Settings (Site configuration)
- Audit Logs (Activity tracking)

## User Roles
Super Admin, Administrator, Program Manager, Volunteer Manager, Finance Officer, Editor, Donor, Volunteer, Member, Viewer

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api/v1
VITE_APP_NAME=SCPHD
VITE_APP_URL=http://localhost:8443
```

### Backend (.env)
```
APP_BASE_URL=http://localhost:8080
DB_HOST=localhost
DB_NAME=scphd
DB_USER=root
DB_PASS=
JWT_SECRET=your-secret-key
```

## License
Proprietary - Springfield Center for Peace and Humanitarian Development
