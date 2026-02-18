# AGENTS.md - Project Aergia Electron Conversion Guide

## Build & Development Commands

```bash
npm run dev          # Start development server (Turbopack enabled)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

### Critical Commands
- **Test Single Component**: Create a test file matching the component's name (e.g., `RichTextEditor.test.tsx`)
- **Type Check**: `npx tsc --noEmit` (from root directory)

## Architecture Overview

**Current State**: Next.js SPA with monolithic React application and backend API dependency
**Target State**: Standalone Electron Desktop App with local data persistence

### Key Components to Decouple

1. **API Service Layer** (`src/services/api.ts`)
   - Replace remote API calls with localStorage/IndexedDB wrapper
   - Create mock data layer for development that syncs with remote later

2. **Authentication System**
   - Convert session-based auth to electron-store encrypted data
   - Remove protected route wrappers, use window.electron APIs

3. **State Management** (Redux)
   - Keep Redux for UI state, migrate data state to async storage
   - Decouple cvSlice and formSlice from API calls

4. **UI Structure** (Next.js App Router)
   - Extract pages into independent React components
   - Move from Server Components to Client Components where needed
   - Remove Next.js-specific APIs (getStaticProps, getServerSideProps)

5. **PDF Generation**
   - Maintain `react-pdf/renderer` for electron environment
   - Add electron-specific print functionality

## Code Style Guidelines

### TypeScript
```typescript
// 1. Always use TypeScript
"use client"; // Required for client-side components
import React from 'react';

// 2. Import with path aliases
import { Something } from '@/components/Something';

// 3. Strict typing
interface Props {
  required: string;
  optional?: number;
}

function Component(props: Props): JSX.Element {
  // 4. Explicit returns for side effects
  const handleClick = () => {
    // Side effects here
    console.log('Side effect');
  };

  // 5. Type guards for null safety
  if (props.optional !== undefined) {
    // Safe to use props.optional
  }
}
```

### React Components
```tsx
// 1. Function components for reusability
// 2. Hooks before JSX
// 3. Memoization for expensive computations
// 4. Proper error boundaries where needed

"use client";

import { memo, useMemo, useEffect } from 'react';

const ExpensiveComponent = memo(({ data }: { data: any[] }) => {
  const processed = useMemo(() => {
    return data.map(item => item.processed);
  }, [data]);

  return (
    <div>
      {processed.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
});
```

### Error Handling
```typescript
// 1. Try-catch in async operations
// 2. Error boundaries for React errors
// 3. User feedback on failures

const fetchData = async () => {
  try {
    const data = await api.getCV(id);
    return data;
  } catch (error) {
    console.error('Failed to fetch CV:', error);
    throw error; // Re-throw for component to handle
  }
};
```

### Styling
- Use Tailwind CSS 4 utility classes
- Maintain existing color scheme (emerald-600 primary)
- Component-based CSS with class names
- Consistent spacing and typography

## Electron Conversion Process

### Step 1: Base Setup
```bash
npx create-electron-app@latest aergia-desktop
# Install dependencies: electron, electron-store, react-electron-ipc
```

### Step 2: Data Layer Migration
```typescript
// Create src/electron-store.ts
import store from 'electron-store';
const db = new store();

// Replace API calls with direct storage
const getCVs = async () => {
  return db.get('cvs', []);
};
```

### Step 3: IPC Communication
```typescript
// Main process: electron/main.ts
import { ipcMain } from 'electron';

ipcMain.handle('get-cvs', async () => {
  return db.get('cvs', []);
});

// Renderer: src/api/electron.ts
export const electronApi = {
  getCVs: async () => await ipcRenderer.invoke('get-cvs')
};
```

### Step 4: Component Refactoring
- Remove Next.js app router dependencies
- Extract pages as standalone components
- Use window.electron APIs for main-process communication
- Disable server-side rendering features

### Step 5: Build Configuration
```json
// electron-builder.json
{
  "appId": "com.aergia.app",
  "productName": "Aergia",
  "files": ["build/**/*", "node_modules/**/*"],
  "directories": {
    "buildResources": "assets"
  }
}
```

## Testing Strategy

1. **Unit Tests**: Jest + React Testing Library for components
2. **Integration Tests**: Test data layer, API mocks
3. **E2E Tests**: Test core user flows in Electron environment
4. **Component Libraries**: Maintain shared components for Electron UI

## Important Files to Preserve

- `src/store/` - Redux state logic (preserve)
- `src/components/` - UI components (refactor for Electron)
- `src/constants/` - Static data (preserve)
- `src/types/` - Type definitions (preserve)
- `src/hooks/` - Custom hooks (refactor, add electron hooks)

## Files to Eliminate

- Next.js app router structure (`src/app/*`)
- API service (replace with electron IPC)
- ProtectedRoute (use electron auth checks)
- Server-side only components
- Netlify-specific configs
- Next.js middleware

## API Dependencies Analysis

The application currently depends on several API endpoints that must be replaced with local storage:

### Authentication Endpoints
- `/auth/register`
- `/auth/login`
- `/auth/logout`
- `/auth/isLoggedIn`

### CV Management Endpoints
- `/cv` (GET, POST, PUT, DELETE)
- `/cv/{id}/pdf`
- `/cv/reorder`

### Form Groups Endpoints
- `/formGroup/{cvId}` (GET, POST, PUT, DELETE)
- `/formGroup/{cvId}/{id}` 
- `/formGroup/{cvId}/reorder`

### User Endpoints
- `/getUser`

These endpoints are used in:
- `src/services/api.ts` - The main API service layer
- `src/hooks/useCVs.ts` - CV management hooks
- `src/hooks/useApi.ts` - Generic API execution hook
- `src/components/ProtectedRoute.tsx` - Authentication protection
- `src/components/AuthInitializer.tsx` - Authentication initialization

## Data Storage Migration

For the electron conversion, all API calls should be replaced with:
1. Local storage using `electron-store` or IndexedDB
2. Direct data access methods instead of HTTP calls
3. Hybrid JSON file-based storage system