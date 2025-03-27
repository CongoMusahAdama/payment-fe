# Payment Frontend Application

This is a frontend payment application built with React and Vite.

## Prerequisites

- Node.js (version 14.x or later recommended)
- npm or yarn package manager

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd payment-fe

# Install dependencies
npm install
# or with yarn
yarn
```

### Development

To run the application in development mode:

```bash
npm run dev
# or with yarn
yarn dev
```

This will start the development server at `http://localhost:5173` (default Vite port). The page will automatically reload if you make changes to the code.

### Building for Production

To build the application for production:

```bash
npm run build
# or with yarn
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or with yarn
yarn preview
```

## Project Structure

```
payment-fe/
├── public/           # Static assets
├── src/
│   ├── assets/       # Dynamic assets (processed by Vite)
│   ├── components/   # Reusable React components
│   ├── pages/        # Application pages/routes
│   ├── services/     # API service calls
│   ├── styles/       # Global styles
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Entry point
├── .gitignore
├── index.html        # HTML entry point
├── package.json      # Project dependencies and scripts
├── vite.config.js    # Vite configuration
└── README.md         # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (if configured)

## Environment Variables

Create a `.env` file in the root directory to set environment variables:

```
VITE_API_URL=https://api.example.com
```

Access them in your code using `import.meta.env.VITE_API_URL`.

## Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
