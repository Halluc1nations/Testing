import Quiz from "../../src/client/components/Quiz";
import { mount } from "cypress/react18";
import * as api from "../../client/src/services/questionApi";

const mockQuestions = [
  {
    question: "What is the output of print(2 ** 3)?",
    answers: [
      { text: "6", isCorrect: false },
      { text: "8", isCorrect: true },
      { text: "9", isCorrect: false },
      { text: "12", isCorrect: false },
    ],
  },
  {
    question: "Which of the following is a mutable data type in Python?",
    answers: [
      { text: "str", isCorrect: false },
      { text: "tuple", isCorrect: false },
      { text: "list", isCorrect: true },
      { text: "int", isCorrect: false },
    ],
  },
];

describe("Quiz Component", () => {
  beforeEach(() => {
    cy.stub(api, "getQuestions").resolves(mockQuestions);
    mount(<Quiz />);
  });

  it("should start quiz and answer all questions", () => {
    cy.contains("Start Quiz").click();

    // First question visible
    cy.contains(mockQuestions[0].question).should("be.visible");

    // ✅ Check that all 4 answers are visible
    mockQuestions[0].answers.forEach((answer) => {
      cy.contains(answer.text).should("be.visible");
    });

    // Answer the first question correctly
    cy.contains(mockQuestions[0].answers[0].text).click(); // "Arrays"

    // Second question
    cy.contains(mockQuestions[1].question).should("be.visible");
    cy.contains(mockQuestions[1].answers[1].text).click(); // Incorrect

    // Quiz completed
    cy.contains("Quiz Completed").should("be.visible");
    cy.contains("Your score: 1/2").should("be.visible");

    // Restart quiz
    cy.contains("Take New Quiz").click();
    cy.contains(mockQuestions[0].question).should("be.visible");
  });
});
