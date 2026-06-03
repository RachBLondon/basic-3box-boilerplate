describe("MetaMask gating", () => {
  it("prompts the user to install MetaMask when window.ethereum is missing", () => {
    cy.visitApp({ ethereum: false });
    cy.contains("h1", "Please install metamask").should("be.visible");
    // Nav and app shell should not render when there is no Web3 provider.
    cy.contains("3Book").should("not.exist");
    cy.contains("Home").should("not.exist");
  });

  it("renders the app shell and calls ethereum.enable() when a provider is present", () => {
    cy.visitApp();
    cy.contains("h1", "3Book").should("be.visible");
    cy.contains("A simple social site").should("be.visible");
    cy.get("@ethEnable").should("have.been.calledOnce");
  });
});
