import { fetchLoansURL } from '../../src/config'

Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:loans') => {
  cy.server()
  cy.route('get', fetchLoansURL, seedData).as('load')
  cy.visit('/')
  cy.wait('@load')
})
