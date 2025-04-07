// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {loginPage} from '../e2e/OrangeHRM/PageObjectModel';


Cypress.Commands.add('login', (login, password) => {
    cy.visit('/').wait(500)
    cy.url().should('include','web/index.php/auth/login')
    loginPage.username.click().type(login)
    loginPage.password.click().type(password).type('{enter}')
})

Cypress.Commands.add('today', () => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2,'0')
    const month = String(now.getMonth() +1).padStart(2,'0')
    const year = now.getFullYear()
    return `${year}-${day}-${month}`
})