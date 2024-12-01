describe("Login form - validation errors", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should show error message for invalid email", () => {
    cy.get('input[type="email"]').type("invalidemail"); 
    cy.get('input[type="password"]').type("Password1"); 
    cy.get("button").should("be.disabled"); // Buton disabled olmalı
    cy.get(".email-error")
      .should("have.css", "display", "block") // Hata mesajı görünür olmalı
      .and("contain", "Geçerli bir email giriniz."); // Hata mesajı kontrolü
  });
  
  it("should show error message for invalid password", () => {
    cy.get('input[type="email"]').type("test@example.com"); // Geçerli email giriliyor
    cy.get('input[type="password"]').type("123"); // Geçersiz şifre
    cy.get("button").should("be.disabled"); // Buton disabled olmalı
    cy.get(".password-error")
      .should("be.visible") // Hata mesajının görünür olduğundan emin ol
      .and(
        "contain",
        "Şifre en az 8 karakter, bir büyük harf ve bir sayı içermelidir."
      ); // Hata mesajı kontrolü
  });

  it("should show error message for not accepting terms", () => {
    cy.get('input[type="email"]').type("test@example.com"); // Geçerli email
    cy.get('input[type="password"]').type("Password1"); // Geçerli şifre
    cy.get('input[type="checkbox"]').uncheck(); // Şartları kabul etme
    cy.get("button").should("be.disabled"); // Buton disabled olmalı
    cy.get(".terms-error")
      .should("be.visible") // Hata mesajının görünür olduğundan emin ol
      .and("contain", "Şartları kabul etmelisiniz."); // Hata mesajı kontrolü
  });

  it("should submit form and navigate to success page", () => {
    cy.get('input[type="email"]').type("test@example.com"); // Geçerli email
    cy.get('input[type="password"]').type("Password1"); 
    cy.get('input[type="checkbox"]').check(); 
    cy.get("button").should("not.be.disabled");
    cy.get("form").submit(); 
    cy.url().should("include", "/success"); 
  });
});
