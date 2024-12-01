describe("Login form - validation errors", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  
  it("should show error message for invalid email", () => {
    cy.get('input[type="email"]').type("invalidemail"); 
    cy.get('input[type="password"]').type("Password1"); 
    cy.get("button").should("be.disabled"); 
    cy.get(".email-error")
      .should("have.css", "display", "block") 
      .and("contain", "Geçerli bir email giriniz."); 
  });
  


  it("should show error message for invalid password", () => {
    cy.get('input[type="email"]').type("test@example.com"); 
    cy.get('input[type="password"]').type("123"); 
    cy.get("button").should("be.disabled"); 
    cy.get(".password-error")
      .should("be.visible") 
      .and(
        "contain",
        "Şifre en az 8 karakter, bir büyük harf ve bir sayı içermelidir."
      ); 
  });


  it("should show error message for not accepting terms", () => {
    cy.get('input[type="email"]').type("test@example.com"); 
    cy.get('input[type="password"]').type("Password1"); 
    cy.get('input[type="checkbox"]').uncheck(); 
    cy.get("button").should("be.disabled"); 
    cy.get(".terms-error")
      .should("be.visible") 
      .and("contain", "Şartları kabul etmelisiniz."); 
  });


  it("should submit form and navigate to success page", () => {
    cy.get('input[type="email"]').type("test@example.com"); 
    cy.get('input[type="password"]').type("Password1"); 
    cy.get('input[type="checkbox"]').check(); 
    cy.get("button").should("not.be.disabled");
    cy.get("form").submit(); 
    cy.url().should("include", "/success"); 
  });
});
