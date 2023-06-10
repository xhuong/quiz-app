import Image from "next/image";
import SuccessImage from "../../../../public/success.png";
import FailureImage from "../../../../public/failure.png";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useState } from "react";
import React from "react";

export default function ResultLayout({
  score,
  totalTime,
  totalQuestion,
  isPassedQuiz,
  handleReplayQuiz,
  handleViewIncorrectAnswers,
  listIncorrectAnswers,
}) {
  const [IsShowIncorrectAnswers, setIsShowIncorrectAnswers] = useState(false);
  console.log(listIncorrectAnswers);
  return (
    <div className="w-96">
      <h2 className="mb-8 text-center bg-indigo-500 py-4 text-white">Your result</h2>
      <p className="mb-2">Total time you need to completed this quiz: {totalTime}s</p>
      <p className="mb-2">
        Total of correct answer: {score}/{totalQuestion}
      </p>
      {isPassedQuiz ? (
        <div className="text-center mb-4">
          <Image src={SuccessImage} alt="success-image" />
          <p className="mt-4 text-white bg-green-400 py-4 rounded-md">Congratulations on passing the test!</p>
        </div>
      ) : (
        <div className="text-center mb-4">
          <Image src={FailureImage} alt="failure-image" />
          <p>You did not pass the quiz. Better luck next time!</p>
        </div>
      )}
      <PrimaryButton onClick={handleReplayQuiz}>Replay the test?</PrimaryButton>

      {IsShowIncorrectAnswers &&
        listIncorrectAnswers.map((answerItem, index) => (
          <React.Fragment>
            <p>List incorrect answers:</p>
            <ul className="mb-2" key={index}>
              <li className="bg-slate-300 rounded-md px-2 py-2">
                <h2 className="bg-white px-2 py-1 rounded-md mb-1">{answerItem.question}</h2>
                <ul>
                  {[answerItem.correct_answer, ...answerItem.incorrect_answers].map((item, index) => (
                    <li
                      key={index}
                      className={`${
                        answerItem.answer_of_user === item
                          ? "bg-red-500"
                          : answerItem.correct_answer === item
                          ? "bg-green-500"
                          : ""
                      } text-white px-2 py-1 rounded-md`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </React.Fragment>
        ))}

      {!IsShowIncorrectAnswers && (
        <PrimaryButton
          onClick={() => {
            handleViewIncorrectAnswers();
            setIsShowIncorrectAnswers(true);
          }}
        >
          View the answers to the incorrect answers
        </PrimaryButton>
      )}
    </div>
  );
}
