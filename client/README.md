# Unmaad Satirical Bot - React Client

A modern React.js frontend for the Unmaad Satirical Bot API.

## Features

- 🤖 **Three AI Endpoints**: Satirical Bot, Satirical Bot 1, and Lambda
- ⚡ **Real-time Loading States**: Beautiful spinner animations during API calls
- 🎨 **Modern UI**: Clean, responsive design with gradient backgrounds
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- 🔄 **Auto Proxy**: Automatically proxies API calls to the backend server

## Available APIs

### 1. Satirical Bot (`/api/satirical-bot`)
- **Method**: POST
- **Parameters**: `message` (string)
- **Returns**: Text and chatbot responses

### 2. Satirical Bot 1 (`/api/satirical-bot-1`)
- **Method**: POST
- **Parameters**: `message` (string)
- **Returns**: Alternative text and chatbot responses

### 3. Lambda (`/api/lambda`)
- **Method**: GET
- **Parameters**: None
- **Returns**: Lambda-generated responses

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- The backend server running on port 8000

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

## Usage

1. **Select an API**: Choose between Satirical Bot, Satirical Bot 1, or Lambda
2. **Enter Message**: Type your message (not required for Lambda)
3. **Send Request**: Click the send button and watch the loading spinner
4. **View Response**: See the AI-generated response in the response box

## Project Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Component-specific styles
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## Dependencies

- **React**: UI framework
- **Axios**: HTTP client for API calls
- **Lucide React**: Modern icon library

## Development

The app uses a proxy configuration to automatically forward API calls to the backend server running on port 8000. This means you don't need to worry about CORS or absolute URLs.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
