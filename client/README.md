# React Frontend

React application for the Unmaad Satirical Bot with chat interface and multiple AI endpoints.

## Overview

Modern React app with tab-based navigation for three AI endpoints. Each tab maintains separate chat history. Features real-time loading states and responsive design.

## Folder Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Helper functions
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Quick Start

```bash
npm install
npm run dev
```

Access at: http://localhost:8000

## Configuration

- Port: 8000
- API Base URL: http://localhost:3000 (in `src/utils/baseUrl.js`)

## Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
