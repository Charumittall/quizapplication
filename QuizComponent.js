import React, { useState } from 'react';
import "../styles/quiz.css";

const QuizComponent = ({ questions, currentQuestion, timeLeft, handleNextQuestion, endQuiz }) => {
  const question = questions[currentQuestion];
  const [result,setresult]=useState(0)

  const handleAnswer = (answer) => {
    if (answer === question.answer) {
      setresult(result+1)
      console.log(result)
    } else {
      console.log("error")
    }
    if (currentQuestion < questions.length - 1) {
      handleNextQuestion();
    } else {
      alert(`Quiz completed!YOUR SCORE IS ${result} out of 10. THANKYOU FOR TAKING THE QUIZ.`);
      
      endQuiz();
    }
  };

  return (
    <div className='ques'>
      <h2>{question.question}</h2>
      
      <div className='buttons'>
        {question.options.map((option, index) => (
          <button className='optionbuttons' class="btn btn-primary" key={index} onClick={() => handleAnswer(option)}>{option}</button>
        ))}
      </div>
      <div>Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
    </div>
  );
};

export default QuizComponent;
