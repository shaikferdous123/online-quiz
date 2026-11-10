import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const submitQuiz = () => {
    fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        answers: questions.map((q, i) => answers[i] || "")
      })
    })
    .then(res => res.json())
    .then(data => setResult(data));
  };

  return (
    <div style={{margin:"30px", fontFamily:"Arial"}}>
      <h1>Online Quiz Application</h1>

      {questions.map((q, i) => (
        <div key={i}>
          <h3>{i + 1}. {q.question}</h3>

          {q.options.map(option => (
            <label key={option} style={{display:"block"}}>
              <input
                type="radio"
                name={`question${i}`}
                checked={answers[i] === option}
                onChange={() =>
                  setAnswers({...answers, [i]: option})
                }
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <br />

      <button onClick={submitQuiz}>
        Submit Quiz
      </button>

      {result && (
        <h2>
          Your Score: {result.score} / {result.total}
        </h2>
      )}
    </div>
  );
}

export default App;