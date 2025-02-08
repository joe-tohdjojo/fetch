# Fetch App

This is a modern, production-ready web application built with Next.js, showcasing best practices in frontend development and a thoughtful approach to architecture and user experience.

## Site Navigation Guide

Upon successful login, you'll be automatically directed to the `/search` page. Here's what you can do:

1. **Search and Filter**: Refine your search by breed.
2. **Sort Results**: Arrange dogs based on different attributes like breed, name or age.
3. **Pagination**: Browse through multiple pages of dog listings.
4. **Favorite Dogs**: Click on a dog's card to add it to your favorites list.
5. **Manage Favorites**: Once you've added at least one favorite, a popup will appear with options to:
   - Clear all favorites
   - Find a potential match from your favorites list

This intuitive layout ensures a smooth and engaging experience as you explore our canine companions.

## User Experience Enhancements

#### URL-Based State Management

I implemented a URL-based approach for managing filter states and search parameters:

- **Query Parameters**: All filter selections (breed, age, etc.) including ascending and descending preferences are reflected in the URL query parameters
  - Enables seamless browser navigation (back/forward buttons work naturally)
  - Makes filtered views shareable via URL
  - Maintains user's filter context during page refreshes
  - Improves SEO by making filtered states crawlable

Example:

```
/search?page=1&breed=American%20Staffordshire%20Terrier&sort=asc&sortBy=breed
```

#### Persistent Storage

I utilized localStorage for maintaining user preferences and favorites:

- **Favorites Management**: Dog favorites are stored in localStorage
  - Persists user's favorite dogs between browser sessions
  - Provides instant access to favorites without server calls
  - Enables offline access to favorited items
  - Improves user experience by maintaining state across page refreshes

This combination of URL-based state and localStorage creates a robust, user-friendly experience that follows web development best practices for state persistence and navigation.

## Security and Authentication

### Route Protection

I implemented a secure route protection strategy that leverages httpOnly cookies:

- **Protected Routes**: The `/search` route is protected and requires authentication
- **Authentication Flow**:
  - Each request to the external API includes `credentials: "include"`
  - API validates the presence of an httpOnly `fetch-access-token` cookie
  - Unauthorized requests are rejected by the API
  - App automatically redirects unauthorized users to `/login`

### Implementation Notes

- Current limitation: Unable to automatically redirect authenticated users from `/login` to `/search`
  - Due to httpOnly cookie being inaccessible via JavaScript

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm
- Git

### Local Development Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd fetch
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in the required environment variables.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Development Commands

```bash
# Run development server with Turbopack for faster builds
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Format code with Prettier
npm run format
```

### Code Quality Checks

The project is set up with pre-commit hooks that automatically:

- Format code using Prettier
- Run ESLint to catch potential issues
- Type-check TypeScript files
- Validate commit messages

## Engineering Approach

My approach to this project emphasizes several key principles that demonstrate my commitment to building maintainable, scalable, and high-quality software:

### Architecture and Code Organization

- **Feature-First Structure**: Organized code by feature rather than type, making the codebase more intuitive and scalable
- **Clean Architecture Principles**: Maintained clear separation of concerns between UI, business logic, and data layers
- **Type Safety**: Implemented comprehensive TypeScript types across the entire application to prevent runtime errors
- **Performance Optimization**: Utilized Next.js server components and React Query caching strategies for optimal performance

### Development Philosophy

- **Developer Experience (DX)**: Established a robust development environment with automated tooling
- **Code Quality**: Enforced consistent code style and best practices through automated tools
- **Maintainability**: Focused on writing clean, self-documenting code with clear patterns

## Project Tools and Technologies

### Core Framework

- **Next.js**: Our primary framework for building the application. Chosen for its:
  - Server-side rendering capabilities
  - Built-in routing
  - API routes support
  - TypeScript integration
  - Great developer experience
  - Alternative considered: React with Express, but Next.js provides a more integrated solution

### Data Management

- **@tanstack/react-query**: Advanced data-fetching and state management solution
  - Powerful caching and invalidation strategies
  - Built-in error handling and loading states
  - Real-time synchronization capabilities
  - Alternative considered: SWR, but React Query offers more robust features and better TypeScript support

### UI Components and Styling

- **Tailwind CSS**: Utility-first CSS framework used for styling

  - Provides rapid development
  - Highly customizable
  - Small bundle size

- **shadcn/ui**: High-quality, customizable component library
  - Built on Radix UI primitives for accessibility
  - Fully customizable and maintainable
  - Modern, clean design aesthetic
  - Alternative considered: MUI, but shadcn offers better customization and lighter bundle size

### State Management

- **React Context**: Used for global state management
  - Lightweight solution built into React
  - Perfect for our app's size and complexity
  - Alternative considered: Redux, but Context API is simpler and sufficient for our needs

### Form Management

- **React Hook Form**: Efficient form management solution
  - Performance-focused with minimal re-renders
  - Great TypeScript support
  - Seamless integration with Zod for validation

### Type Checking and Validation

- **TypeScript**: Adds static typing to JavaScript

  - Improves code quality and maintainability
  - Better IDE support
  - Catches errors at compile time

- **Zod**: Runtime type validation
  - Type inference capabilities
  - Seamless integration with TypeScript
  - Robust validation patterns

### Code Quality Tools

- **ESLint**: Linting tool for identifying problematic patterns

  - Custom rule configuration for optimal code quality
  - Integration with TypeScript for type-aware linting

- **Prettier**: Code formatting tool
  - Ensures consistent code style
  - Eliminates style debates in code reviews
  - Integrated with ESLint for comprehensive code quality

### Git Workflow

- **commitlint**: Enforces conventional commit messages

  - Enables automated versioning and changelog generation
  - Makes git history more readable and meaningful

- **husky**: Git hooks management
  - Ensures code quality checks run before commits
  - Prevents bad commits from entering the codebase

### Development Workflow

- **lint-staged**: Runs linters on staged files

  - Optimizes performance by only checking changed files
  - Ensures code quality at commit time
