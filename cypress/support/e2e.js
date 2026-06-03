import "./commands";

// React 16 + react-scripts 3 occasionally emits noisy warnings as uncaught
// exceptions inside Cypress. Don't fail the run on them.
Cypress.on("uncaught:exception", () => false);
