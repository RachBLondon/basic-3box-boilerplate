// Visit the app with a stubbed window.ethereum (MetaMask) provider.
// Pass { ethereum: false } to simulate a non-Web3 browser.
Cypress.Commands.add("visitApp", (options = {}) => {
  const { ethereum = true, accounts = ["0xABCDEF0000000000000000000000000000000001"], path = "/" } = options;

  cy.visit(path, {
    onBeforeLoad(win) {
      if (ethereum) {
        win.ethereum = {
          autoRefreshOnNetworkChange: true,
          enable: cy.stub().as("ethEnable").resolves(accounts),
        };
      } else {
        try {
          delete win.ethereum;
        } catch (e) {
          win.ethereum = undefined;
        }
      }
    },
  });
});
