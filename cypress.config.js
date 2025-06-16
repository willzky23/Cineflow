// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // ATENÇÃO: SUBSTITUA a porta 8080 PELA PORTA QUE O LIVE-SERVER ESTIVER USANDO
    baseUrl: 'http://127.0.0.1:8080', // <--- **AJUSTE ESSA LINHA**
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});