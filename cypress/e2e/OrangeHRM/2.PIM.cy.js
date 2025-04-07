/// <reference types="cypress"/>
import { empPage, navSide, pimNav } from './PageObjectModel';
import data from '../../fixtures/data.json';
const randomMaritalStatus = Cypress._.sample(data.user.second.maritalStatus);
const randomGender = Cypress._.sample(data.user.second.gender);
let id = ''
describe('Employee management', () => {
    beforeEach(() => {
        cy.login(data.login.username.correct , data.login.password.correct)
        navSide.menu.eq(1).click()
        cy.url().should('include','web/index.php/pim/viewEmployeeList')
    })
    it("Add new employee - without full name", () => {
        pimNav.menu.eq(2).click()
        cy.url().should('include', 'web/index.php/pim/addEmployee')
        cy.get('[type="submit"]').click()
        cy.url().should('include', 'web/index.php/pim/addEmployee')
        empPage.name.should('have.css','border-color','rgb(235, 9, 16)')
        empPage.lastName.should('have.css','border-color','rgb(235, 9, 16)')
        empPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        empPage.errorMessage.eq(1).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        cy.url().should('include', 'web/index.php/pim/addEmployee')
    })

    it("Add new employee - correct", () => {
        pimNav.menu.eq(2).click()
        cy.url().should('include', 'web/index.php/pim/addEmployee')
        empPage.name.click().type(data.user.first.name)
        empPage.lastName.click().type(data.user.first.lastname).type('{enter}')
        cy.url().should('include', 'web/index.php/pim/viewPersonalDetails/empNumber')
        cy.get(".oxd-input--active").eq(4).should('exist').should('be.visible').should(($input) => {
            expect($input[0].value).to.not.be.empty;
        }).then(($input) => {
            id=$input[0].value
        });
    })

    it("Add new employee with same ID", () => {
        pimNav.menu.eq(2).click()
        cy.url().should('include', 'web/index.php/pim/addEmployee')
        empPage.name.click().type(data.user.first.name)
        empPage.lastName.click().type(data.user.first.lastname)
        empPage.id.click().clear().type(id)
        cy.get('.oxd-input-field-error-message').should('be.visible')
        empPage.id.should('have.css','border-color','rgb(235, 9, 16)')
        cy.get(".oxd-input-field-error-message").invoke('text').then((text) => {
            expect(text).to.equal("Employee Id already exists")
        })
        cy.get('[type="submit"]').click()
        empPage.id.should('have.css','border-color','rgb(235, 9, 16)')
        cy.get(".oxd-input-field-error-message").invoke('text').then((text) => {
            expect(text).to.equal("Employee Id already exists")
        })
    })

    it("Search employee", () => {
        pimNav.menu.eq(1).click()
        cy.get('[placeholder="Type for hints..."]').eq(0).click().type(data.user.first.name).type(' ').type(data.user.first.lastname)
        cy.get('.oxd-input').eq(1).type(id)
        cy.get('[type="submit"]').click()
        cy.get('.oxd-table-row--clickable').should('exist');

       empPage.cell.eq(2).invoke('text').then((text) => {
            expect(text.trim()).to.equal(data.user.first.name)
        })
        empPage.cell.eq(3).invoke('text').then((text) => {
            expect(text.trim()).to.equal(data.user.first.lastname)
        })
        empPage.cell.eq(1).invoke('text').then((text) => {
            expect(text.trim()).to.equal(id)
        })
        cy.get('.oxd-table-row--clickable').click()
        cy.url().should('include', 'web/index.php/pim/viewPersonalDetails/empNumber/')
    })

    it("Employee data change", () => {
        pimNav.menu.eq(1).click()
        cy.get('[placeholder="Type for hints..."]').eq(0).click().type(data.user.first.name).type(' ').type(data.user.first.lastname)
        cy.get('.oxd-input').eq(1).type(id)
        cy.get('[type="submit"]').click()
        cy.get('.oxd-table-row--clickable').first().click()
        empPage.name.click().clear().type(data.user.second.name)
        empPage.middleName.click().clear().type(data.user.second.middleName)
        empPage.lastName.click().clear().type(data.user.second.lastname)
        empPage.otherId.click().clear().type(data.user.second.otherId)
        empPage.nationality.click()
        cy.contains(data.user.second.nationality).click()
        empPage.maritalStatus.click()
        cy.get('.oxd-select-dropdown div').eq(randomMaritalStatus).click()
        empPage.gender.eq(randomGender).click({ force: true })
        cy.get('[type="submit"]').first().click()
        cy.url().should('include','/web/index.php/pim/viewPersonalDetails/empNumber/')
        cy.get('#oxd-toaster_1').should('be.visible').and('contain', 'Successfully Updated')
        cy.get('#oxd-toaster_1', { timeout: 5000 }).should('not.be.visible')
        empPage.name.invoke('val').should('equal',data.user.second.name)
        empPage.middleName.invoke('val').should('equal',data.user.second.middleName)
        empPage.lastName.invoke('val').should('equal',data.user.second.lastname)
        empPage.otherId.invoke('val').should('equal', data.user.second.otherId)
        empPage.nationality.should('have.text',data.user.second.nationality)

    });

    it("Delete employee", () => {
        cy.get('.oxd-input').eq(1).type(id)
        cy.get('[type="submit"]').click().wait(500) // wait added because result table takes time to load after search
        empPage.cell.eq(1).invoke('text').then((text) => {
            expect(text.trim()).to.equal(id)
        })
        cy.get(".bi-trash").click()
        cy.contains("Yes, Delete").should('be.visible').click()
        cy.contains('#oxd-toaster_1', 'Successfully Deleted', { timeout: 10000 }).should('be.visible')
        cy.get('#oxd-toaster_1').should('be.visible').and('contain', 'No Records')
    })

})