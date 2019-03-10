describe('App initialization', () => {
  it('Displays loans from API on load', () => {
    cy.seedAndVisit()
    cy.get('.cy-loans-list > a').should('have.length', 20)
  })

  it('Redirects to loads detail Page', () => {
    cy.seedAndVisit()
    cy.get('.cy-loans-list > a')
      .first()
      .click()
      .url()
      .should('eq', 'http://localhost:3000/398823')
  })
})
