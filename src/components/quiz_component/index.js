import React, { Component } from "react";
import { quizQuesData } from "../../common/constants/question_data";
import "./style.css";
class QuizComponent extends Component {
  state = {
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    question: null,
    answer: null,
    isQuesAnswered: false,
    quizData: quizQuesData,
  };

  loadQuizOues = () => {
    const { currentQuestion, quizData } = this.state;
    this.setState((prevState) => {
      return {
        question: quizData[currentQuestion].question,
        options: quizData[currentQuestion].options,
        answer: quizData[currentQuestion].answer,
        userAnswer: null,
      };
    });
  };

  nextQuestionHandler = () => {
    const { currentQuestion, quizData } = this.state;
    if (currentQuestion < quizData.length) {
      this.setState((prevState) => {
        return {
          currentQuestion: prevState.currentQuestion + 1,
          isQuesAnswered: false,
        };
      });
    }
  };

  questionAnswerHandler = (userQuesAnswer) => {
    const { answer, currentQuestion, quizData, userAnswer } = this.state;
    // This is very important short code here
    quizData[currentQuestion].isUserAnswerCorrect = answer === userQuesAnswer;

    if (!userAnswer) {
      this.setState({
        isQuesAnswered: true,
        userAnswer: userQuesAnswer,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentQuestion, quizData } = this.state;

    if (
      prevState.currentQuestion !== currentQuestion &&
      currentQuestion < quizData.length
    ) {
      this.loadQuizOues();
    } else if (currentQuestion === quizData.length - 1) {
    }
  }

  componentDidMount() {
    this.loadQuizOues();
  }

  render() {
    const {
      options,
      question,
      currentQuestion,
      isQuesAnswered,
      quizData,
      userAnswer,
    } = this.state;
    console.log("userAnswer :", currentQuestion);
    let userQuestion = <div className="question">{question}</div>;
    let questionOptions =
      options &&
      options.map((ques, index) => {
        return (
          <p
            key={ques + index}
            onClick={() => this.questionAnswerHandler(ques)}
            className={`ui cursorPointer floating message ${
              userAnswer == ques ? "selected" : null
            }`}
          >
            {ques}
          </p>
        );
      });

    return (
      <div className="row w-75 d-flex">
        <div className="col-md-12">
          <h2>{userQuestion}</h2>
          <span>
            Question of {currentQuestion + 1} of {quizData.length}
          </span>
          {questionOptions}
          <button
            className={`ui button ${
              !isQuesAnswered ? "disabled selectedAnswer" : null
            }`}
            onClick={this.nextQuestionHandler}
          >
            {quizData.length === currentQuestion + 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    );
  }
}
export default QuizComponent;
