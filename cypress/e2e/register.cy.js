describe("Test d'inscription", () => {
  it("devrait permettre à un utilisateur de créer un compte avec succès", () => {
    // Visite la page d'inscription
    cy.visit("http://localhost:3000/register");

    // Remplit les champs du formulaire
    cy.get('input[name="firstname"]').type("test");
    cy.get('input[name="lastname"]').type("test");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Test33100$");

    // Valide le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifie que l'utilisateur est redirigé à l'accueil après inscription
    cy.url().should("eq", "http://localhost:3000/login");
  });
});
