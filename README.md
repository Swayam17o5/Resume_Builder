# JobPilot - Modern Resume Builder

A modern, user-friendly resume builder application built with React, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality
- **Dashboard**: Manage all your resumes in one place
- **Resume Editor**: 
  - Create and edit resumes with a user-friendly interface
  - Multiple sections: Personal Details, Experience, Education, Skills, etc.
  - Real-time preview
- **Templates**: Choose from various professional resume templates
- **Profile Management**: Update your profile and view account statistics

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context
- **Routing**: React Router
- **Authentication**: Custom auth implementation
- **Build Tool**: Vite

## Getting Started

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm (v7 or higher)

2. **Installation**
   ```sh
   # Clone the repository
   git clone <repository-url>

   # Navigate to project directory
   cd rb2

   # Install dependencies
   npm install
   ```

3. **Development**
   ```sh
   # Start development server
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build**
   ```sh
   # Create production build
   npm run build
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers
├── pages/           # Page components
├── services/        # API and business logic
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
