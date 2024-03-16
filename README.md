# openAI-mastery

This project provides a Node.js fullstack application that generates video transcripts using OpenAI Whisper.

## Tech Stack

- Node.js
- Express
- OpenAI Whisper

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OPENAI_API_KEY`

## Features

- Transcribe video files to text with high accuracy.
- Support for multiple languages and dialects.
- Easy to use web interface for uploading and transcribing videos.
- The application currently provides basic transcript editing features.

### Planned Additional Features

- Generate timestamps for each speaker and utterance.
- Save transcripts in various formats (e.g., SRT, VTT, JSON).

# Getting Started

Clone the repository

```bash
git clone https://github.com/milhaud1201/openAI-mastery.git
```

Install dependencies

```bash
cd openAI-mastery/app/backend
```

To start the backend server

```bash
npm start
```

To start the frontend application, run the following command in the `frontend ` directory

```bash
# cd ../frontend
npx http-server ./frontend
```
