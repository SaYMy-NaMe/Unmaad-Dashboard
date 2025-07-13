# 🤖 Unmaad Satirical Bot

## Getting Started (Recommended)

```bash
# 1. Clone the repository
git clone <repository-url>
```

Now, open the `Unmaad-Dashboard` folder and open a terminal inside it.
To launch the project in VS Code, run:

```bash
code .
```

Then, follow the steps below to install dependencies and run the app.

---

A full-stack AI chat application with React frontend and Express backend, featuring multiple AI endpoints for satirical conversations.

## Overview

This project consists of a React frontend that communicates with an Express backend API. The backend integrates with Gradio-hosted AI models to provide satirical responses. Users can chat with three different AI endpoints, each maintaining separate conversation histories.

## Project Structure

```
Unmaad/
├── client/          # React frontend (port 8000)
├── server/          # Express backend (port 3000)
└── README.md
```

## Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Run the Application

**Backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

Access the app at: http://localhost:8000

## How to Use

### 1. Start Both Services
- **Backend**: Run `npm run dev` in the `server` folder
- **Frontend**: Run `npm run dev` in the `client` folder
- Both should be running simultaneously

### 2. Access the Application
- Open your browser and go to http://localhost:8000
- You'll see the chat interface with three tabs

### 3. Using the Chat Interface
- **Select a Tab**: Click on Satirical Bot, Satirical Bot 1, or Lambda
- **Enter Message**: Type your message (not needed for Lambda)
- **Send**: Click the send button or press Enter
- **View Response**: See the AI response in the chat area
- **Clear Chat**: Use "Clear Chat" to start fresh

### 4. Tab Features
- Each tab has its own chat history
- Switch between tabs to see different conversations
- Lambda tab doesn't require input - just click "Call Lambda"

## Configuration

- Backend runs on port 3000
- Frontend runs on port 8000
- API base URL: http://localhost:3000

## API Endpoints

- `POST /api/satirical-bot` - Main satirical bot
- `POST /api/satirical-bot-1` - Alternative satirical bot  
- `GET /api/lambda` - Lambda endpoint
- `GET /health` - Health check