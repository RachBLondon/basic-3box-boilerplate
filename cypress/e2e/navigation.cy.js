describe("Navigation between routes", () => {
  const account = "0x1234567890abcdef1234567890abcdef12345678";

  beforeEach(() => {
    cy.visitApp({ accounts: [account] });
  });

  it("shows the Home view by default with the connected eth address", () => {
    cy.get("h1").contains("Home").should("be.visible");
    cy.contains("h2", account).should("be.visible");
  });

  it("navigates to the Profile route via the navbar link", () => {
    cy.contains("a", "Profile Update").click();
    cy.location("pathname").should("eq", "/profile");
    cy.get("h1").contains("Profile").should("be.visible");
  });

  it("navigates to the Notes route via the navbar link", () => {
    cy.contains("a", "Notes").click();
    cy.location("pathname").should("eq", "/notes");
    cy.get("h2").contains("Notes").should("be.visible");
  });

  it("navigates back to Home from another route", () => {
    cy.contains("a", "Notes").click();
    cy.location("pathname").should("eq", "/notes");
    cy.contains("a", "Home").click();
    cy.location("pathname").should("eq", "/");
    cy.get("h1").contains("Home").should("be.visible");
  });

  it("renders the requested route on initial load", () => {
    cy.visitApp({ accounts: [account], path: "/profile" });
    cy.get("h1").contains("Profile").should("be.visible");
  });
});
