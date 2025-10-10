# Project Aergia

A modern, intuitive resume builder application that allows users to create professional resumes with ease. Built with Next.js and featuring drag-and-drop functionality, multiple templates, and real-time PDF generation.

🌐 **Live Demo**: [https://aergia.netlify.app/home](https://aergia.netlify.app/home)

## Overview

Project Aergia is a comprehensive resume builder that empowers users to create, customize, and manage professional resumes through an intuitive web interface. The application features a drag-and-drop builder, multiple resume templates, real-time PDF preview, and user authentication for managing multiple CVs.

### Key Features

- **Drag & Drop Builder**: Intuitive interface for organizing resume sections
- **Multiple Templates**: MIT and Harvard resume templates with customizable styling
- **Real-time PDF Generation**: Live preview of resume as PDF using React-PDF
- **User Authentication**: Secure login/registration system
- **CV Management**: Create, edit, delete, and reorder multiple resumes
- **Rich Text Editor**: TipTap-powered editor for detailed content creation
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Template Customization**: Style editor for personalizing resume appearance

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React-PDF** - PDF generation and rendering

### UI Components & Libraries
- **@dnd-kit** - Drag and drop functionality
- **TipTap** - Rich text editor
- **Lucide React** - Icon library
- **Radix UI** - Accessible UI primitives
- **React Dropzone** - File upload functionality

### Development Tools
- **ESLint** - Code linting
- **Sass** - CSS preprocessing
- **Turbopack** - Fast bundler for development

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── builder/           # Resume builder interface
│   ├── cvs/              # CV management dashboard
│   ├── login/            # Authentication pages
│   ├── register/         
│   └── home/             # Landing page
├── components/           # Reusable UI components
│   ├── AuthInitializer.tsx
│   ├── ProtectedRoute.tsx
│   ├── RichTextEditor.tsx
│   └── Spinner.tsx
├── hooks/               # Custom React hooks
│   ├── useApi.ts        # API interaction hook
│   ├── useCVs.ts        # CV management hook
│   └── useFormHolders.ts # Form data management
├── services/           # API service layer
│   └── api.ts
├── store/             # Redux store configuration
│   ├── authSlice.ts   # Authentication state
│   ├── cvsSlice.ts    # CV management state
│   ├── formSlice.ts   # Form data state
│   └── store.ts
├── types/             # TypeScript type definitions
│   ├── CvTypes.ts
│   ├── FormHolderTypes.ts
│   └── ResumeFormTypes.ts
└── constants/         # Application constants
    ├── templates.ts
    └── resumeFormTemplates.ts
```

## Installation

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-aergia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure environment variables** (see Environment Variables section)

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3333"

# Add additional environment variables as needed for your backend
```

### Required Variables

- `NEXT_PUBLIC_API_URL`: The base URL for the backend API service

## Development and Build Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run dev:legacy   # Start development server without Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Deployment

### Netlify (Recommended)

The project is configured for Netlify deployment with the included `netlify.toml` file:

```toml
[build]
  command = "npm ci && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
```

**Deploy to Netlify:**
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

```bash
npm run build
npm run start
```

## Features and Modules

### Authentication System
- User registration and login
- Protected routes for authenticated users
- Session management with Redux

### CV Management Dashboard (`/cvs`)
- Create new resumes with template selection
- Edit existing resume metadata
- Delete resumes with confirmation
- Drag-and-drop reordering of CV collection
- Template preview thumbnails

### Resume Builder (`/builder`)
- **Left Panel**: Form editors and content management
  - Drag-and-drop form sections (Profile, Experience, Education, Projects, Skills, Custom)
  - Rich text editing with TipTap
  - Style customization for each section
- **Right Panel**: Real-time PDF preview
  - Live updates as content changes
  - Download functionality
  - Multiple template rendering

### Template System
- **MIT Template**: Clean, academic-focused design
- **Harvard Template**: Professional business format
- Extensible architecture for additional templates
- Per-section style customization

### Form Management
- Dynamic form creation and editing
- Drag-and-drop reordering within sections
- Visibility toggles for sections and items
- Auto-save functionality

## API Integration

The frontend communicates with a backend API through the `apiService` layer:

```typescript
// API service structure
const apiService = {
  auth: {
    login, logout, register, checkAuth
  },
  cvs: {
    getAll, create, update, delete, reorder
  },
  formGroups: {
    getByCvId, create, update, delete, reorder
  }
}
```

### API Endpoints
- **Authentication**: `/auth/*`
- **CV Management**: `/cvs/*`
- **Form Data**: `/form-groups/*`

All API calls are handled through the `useApi` hook with error handling and loading states. The existing backend for the live demo is hosted on: [Aergia Backend](https://aergia-backend.onrender.com)

## Page Summary

### `/home`
Landing page with call-to-action for creating resumes. Redirects authenticated users to CV dashboard.

### `/cvs`
**Protected Route** - CV management dashboard where users can:
- View all their resumes in a grid layout
- Create new resumes with template selection
- Edit resume titles and templates
- Delete resumes with confirmation
- Reorder resumes via drag-and-drop

### `/builder`
**Protected Route** - Main resume builder interface featuring:
- **Left Side**: Content management with collapsible form sections
- **Right Side**: Real-time PDF preview
- Dynamic form editing with rich text support
- Style customization for visual elements
- Auto-save functionality

### `/login` & `/register`
Authentication pages with form validation and error handling.

### `/importer`
**Protected Route** - File upload interface for importing existing resumes (future feature).

## Contributing Guidelines

1. **Fork the repository** and create a feature branch
2. **Follow TypeScript conventions** and maintain type safety
3. **Use Tailwind CSS** for styling consistency
4. **Write meaningful commit messages** following conventional commits
5. **Test your changes** across different screen sizes
6. **Update documentation** for new features or API changes

### Code Style
- Use TypeScript for all new files
- Follow existing component patterns
- Maintain consistent naming conventions
- Add proper error handling and loading states

## Credits & Acknowledgements

### Core Technologies
- [Next.js](https://nextjs.org/) - React framework
- [React-PDF](https://react-pdf.org/) - PDF generation
- [TipTap](https://tiptap.dev/) - Rich text editor
- [dnd kit](https://dndkit.com/) - Drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management

### UI Components
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Lucide React](https://lucide.dev/) - Icon library

### Development Tools
- [Turbopack](https://turbo.build/pack) - Fast bundler
- [ESLint](https://eslint.org/) - Code linting

---

**Project Aergia** - Making resume creation effortless and professional.