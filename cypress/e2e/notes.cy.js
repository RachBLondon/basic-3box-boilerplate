describe("Notes page", () => {
  beforeEach(() => {
    cy.visitApp({ path: "/notes" });
  });

  it("shows the Add view by default with both public and private forms", () => {
    cy.contains("h3", "Public").should("be.visible");
    cy.contains("h3", "Private").should("be.visible");
    cy.get("textarea").should("have.length", 2);
    cy.contains("label", "Save a Public Note").should("be.visible");
    cy.contains("label", "Save a Private Note").should("be.visible");
  });

  it("toggles between Add and View modes", () => {
    cy.contains("button", "View").click();
    cy.get("h2").contains("View").should("be.visible");
    cy.get("textarea").should("not.exist");

    cy.contains("button", "Add").click();
    cy.get("textarea").should("have.length", 2);
  });

  it("submits a public note and clears the textarea", () => {
    cy.get("textarea").eq(0).type("hello public world").should("have.value", "hello public world");
    cy.get("textarea").eq(0).parents("form").find("button[type=submit]").click();
    cy.get("textarea").eq(0).should("have.value", "");
  });

  it("submits a private note and clears the textarea", () => {
    cy.get("textarea").eq(1).type("hello private world").should("have.value", "hello private world");
    cy.get("textarea").eq(1).parents("form").find("button[type=submit]").click();
    cy.get("textarea").eq(1).should("have.value", "");
  });

  it("logs a confirmation when a public note is saved", () => {
    cy.window().then((win) => cy.spy(win.console, "log").as("consoleLog"));
    cy.get("textarea").eq(0).type("note content");
    cy.get("textarea").eq(0).parents("form").find("button[type=submit]").click();
    cy.get("@consoleLog").should("have.been.calledWith", "saved");
  });
});
