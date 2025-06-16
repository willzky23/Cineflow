// cypress/e2e/home_page.cy.js

// 'describe' é um bloco de teste do Mocha (que o Cypress usa)
describe('Página Inicial do CineFlow', () => {

  // 'beforeEach' é executado antes de cada 'it' (teste) neste bloco
  beforeEach(() => {
    // Visita a URL base do seu aplicativo.
    // Lembre-se de configurar 'baseUrl' no arquivo 'cypress.config.js'
    // para a URL onde seu live-server está rodando (ex: 'http://127.0.0.1:8080').
    cy.visit('/');
  });

  // 'it' (ou 'test') define um caso de teste individual
  it('deve carregar a página inicial e exibir o banner principal', () => {
    // cy.get() busca elementos no DOM usando seletores CSS
    // .should('be.visible') verifica se o elemento está visível na tela
    cy.get('#hero-banner').should('be.visible');

    // Verifica se o título e a descrição do banner não estão vazios
    cy.get('.hero-title').should('not.be.empty');
    cy.get('.hero-description').should('not.be.empty');
  });

  it('deve exibir o carrossel de filmes populares', () => {
    // Verifica se a seção do carrossel existe e está visível
    cy.get('#popular-movies-carousel').should('be.visible');

    // Verifica se há pelo menos um slide de filme dentro do carrossel
    // Ajuste o seletor '.swiper-slide' se o seu HTML for diferente
    cy.get('.swiper-slide').its('length').should('be.gt', 0);
  });

  it('deve navegar para a página de detalhes de um filme ao clicar em um item do carrossel', () => {
    // Clica no primeiro item do carrossel
    // Certifique-se de que o seletor '.swiper-slide a' aponta para o link correto dentro do slide
    cy.get('.swiper-slide a').first().click();

    // Verifica se a URL mudou para a página de detalhes do filme (ex: filmeindividual.html?id=...)
    // cy.url() obtém a URL atual
    // .should('include', 'filmeindividual.html?id=') verifica se a URL contém essa string
    cy.url().should('include', 'filmeindividual.html?id=');

    // Você pode adicionar mais verificações aqui, como:
    // cy.get('.movie-details-title').should('be.visible');
    // cy.get('.movie-details-description').should('not.be.empty');
  });

});