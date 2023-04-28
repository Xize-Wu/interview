describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get("[data-testid=day]").contains("Tuesday").click()
    .should("have.css", "background-color", "rgba(0, 0, 0, 0)");
  });
  });
