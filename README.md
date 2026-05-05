# Yu Law Portal - Client CMS

Client portal and content management system for Yu Law Firm website.

## Overview

This portal allows authorized users to manage content for the Yu Law Firm website, including:
- Testimonials and reviews
- Team member information
- Practice area details
- Contact information
- Website settings

## Tech Stack

- **React 19.1.1** - UI framework
- **Vite 7.1.0** - Build tool
- **Tailwind CSS 3.4.17** - Styling
- **React Router DOM 7.8.0** - Routing
- **Supabase** - Authentication & Database
- **React Hook Form** - Form management

## 📦 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components (Login, Dashboard, etc.)
├── contexts/        # React contexts (Auth, etc.)
├── lib/             # Third-party integrations (Supabase)
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
└── App.jsx          # Main app with routing
```

## 🔐 Authentication

Uses Supabase Authentication with email/password login.

## 📝 Development Status

**Initial setup complete** - Ready for UI implementation and feature development.

## 🔗 Related Projects

- **yu-law-website** - Main public-facing website
