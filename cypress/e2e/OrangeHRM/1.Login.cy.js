/// <reference types="cypress"/>
import { loginPage } from './PageObjectModel';

describe('Login functionality', () => {
    let logindata;
    beforeEach(() => {
        cy.fixture('data').then((data)=> {
            logindata=data;
        })
    })
    it("Incorrect login", () => {
        cy.login(logindata.login.username.wrong,logindata.login.password.wrong)
        cy.url().should('include','web/index.php/auth/login')
        cy.get('.oxd-alert-content--error').should("be.visible")
    })

    it("Login attempt with empty username and password", () => {
        cy.visit("/")
        loginPage.submit.click()
        cy.url().should('include','web/index.php/auth/login')
        loginPage.username.should('have.css','border-color','rgb(235, 9, 16)')
        loginPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        loginPage.password.should('have.css','border-color','rgb(235, 9, 16)')
        loginPage.errorMessage.eq(1).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
    })

    it("Login with only username entered", () => {
        cy.visit("/")
        loginPage.username.click().type(logindata.login.username.correct)
        loginPage.submit.click()
        cy.url().should('include','web/index.php/auth/login')
        loginPage.username.should('not.have.css','border-color','rgb(235, 9, 16)')
        loginPage.password.should('have.css','border-color','rgb(235, 9, 16)')
        loginPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
    })

    it("Login with only password entered", () => {
        cy.visit("/")
        loginPage.password.click().type(logindata.login.password.correct)
        loginPage.submit.click()
        cy.url().should('include','web/index.php/auth/login')
        loginPage.password.should('not.have.css','border-color','rgb(235, 9, 16)')
        loginPage.username.should('have.css','border-color','rgb(235, 9, 16)')
        loginPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
    })


    it("Correct login", () => {
        cy.login(logindata.login.username.correct , logindata.login.password.correct)
        cy.url().should('include', 'web/index.php/dashboard/index')
    })

    it("Log out", () => {
        cy.login(logindata.login.username.correct , logindata.login.password.correct)
        cy.get(".oxd-userdropdown").click().wait(1000).contains("Logout").click()
        cy.url().should('include','web/index.php/auth/login')
    })

    it("Redirects to login page after session is cleared via cookies", () => {
        cy.login(logindata.login.username.correct , logindata.login.password.correct)
        cy.wait(500)
        cy.clearCookies()
        cy.reload().wait(500)
        cy.url().should('include', 'web/index.php/auth/login')
    })

    it("Logged-in user is not allowed to access login page directly", () => {
        cy.login(logindata.login.username.correct , logindata.login.password.correct)
        cy.url().should('include', 'web/index.php/dashboard/index')
        cy.wrap(null).then(() => {
            cy.visit("/");
          });  
        cy.url().should("not.include", "web/index.php/auth/login")
        cy.url().should('include', 'web/index.php/dashboard/index')

    })
})

