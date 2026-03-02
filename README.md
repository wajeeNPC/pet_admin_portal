# PetCareHub Admin Portal

Admin portal for managing adoption centers and platform operations on the PetCareHub platform.

## Features

- 📊 Platform Analytics Dashboard
- 🏢 Manage Adoption Centers
- 👥 Manage Center Users and Regular Users
- 🔐 Secure Authentication
- 📈 Center Statistics and Monitoring

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PetCareHub backend running on `http://localhost:5000`

### Installation

1. Clone the repository and navigate to the project:
```bash
cd AdminPortal/admin-portal
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Update `.env` with your backend API URL:
```
VITE_API_BASE_URL=http://localhost:5000/api/v1/platform-admin
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5174`

## Build

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
admin-portal/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API service layer
│   ├── lib/            # Utility functions
│   ├── assets/         # Static assets
│   ├── App.jsx         # Main App component with routing
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static files
└── index.html          # HTML entry point
```

## Default Admin Credentials

Use the platform admin credentials created during backend seeding.

## Technologies

- React 18
- React Router 6
- Tailwind CSS
- Vite
- Lucide React (icons)
- Sonner (notifications)

## License

Private - PetCareHub Platform
