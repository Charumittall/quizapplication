import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import QuizComponent from './QuizComponent';
import questions from './questions.json';

const App = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    // Check if there is saved state in localStorage
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const { quizStarted, currentQuestion, timeLeft } = JSON.parse(savedState);
      setQuizStarted(quizStarted);
      setCurrentQuestion(currentQuestion);
      setTimeLeft(timeLeft);
    }

    // Function to check if fullscreen is active
    const checkFullscreen = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };

    // Add event listeners for fullscreen changes
    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    document.addEventListener('mozfullscreenchange', checkFullscreen);
    document.addEventListener('MSFullscreenChange', checkFullscreen);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
      document.removeEventListener('webkitfullscreenchange', checkFullscreen);
      document.removeEventListener('mozfullscreenchange', checkFullscreen);
      document.removeEventListener('MSFullscreenChange', checkFullscreen);
    };
  }, []);

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem('quizState', JSON.stringify({ quizStarted, currentQuestion, timeLeft }));

    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert('Time is up!');
      endQuiz();
    }

    return () => clearInterval(timer);
  }, [quizStarted, currentQuestion, timeLeft]);

  const requestFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
  };

  const startQuiz = () => {
    if (isFullscreen) {
      setQuizStarted(true);
    } else {
      alert('Please enable fullscreen mode to start the quiz.');
    }
  };

  const endQuiz = () => {
    setQuizStarted(false);
    localStorage.removeItem('quizState');
    alert('Quiz ended! Click ok to return to the home page.');
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
  };

  return (
    <div className="bigbox">

        <div className="App">

      
          {!quizStarted ? (
        <div className='divbox'>
          
        
          <h1 style={{color:'red'}}>CAREFULLY READ THE INSTRUCTIONS:</h1>
          <div className='content'> 
          <h4>1.The quiz contains 10 questions ,every question contains 4 options.</h4>
          <h4>2.The quiz can only be attempted in full screen.</h4>
          <h4>3.You'll be provided with 10 minutes to complete the quiz.</h4>
          <h4>4.There is no negative marking for the wrong answer.</h4>
          <h4>5.Each question weighs 1 mark each.</h4>
          <h4>6.Click on start quiz button to start the quiz.</h4>
          </div>
          <button onClick={requestFullscreen} class="btn btn-success">Enter Fullscreen Mode</button>
          <button onClick={startQuiz} class="btn btn-outline-success">Start Quiz</button>
        </div>
      ) : (
        <QuizComponent
          questions={questions}
          currentQuestion={currentQuestion}
          timeLeft={timeLeft}
          handleNextQuestion={handleNextQuestion}
          endQuiz={endQuiz}
        />
      )}
    </div>
    </div>
  );
};

export default App;


































// ***********************************************
// import React, { createContext } from 'react'
// import Homepage from './COMPONENTS/Homepage'
// import Resultpage from './COMPONENTS/Resultpage'
// import { useState,useEffect } from 'react'
// export const myBox=createContext()
// function App() {
//   const [state,setState]=useState("home")
  

//   return (
//     <div> 
//       {state=="home" && <Homepage/>}
//       {state=="result" && <Resultpage/>}
//     </div>
//   )
// }

// export default App



//

// import { useState, createContext } from "react"
// import HomePage from "./COMPONENTS/HomePage";
// import Question from "./COMPONENTS/Question";
// import Result from "./COMPONENTS/Result";

// //Create that BOX

// export const myBox = createContext()


// function App() 
// {
//   const [ stage, setStage ] = useState("home")
//   // stage = "result"
//   const [ myScore, setMyScore ] = useState(0)

//   return (
//     <div>
//       <myBox.Provider value={ {ss :setStage, ms :myScore, sms :setMyScore} }>
//           { stage == "home" && <HomePage/> }
//           { stage == "question" && <Question/> }
//           { stage == "result" && <Result/> }
//       </myBox.Provider>
        
      
//     </div>