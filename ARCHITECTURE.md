# Yu Law Portal - Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Yu Law Ecosystem                         │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   Yu Law Portal      │         │   Yu Law Website     │
│   (CMS/Admin)        │         │   (Public Site)      │
│                      │         │                      │
│  - Login/Auth        │         │  - Home              │
│  - Dashboard         │         │  - About             │
│  - Manage Content    │         │  - Services          │
│  - Team Management   │         │  - Reviews           │
│  - Settings          │         │  - Contact           │
└──────────┬───────────┘         └──────────┬───────────┘
           │                                │
           │ Write                          │ Read (1 API call)
           │                                │
           ▼                                ▼
    ┌──────────────────────────────────────────┐
    │         Supabase Backend                 │
    │                                          │
    │  ┌────────────────────────────────────┐ │
    │  │  Authentication                    │ │
    │  │  - Email/Password                  │ │
    │  │  - Session Management              │ │
    │  └────────────────────────────────────┘ │
    │                                          │
    │  ┌────────────────────────────────────┐ │
    │  │  PostgreSQL Database               │ │
    │  │  - testimonials                    │ │
    │  │  - team_members                    │ │
    │  │  - practice_areas                  │ │
    │  │  - contact_info                    │ │
    │  │  - settings                        │ │
    │  └────────────────────────────────────┘ │
    │                                          │
    │  ┌────────────────────────────────────┐ │
    │  │  Edge Functions                    │ │
    │  │  - get_website_content()           │ │
    │  │    Returns all data in 1 call      │ │
    │  └────────────────────────────────────┘ │
    └──────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### **Content Update Flow**
1. Admin logs into Portal
2. Edits content (testimonial, team member, etc.)
3. Portal saves directly to Supabase database
4. Changes are immediately available for website

### **Website Content Fetch Flow**
1. Website loads
2. Makes **1 API call** to Supabase Edge Function
3. Edge Function returns all content in single response
4. Website renders with fresh data

---

## 🔐 Authentication Flow

```
User → Login Page → Supabase Auth → Session Created
                         ↓
                    AuthContext
                         ↓
                  Protected Routes
                         ↓
                     Dashboard
```

### **Protected Routes**
- All routes except `/login` require authentication
- `ProtectedRoute` component checks auth status
- Redirects to login if not authenticated
- Shows loading state during auth check

---

## 📊 Database Schema (To Be Created)

### **testimonials**
```sql
id: uuid (primary key)
name: text
subject: text
body: text
rating: integer (1-5)
date: date
case_type: text
created_at: timestamp
updated_at: timestamp
```

### **team_members**
```sql
id: uuid (primary key)
name: text
position: text
bio: text
photo_url: text
order: integer
created_at: timestamp
updated_at: timestamp
```

### **practice_areas**
```sql
id: uuid (primary key)
title: text
description: text
icon: text
order: integer
created_at: timestamp
updated_at: timestamp
```

### **contact_info**
```sql
id: uuid (primary key)
phone: text
email: text
address: text
hours: text
updated_at: timestamp
```

### **settings**
```sql
id: uuid (primary key)
key: text (unique)
value: jsonb
updated_at: timestamp
```

---

## 🛠️ Technology Stack

### **Frontend (Portal)**
- **React 19.1.1** - UI framework
- **Vite 7.1.0** - Build tool & dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **React Router DOM 7.8.0** - Client-side routing
- **React Hook Form 7.54.2** - Form management
- **React Icons 5.6.0** - Icon library

### **Backend**
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Edge Functions
  - Real-time subscriptions (optional)
  - Row Level Security (RLS)

---

## 🔒 Security Considerations

### **Row Level Security (RLS)**
- Enable RLS on all tables
- Only authenticated users can write
- Public can read (for website)
- Admin-only tables require specific role

### **Environment Variables**
- Never commit `.env` file
- Use `.env.example` as template
- Rotate keys if exposed

### **Authentication**
- Supabase handles password hashing
- Session tokens in httpOnly cookies
- Automatic token refresh

---

## 📁 File Organization

```
yu-law-portal/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── forms/          # Form components
│   │   ├── layout/         # Layout components (Sidebar, Header)
│   │   └── ui/             # Base UI components (Button, Input, etc.)
│   │
│   ├── pages/              # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Testimonials.jsx
│   │   ├── TeamMembers.jsx
│   │   ├── PracticeAreas.jsx
│   │   └── Settings.jsx
│   │
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/              # Custom hooks
│   │   ├── useTestimonials.js
│   │   ├── useTeamMembers.js
│   │   └── useSupabase.js
│   │
│   ├── lib/                # Third-party integrations
│   │   └── supabase.js
│   │
│   └── utils/              # Utility functions
│       ├── validation.js
│       └── formatting.js
│
├── .env                    # Environment variables (gitignored)
├── .env.example            # Environment template
└── package.json            # Dependencies
```

---

## 🚀 Deployment Strategy

### **Portal (CMS)**
- Deploy to Vercel/Netlify
- Environment variables in platform settings
- Protected behind authentication
- Can use custom domain (e.g., portal.attorneyyu.com)

### **Website**
- Already deployed
- Will fetch from Supabase Edge Function
- No changes to deployment process

### **Supabase**
- Hosted on Supabase cloud
- Free tier sufficient for start
- Automatic backups
- Can self-host if needed

---

## 📈 Future Enhancements

### **Phase 1 (Current)**
- Basic CRUD for content
- Authentication
- Simple dashboard

### **Phase 2**
- Image upload to Supabase Storage
- Rich text editor for content
- Preview changes before publishing
- Activity log

### **Phase 3**
- Analytics dashboard
- User roles (admin, editor, viewer)
- Content scheduling
- Multi-language content management

---

## 🔗 Integration Points

### **Portal → Supabase**
- Direct database access via Supabase client
- Real-time updates (optional)
- File uploads to Supabase Storage

### **Website → Supabase**
- Single Edge Function call on page load
- Cached response (optional)
- Fallback to static data if API fails

---

## 📝 Development Workflow

1. **Setup Supabase project**
2. **Create database schema**
3. **Migrate existing data** (testimonials.json → database)
4. **Build CMS UI** (forms, lists, etc.)
5. **Create Edge Function** for website
6. **Update website** to fetch from Supabase
7. **Test & deploy**

---

**Architecture designed**: May 4, 2026
