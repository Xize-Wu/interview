describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
  });

  
  it('books an interview in scheduler', () => {
    cy.get('[alt=Add]').first().click();
    cy.get('[data-testid="student-name-input"]').type('Lydia Miller-Jones');
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains('Save').click();
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
  });
  
  it('edits an interview in scheduler', () => {
    cy.get('[alt=Edit]').first().click({ force: true });
    cy.get('[data-testid="student-name-input"]')
    .clear()
    .type('Swabbie Douglas');
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains('Save').click();
    cy.contains('.appointment__card--show', 'Swabbie Douglas');
  });
  
  it('cancels an interview in scheduler', () => {
    cy.get('[alt=Delete]').first().click({ force: true });
    cy.contains('Confirm').click();
    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});

  