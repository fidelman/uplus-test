describe('App initialization', () => {
  it('Displays loans from API on load', () => {
    cy.seedAndVisit()
    cy.get('.cy-loans-list > a').should('have.length', 20)
  })

  it('Redirects to loads detail Page', () => {
    cy.seedAndVisit()

    const baseUrl = Cypress.config('baseUrl')

    cy.get('.cy-loans-list > a')
      .first()
      .click()
      .url()
      .should('eq', `${baseUrl}/zonky/398823`)
      .get('h1')
      .should('have.contain', 'Bydlení')
  })
})
