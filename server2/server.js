const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const questions = [
  {
    question: "Which language is used for React?",
    options: ["Python", "JavaScript", "C", "Java"],
    answer: "JavaScript"
  },
  {
    question: "Which is a JavaScript runtime?",
    options: ["Node.js", "HTML", "CSS", "SQL"],
    answer: "Node.js"
  },
  {
    question: "Which is used for styling?",
    options: ["React", "CSS", "Express", "MongoDB"],
    answer: "CSS"
  },
  {
    question: "Which library is used for frontend?",
    options: ["React", "Express", "Node", "MySQL"],
    answer: "React"
  },
  {
    question: "Which protocol is used for websites?",
    options: ["HTTP", "FTP", "SMTP", "SSH"],
    answer: "HTTP"
  }
];

app.get("/questions", (req, res) => {
  res.json(
    questions.map(({question, options}) => ({
      question, options
    }))
  );
});

app.post("/submit", express.json(), (req, res) => {
  let score = 0;

  req.body.answers.forEach((answer, i) => {
    if (answer === questions[i].answer) score++;
  });

  res.json({
    score,
    total: questions.length
  });
});

app.listen(5000, () => {
  console.log("Quiz server running on port 5000");
});