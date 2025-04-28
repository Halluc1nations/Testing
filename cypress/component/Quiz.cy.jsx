import Quiz from "../../client/src/components/Quiz";

describe("Quiz Component", () => {
  const NUM_QUESTIONS = 2;
  const NUM_ANSWERS = 4;
  beforeEach(() => {
    cy.mount(<Quiz />);
    cy.intercept("GET", "/api/questions/random", {
      fixture: "questions.json",
    }).as("getQuestions");
  });

  it("should start quiz and display first question", () => {
    cy.contains("Start Quiz").click();

    // First question visible
    cy.get("h2").should("be.visible");
  });



  it("should display second question after answering", () => {
    cy.contains("Start Quiz").click();

    for (let i = 0; i < NUM_QUESTIONS; i++) {
      cy.get("button").should('have.length', NUM_ANSWERS).first().click(); // Check for CORRECT number of answer buttons
    }
  
      // Quiz completed
      cy.contains("Quiz Completed").should("be.visible");
      
  });
  it("should display score at the end of the test", () => {
    cy.contains("Start Quiz").click();

    for (let i = 0; i < NUM_QUESTIONS; i++) {
      cy.get("button").should('have.length', NUM_ANSWERS).first().click(); // Check for CORRECT number of answer buttons
    }
  
      // Quiz completed
      cy.contains("Quiz Completed").should("be.visible");
      
      cy.contains("Your score").should("be.visible");
  
      
  });
  it("should allow me to take another test", () => {
    cy.contains("Start Quiz").click();

    for (let i = 0; i < NUM_QUESTIONS; i++) {
      cy.get("button").should('have.length', NUM_ANSWERS).first().click(); // Check for CORRECT number of answer buttons
    }
  
      // Quiz completed
      cy.contains("Quiz Completed").should("be.visible");
      
      cy.contains("Your score").should("be.visible");
  
     // Restart quiz
  cy.contains("Take New Quiz").click();
      
  // First question visible
  cy.get("h2").should("be.visible");
  });
});
