describe('Quiz App - E2E Test', () => {
    beforeEach(() => {
      // Visit the route where Quiz is mounted
        cy.visit('http://localhost:3001/quiz');
      });
      
    it('starts quiz, shows questions and completes it', () => {
      // Start button visible
      cy.contains('Start Quiz').should('be.visible').click();
  
      // First question appears
      cy.get('.card h2').should('contain.text', 'What is the output of print(2 ** 3)?');
  
      // Assert all answer texts are visible
      cy.contains('6').should('be.visible');
      cy.contains('8').should('be.visible');
      cy.contains('9').should('be.visible');
      cy.contains('12').should('be.visible');
  
      // Click an answer (correct one for test)
      cy.contains('8').click();
  
      // Next question
      cy.get('.card h2').should('contain.text', 'Which of the following is a mutable data type in Python?');
  
      // Click incorrect answer
      cy.contains('int').click();
  
      // Show result
      cy.contains('Quiz Completed').should('be.visible');
      cy.contains('Your score: 1/2').should('be.visible');
  
      // Restart quiz
      cy.contains('Take New Quiz').click();
      cy.contains('What do square brackets represent in TypeScript?').should('be.visible');
    });
  });
  