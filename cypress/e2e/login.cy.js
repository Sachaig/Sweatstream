describe("Test de connexion", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("devrait se connecter à un compte utilisateur", () => {
    // Visite la page de connexion
    cy.visit("http://localhost:3000/login");

    // Remplit les champs du formulaire
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Test33100$");

    // Valide le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifie que l'utilisateur est redirigé à l'accueil après inscription
    cy.url().should("eq", "http://localhost:3000/");

    // Vérifie que l'utilisateur est connecté
    cy.contains("Bonjour, test");
  });
});
