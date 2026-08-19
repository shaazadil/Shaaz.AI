# Shaaz AI

> *"Your AI. Your conversations. Your way."*

## About

Shaaz AI is a personal AI chatbot being built from scratch as a full-stack learning project. The long-term vision is to create an AI assistant that feels natural and conversational, responds with a personalized style inspired by its creator, securely maintains chat history, and supports advanced AI-powered tools like file processing and Retrieval-Augmented Generation (RAG). 

Currently, this project is in an early prototyping phase where the frontend interface and state management have been established.

## Current Features

The project is actively being developed. Currently, the frontend UI is built and fully functional using local React state:

- 🎨 **Dark Cinematic UI:** A polished, modern, and highly responsive chat interface.
- 💬 **Conversation Management:** Seamlessly create new chats and switch between multiple conversations.
- 🗑️ **Deletion System:** Delete existing conversations with a protective confirmation dialog.
- 🏷️ **Smart Titles:** Conversation titles are automatically generated from the first user message.
- 🤖 **Simulated Responses:** *(Currently implemented as a mock delay to test UI fluidity. No real LLM is connected yet.)*
- ✨ **Custom Branding:** Bespoke Shaaz AI logo and design language.

## Tech Stack

The technologies driving this project are a mix of what's currently implemented and what is planned for the near future.

### Currently Implemented (Frontend)
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Planned (Backend & AI)
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL, SQLAlchemy, Alembic
- **Authentication:** JWT, Secure Password Hashing
- **AI Integration:** LLM API, Prompt Engineering, Conversation Context

## Architecture

The long-term architecture of Shaaz AI will follow a standard modern full-stack pattern:

```text
Browser / Client
       ↓
Next.js Frontend (React/Tailwind)
       ↓
FastAPI Backend (Python)
       ↓
   AI Service (LLM API)
       ↓
PostgreSQL Database (Chat History/Users)
```

The Next.js frontend will handle all UI rendering and user interactions, communicating securely via REST APIs with the FastAPI backend. The backend will serve as the central hub, managing database transactions in PostgreSQL and orchestrating prompts/responses with the external AI model API.

## Roadmap

This project is being developed as a 10-day intensive full-stack + AI learning sprint.

- [x] Frontend foundation
- [x] Chat interface
- [x] Conversation state
- [x] Multiple conversations
- [x] Conversation deletion
- [ ] FastAPI backend
- [ ] PostgreSQL database
- [ ] Database models
- [ ] CRUD APIs
- [ ] Connect frontend to backend
- [ ] Authentication
- [ ] JWT
- [ ] Real AI model integration
- [ ] Streaming responses
- [ ] Persistent chat history
- [ ] File uploads
- [ ] RAG
- [ ] AI tools
- [ ] Testing
- [ ] Deployment

## Project Structure

```text
Shaaz.AI/
├── frontend/          # Next.js React application (Currently active)
│   ├── src/
│   │   ├── app/       # Next.js App Router
│   │   ├── components/# React components (Chat UI, Sidebar, etc.)
│   │   └── types/     # TypeScript definitions
├── backend/           # FastAPI application (Planned)
└── database/          # Postgres/Alembic migrations (Planned)
```

## Getting Started

To run the current frontend prototype locally, follow these steps:

```bash
git clone https://github.com/shaazadil/Shaaz.AI.git
cd Shaaz.AI/frontend
npm install
npm run dev
```

*Note: Instructions for the backend and database setup will be added as those parts of the project are implemented.*

## Environment Variables

Currently, no environment variables are required to run the local frontend prototype.

## Development

All state is currently managed locally in memory via React `useState`. Pull requests or forks should respect the existing dark cinematic aesthetic and adhere to the current TypeScript rules in place.

## Future Plans

Beyond the immediate roadmap, future iterations of Shaaz AI will focus on:
- Streaming AI responses for lower latency.
- Integrating a Retrieval-Augmented Generation (RAG) pipeline for document querying.
- Adding discrete AI tools (e.g., web search, code execution).
- Full deployment to production infrastructure.

## Learning Goals

This project was intentionally designed to be built from scratch without relying on heavy boilerplate to gain deep, practical experience in:
- Modern Frontend Development (Next.js, Tailwind, State Management)
- Backend API Architecture (FastAPI, REST)
- Database Design & ORMs (PostgreSQL, SQLAlchemy)
- Security & Authentication (JWT)
- AI Integration & Prompt Engineering
- Full-stack Production Architecture & Deployment

## Author

**Shaaz Adil**
GitHub: [https://github.com/shaazadil](https://github.com/shaazadil)
