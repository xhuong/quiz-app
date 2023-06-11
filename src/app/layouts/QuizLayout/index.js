import SecondaryButton from "@/app/components/SecondaryButton";
import Timer from "@/app/components/Timer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function QuizLayout({
  currentQuestion,
  handleNextQuestion,
  handleSetQuizData,
  totalQuiz,
  currentIndexOfQuestion,
  handleCompletedQuiz,
  handleScore,
  score,
  isActive,
}) {
  const [answerChoice, setAnswerChoice] = useState([]);
  const [selectedAnswerStatus, setSelectedAnswerStatus] = useState(0);
  const [indexCorrectAnswer, setIndexCorrectAnswer] = useState(null);
  const [indexSelected, setIndexSelected] = useState(null);
  const [isActiveNextButton, setIsActiveNextButton] = useState(false);

  const handleFindIndexCorrectAnswer = (index) => {
    const indexOfCorrectAnswer = answerChoice.findIndex((answer) => {
      return answer === currentQuestion.correct_answer;
    });

    setIndexSelected(index);
    setIndexCorrectAnswer(indexOfCorrectAnswer);
  };

  const handleClickChoice = (index, isCorrect) => {
    handleFindIndexCorrectAnswer(index);
    isCorrect ? setSelectedAnswerStatus(1) : setSelectedAnswerStatus(2);
    isCorrect ? handleScore(1) : undefined;
    setIsActiveNextButton(true);
  };

  const handleResetQuizStatus = () => {
    setSelectedAnswerStatus(0);
    setIndexCorrectAnswer(null);
    setIndexSelected(null);
    setIsActiveNextButton(false);
  };

  useEffect(() => {
    if (currentQuestion) {
      const currQues = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(
        () => Math.random() - 0.5
      );
      setAnswerChoice(currQues);
    }
  }, [currentQuestion]);

  useEffect(() => {
    // after selected answer, get the current question and answer of user then add it to quiz state
    if (indexSelected === 0 || indexSelected) {
      const answerOfUser = answerChoice.filter((arr, index) => {
        return index === indexSelected;
      });

      const { question, incorrect_answers, correct_answer } = currentQuestion;

      const quizObj = {
        question,
        incorrect_answers,
        correct_answer,
        answer_of_user: answerOfUser[0],
        isCorrectAnswer: answerOfUser[0] === correct_answer,
      };

      handleSetQuizData(quizObj);
    }
  }, [indexSelected]);

  return (
    <div className="">
      <div
        style={{
          width: "560px",
        }}
      >
        {currentQuestion ? (
          <React.Fragment>
            <h3>Score: {score}</h3>
            <Timer isActiveTimer={isActive} handleCompletedQuiz={handleCompletedQuiz} />

            <h4 className="mb-8 text-center bg-indigo-500 py-4 text-white">
              Question {currentIndexOfQuestion}/{totalQuiz}
            </h4>
            <h2 className="text-center mb-8">{currentQuestion?.question}</h2>
            <ul className="flex flex-col gap-y-2 mb-2">
              {answerChoice.map((answer, index) => (
                <li
                  style={{
                    pointerEvents: `${indexSelected === 0 || indexSelected ? "none" : "auto"}`,
                  }}
                  key={index}
                  className={`px-4 py-4 hover:cursor-pointer w-full text-center rounded-md ${
                    selectedAnswerStatus === 1 && index === indexCorrectAnswer
                      ? "bg-green-300 text-white"
                      : selectedAnswerStatus === 2 && index === indexSelected
                      ? "bg-red-300 text-white"
                      : "bg-zinc-200"
                  }`}
                  onClick={() => {
                    handleClickChoice(index, answer === currentQuestion.correct_answer);
                  }}
                >
                  {answer}
                </li>
              ))}
            </ul>
            <SecondaryButton
              onClick={() => {
                // reset quiz status
                handleResetQuizStatus();
                handleNextQuestion();
              }}
              isActive={isActiveNextButton}
            />
          </React.Fragment>
        ) : (
          <h5 className="text-center bg-sky-700 text-white rounded-md py-2">Question is loading....</h5>
        )}
      </div>
    </div>
  );
}
