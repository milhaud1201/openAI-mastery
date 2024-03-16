const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

app.use(cors());

const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

// const upload = multer({ storage: storage });
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 파일 크기 제한을 20MB로 설정
});

app.get("/", (req, res) => {
  res.send("Welcome to our AI Transcription API");
});

app.post("/transcribe", upload.single("file"), async (req, res) => {
  try {
    const transcriptionResponse = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });

    const transcription = transcriptionResponse; 
    const systemPrompt = `Create course material based on this "${transcription}" content.`

    const chatResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
        role: "system",
        content: systemPrompt
      }]
    });

    res.send(transcriptionResponse);
    // res.send(chatResponse.choices[0]);
    
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      res.status(500).send(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

const PORT = process.env.PORT || 1330;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
