describe('Login Form Validation', () => {
  it('should show error when invalid email is entered', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('.error').should('contain', 'Invalid email');
  });

  it('should navigate to success page on valid login', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('valid@example.com');
    cy.get('input[name="password"]').type('ValidPass123');
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/success');
  });
});
