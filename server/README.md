# Express Backend

Express.js API server for the Unmaad Satirical Bot with Gradio AI integration.

## Overview

Node.js Express server that provides REST API endpoints for AI chat functionality. Integrates with Gradio-hosted AI models for satirical responses. Features security middleware, error handling, and health monitoring.

## Folder Structure

```
server/
├── config/              # Server configuration
├── controllers/         # Route controllers
├── middleware/          # Express middleware
├── routes/             # API routes
├── services/           # Business logic
├── utils/              # Utility functions
├── app.js              # Main server file
├── package.json
└── README.md
```

## Quick Start

```bash
npm install
npm run dev
```

Server runs on: http://localhost:3000

## Configuration

- Port: 3000 (configurable via PORT env var)
- Environment: development/production
- Gradio Model: Rezuwan/USB_Unmad_Satirical_Bot

## Available Scripts

- `npm start` - Production server
- `npm run dev` - Development server with nodemon 