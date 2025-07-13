# Unmaad Express API

A modern Node.js Express application with security, logging, and API endpoints.

## Features

- 🚀 Express.js server with modern middleware
- 🔒 Security headers with Helmet
- 🌐 CORS enabled
- 📝 Request logging with Morgan
- 🏥 Health check endpoint
- ⚡ Development mode with Nodemon

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## API Endpoints

### Base URL
- **GET** `/` - Welcome message and API info
- **GET** `/health` - Health check endpoint

### API Routes
- **GET** `/api/hello` - Sample API endpoint

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## Project Structure

```
├── app.js          # Main application file
├── package.json    # Dependencies and scripts
├── README.md       # This file
└── .gitignore      # Git ignore file
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (placeholder)

## Dependencies

### Production
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `morgan` - HTTP request logger

### Development
- `nodemon` - Auto-restart server during development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

MIT License 