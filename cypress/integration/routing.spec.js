describe('App initialization', () => {
  it('Displays loans from API on load', () => {
    cy.seedAndVisit()
    cy.get('.cy-loans-list > div').should('have.length', 20)
  })

  it('Redirects to loads detail Page', () => {
    cy.seedAndVisit()
    cy.get('.cy-loans-list > div')
      .first()
      .click()
      .url()
      .should('eq', 'http://localhost:3000/398823')
  })
})
