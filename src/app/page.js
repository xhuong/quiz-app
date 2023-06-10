"use client";

import Image from "next/image";
import PrimaryButton from "./components/PrimaryButton";
import RobotImage from "../../public/robot.png";
import { useEffect, useState } from "react";
import QuizLayout from "./layouts/QuizLayout";
import ResultLayout from "./layouts/ResultLayout";

export default function Home() {
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [isPassedQuiz, setIsPassedQuiz] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const handleScore = () => {
    setScore((prev) => prev + 1);
  };

  const handlePassedQuiz = () => {
    if (score / question?.length >= 0.5) {
      setIsPassedQuiz(true);
    }
  };

  const handleStartQuiz = () => {
    setStep(1);
    setIsActiveTimer(true);
  };

  // when clicked button next question
  const handleNextQuestion = () => {
    if (currentIndex > question.length - 2) {
      setIsActiveTimer(false);
      setStep(2);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleViewIncorrectAnswers = () => {
    const listIncorrectAnswers = quizData.filter((quizDataItem) => {
      return quizDataItem.isCorrectAnswer === false;
    });
    if (listIncorrectAnswers.length > 0) {
      setIncorrectAnswers([...listIncorrectAnswers]);
    }
  };

  const handleReplayQuiz = () => {
    setStep(0);
    setQuizData([]);
    setQuestion([]);
    setCurrentIndex(0);
    setIsPassedQuiz(false);
    setScore(0);
  };

  const handleSetQuizData = (data) => {
    if (quizData.length > 0) {
      setQuizData((prev) => [...prev, { ...data }]);
    } else {
      setQuizData([{ ...data }]);
    }
  };

  const handleCompletedQuiz = (seconds) => {
    setTotalTime(seconds);
  };

  const fetchQuestion = () => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestion(data.results);
      });
  };

  useEffect(() => {
    if (step === 0) {
      fetchQuestion();
    }
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      handlePassedQuiz();
    }
  }, [step]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      {step === 0 ? (
        <div className="text-center w-96">
          <div className="bg-white w-40 h-40 rounded-full flex justify-center items-center overflow-hidden mb-10 mx-auto">
            <Image
              src={RobotImage}
              className="scale-150 hover:rotate-12 transition-all duration-300"
              alt="robot-image"
            />
          </div>
          <p className="text-center mb-10">
            You must pass 50% of the questions to complete the test, each correct answer corresponds to 1 point!
          </p>
          <PrimaryButton onClick={handleStartQuiz}>Start quiz !</PrimaryButton>
        </div>
      ) : step === 1 ? (
        <QuizLayout
          isActive={isActiveTimer}
          score={score}
          handleScore={handleScore}
          totalQuiz={question?.length}
          currentIndexOfQuestion={currentIndex + 1}
          currentQuestion={question[currentIndex]}
          handleSetQuizData={handleSetQuizData}
          handleNextQuestion={handleNextQuestion}
          handleCompletedQuiz={handleCompletedQuiz}
        />
      ) : (
        <ResultLayout
          score={score}
          totalTime={totalTime}
          totalQuestion={question?.length}
          isPassedQuiz={isPassedQuiz}
          handleReplayQuiz={handleReplayQuiz}
          handleViewIncorrectAnswers={handleViewIncorrectAnswers}
          listIncorrectAnswers={incorrectAnswers}
        />
      )}
    </main>
  );
}
