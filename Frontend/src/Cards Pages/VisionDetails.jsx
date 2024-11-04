import React, { useEffect, useState, useRef } from "react";
import "./visionStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const VisionDetails = () => {
  const [questionIndex, setQuestionIndex] = useState(0); //Tracks current question
  const [userAnswer, setUserAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [speakCount, setSpeakCount] = useState(0); //Helps to ensure each question is spoken only once.
  const timeoutRef = useRef(null);

  const questions = [
    {
      text: "What is a good habit to remember when moving around at home?",
      options: ["Walk slowly", "Run quickly", "Jump around"],
      correct: "Walk slowly",
      explanation:
        "Walking slowly helps you stay aware of your surroundings, making it safer to navigate and avoid obstacles.",
    },
    {
      text: "What is a good way to stay hydrated during the day?",
      options: [
        "Drink small amounts frequently",
        "Drink only when thirsty",
        "Avoid drinking water",
      ],
      correct: "Drink small amounts frequently",
      explanation:
        "Drinking water in small amounts throughout the day helps maintain hydration without overloading the body at once.",
    },
    {
      text: "What should you do when you hear a fire alarm?",
      options: [
        "Stay calm and listen",
        "Panic and run",
        "Wait for others to act",
      ],
      correct: "Stay calm and listen",
      explanation:
        "Staying calm and listening for instructions or familiar voices helps you make safe and informed decisions.",
    },
    {
      text: "What should you do before crossing the street?",
      options: [
        "Listen for traffic sounds",
        "Walk immediately",
        "Run across quickly",
      ],
      correct: "Listen for traffic sounds",
      explanation:
        "Listening carefully for traffic sounds can help you understand when it is safe to cross and avoid accidents.",
    },
    {
      text: "How can you keep track of time more easily?",
      options: ["Set reminders", "Guess the time", "Check a clock often"],
      correct: "Set reminders",
      explanation:
        "Setting reminders for important tasks or events helps you manage time effectively and stay organized.",
    },
    {
      text: "How often should you drink water daily?",
      options: ["Once", "Twice", "8 glasses"],
      correct: "8 glasses",
      explanation:
        "Drinking around 8 glasses of water each day helps maintain hydration and supports various bodily functions, including metabolism and energy.",
    },
  ];

  //Seeting up speech and listening
  const synth = window.speechSynthesis;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  //Used for reading the question
  useEffect(() => {
    if (quizStarted && speakCount < 1) {
      readQuestion();
    }
  }, [questionIndex, speakCount, quizStarted]);

  //Resets the quiz to the first question and starts it
  const startQuiz = () => {
    setQuizStarted(true);
    setQuestionIndex(0);
    setSpeakCount(0);
    setUserAnswer("");
  };

  //Ends the quiz, resets states, and thanks the user
  const stopQuiz = () => {
    setQuizStarted(false);
    setQuestionIndex(0);
    setSpeakCount(0);
    setUserAnswer("");
    synth.cancel();
    clearTimeout(timeoutRef.current);
    speak("Thank you for participating! The quiz has ended.");
  };

  //Reads the current question with its options
  const readQuestion = () => {
    const question = questions[questionIndex];
    if (speakCount < 1) {
      const utterance = new SpeechSynthesisUtterance(
        `Question: ${question.text}. Options are: ${question.options.join(
          ", "
        )}. You can answer now.`
      );
      synth.speak(utterance);
      setSpeakCount(speakCount + 1);
      utterance.onend = () => startListening();
    }
  };

  //Capture the user's spoken answer
  const startListening = () => {
    if (!recognition) {
      toast.error("Speech recognition API not supported in this browser.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setIsListening(true);
    recognition.start();
    // Set a timeout to repeat the question if no answer is detected
    timeoutRef.current = setTimeout(() => {
      speak("I think you didn’t hear the question. Let me repeat it for you.");
      readQuestion();
    }, 10000);
  };

  if (recognition) {
    recognition.onresult = (event) => {
      // Clear timeout if there's an answer
      clearTimeout(timeoutRef.current);
      const transcript = event.results[0][0].transcript;
      setUserAnswer(transcript);
      checkAnswer(transcript);
    };

    recognition.onend = () => setIsListening(false);
  }

  //Evaluates the user’s spoken answer
  const checkAnswer = (answer) => {
    const question = questions[questionIndex];
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedCorrectAnswer = question.correct.toLowerCase();

    // Check if the normalized answer contains the correct answer as a substring
    if (normalizedAnswer.includes(normalizedCorrectAnswer)) {
      speak(`Correct! ${question.correct}. ${question.explanation}`, () => {
        if (questionIndex < questions.length - 1) {
          // Proceed to the next question
          setTimeout(goToNextQuestion, 4000);
        } else {
          speak("Congratulations! You've completed the quiz.");
          stopQuiz();
        }
      });
    } else {
      speak(
        `Incorrect. The correct answer is ${question.correct}. ${question.explanation}`,
        () => {
          if (questionIndex < questions.length - 1) {
            // Proceed to the next question
            setTimeout(goToNextQuestion, 4000);
          } else {
            speak("Thank you for participating! The quiz has ended.");
            stopQuiz();
          }
        }
      );
    }
  };

  //Helps to navigate to next question
  const goToNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setSpeakCount(0);
      setQuestionIndex(questionIndex + 1);
    } else {
      stopQuiz();
    }
  };

  //Handles the text-to-speech synthesis
  const speak = (text, callback) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
    utterance.onend = callback || null;
  };

  return (
    <div className="visionContainer">
      <h1 className="visionHeading">
        Support for Individuals with Vision Disabilities
      </h1>
      <p className="visionIntro">
        Our services are designed to empower individuals with vision
        disabilities to live independently and confidently. We provide tailored
        programs and resources to meet the unique needs of each person.
      </p>

      <h2 className="visionSubheading">Our Services</h2>
      <ul className="visionServicesList">
        <li>Vision Rehabilitation</li>
        <li>Assistive Technology Training</li>
        <li>Mobility Training</li>
        <li>Orientation and Mobility Services</li>
        <li>Support Groups and Counseling</li>
      </ul>
      <h2 className="visionSubheading">Daily Essentials Quiz</h2>

      <div className="quizMainContainer">
        {!quizStarted ? (
          <button className="startButton" onClick={startQuiz}>
            Start Quiz
          </button>
        ) : (
          <div className="quizContainer">
            <p className="question">{questions[questionIndex].text}</p>
            <p className="quizStatus">
              Listening for your answer: {isListening ? "Yes" : "No"}
            </p>
            <p className="quizAnswer">
              Your Answer: {userAnswer || "Awaiting response..."}
            </p>
            <button className="stopButton" onClick={stopQuiz}>
              Stop Quiz
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
