class LoginPage{
    get username() {
        return cy.get('[name="username"]')
    }

    get password() {
        return cy.get('[name="password"]')
    }

    get errorMessage() {
        return cy.get('.oxd-input-field-error-message')
    }

    get submit() { 
        return cy.get('[type="submit"]')
    }
}

class NavSide {
    get menu() {
        return cy.get(".oxd-main-menu-item")
    }
}

class PimNav {
    get menu () {
        return cy.get(".oxd-topbar-body-nav-tab")
    }

}

class EmpPage {
    get name () {
        return cy.get('[name="firstName"]')
    }

    get lastName () {
        return cy.get('[name="lastName"]')
    }

    get middleName () {
        return cy.get(`[name="middleName"]`)
    }

    get id() {
        return cy.get('.oxd-input').eq(4)
    }

    get otherId() {
        return cy.get('.oxd-input').eq(5)
    }

    get nationality() {
        return cy.get('.oxd-select-text-input').eq(0)
    }

    get maritalStatus() {
        return cy.get('.oxd-select-text-input').eq(1)
    }

    get gender() {
        return cy.get('[type="radio"]')
    }

    get errorMessage(){
        return cy.get('.oxd-input-field-error-message')
    }

    get cell() {
        return cy.get('[role="cell"]')
    }

}

class RecPage {
    get button () {
        return cy.get(".oxd-button")
    }
    get firstName () {
        return cy.get(".oxd-input").eq(1)
    }
    get middleName() {
        return cy.get('[name="middleName"]')
    }
    get lastName() {
        return cy.get(".oxd-input").eq(3)
    }

    get email () {
        return cy.get(".oxd-input").eq(4)
    }
    get submit () {
        return cy.get('[type="submit"]')
    }
    get errorMessage() {
        return cy.get('.oxd-input-field-error-message')
    }
    get candidateName () { 
        return cy.get('[placeholder="Type for hints..."]')
    }
    get cell() {
        return cy.get('[role="cell"]')
    }
    get editCheckbox() {
        return cy.get('.oxd-switch-input')
    }
    get contactNumber() {
        return cy.get('.oxd-input').eq(5)
    }
    get keyWords() {
        return cy.get('.oxd-input').eq(6)
    }
    get lookCandidat () { 
        return cy.get('.bi-eye-fill').eq(0)
    }
}


export const navSide = new NavSide();
export const pimNav = new PimNav();
export const empPage = new EmpPage(); 
export const recPage = new RecPage();
export const loginPage = new LoginPage()
