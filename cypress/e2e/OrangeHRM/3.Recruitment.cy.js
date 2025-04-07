/// <reference types="cypress"/>
import { navSide, recPage } from './PageObjectModel';
import data from '../../fixtures/data.json';
const randomJobVacancy = Cypress._.sample(data.candidat.vacancy)
const randomPhone = Math.floor(100000000 + Math.random() * 900000000).toString()

describe("Recruitment functionality",()=>{
    beforeEach(()=> {
        cy.login(data.login.username.correct , data.login.password.correct)
        navSide.menu.eq(4).click()
        cy.url().should('include','web/index.php/recruitment/viewCandidates')
    })

    it("Add new candidate - without all data",() => {
        recPage.button.eq(2).click()
        cy.url().should('include', 'web/index.php/recruitment/addCandidate')
        recPage.submit.click()
        recPage.firstName.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.lastName.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        recPage.errorMessage.eq(1).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
    })

    it("Add new candidate - missing required fields step by step", () => {
        recPage.button.eq(2).click()
        cy.url().should('include', 'web/index.php/recruitment/addCandidate')
        cy.log("First name filled")
        recPage.firstName.click().clear().type(data.candidat.name)
        recPage.submit.click()
        recPage.lastName.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        recPage.errorMessage.eq(1).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        cy.log("Email missing")
        recPage.lastName.click().clear().type(data.candidat.lastname)
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        cy.log("Only email filled")
        recPage.firstName.click().clear()
        recPage.lastName.click().clear()
        recPage.email.click().type(data.candidat.email.correct)
        recPage.submit.click()
        recPage.firstName.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.lastName.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        recPage.errorMessage.eq(1).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        cy.log("Missing last name")
        recPage.firstName.click().type(data.candidat.name)
        recPage.submit.click()
        recPage.lastName.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        cy.log("Only lastname filled")
        recPage.firstName.click().clear()
        recPage.email.click().clear()
        recPage.lastName.click().type(data.candidat.lastname)
        recPage.submit.click()
        recPage.firstName.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        recPage.errorMessage.eq(1).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
        cy.log("Missing first name")
        recPage.email.click().type(data.candidat.email.correct)
        recPage.submit.click()
        recPage.firstName.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(0).invoke('text').then((text) => {
            expect(text).to.equal("Required")
        })
    })

    it("Add new candidate - wrong email (multiple invalid formats)", () => {
        recPage.button.eq(2).click()
        cy.url().should('include', 'web/index.php/recruitment/addCandidate')
        //1. Email without '@'
        recPage.email.click().type(data.candidat.email.missingAt)
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Expected format: admin@example.com")
        })
        //2. Email without domain
        recPage.email.click().clear().type(data.candidat.email.missingDomain)
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Expected format: admin@example.com")
        })
        //3. Email without TLD (e.g. '.com')
        recPage.email.click().clear().type(data.candidat.email.missingTLD)
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Expected format: admin@example.com")
        })
        //4. Dot without TLD
        recPage.email.click().clear().type(data.candidat.email.dotWithoutTLD)
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Expected format: admin@example.com")
        })
        //5. Missing username
        recPage.email.click().clear().type(data.candidat.email.missingUsername)
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Expected format: admin@example.com")
        })
        //6. Missing domain name
        recPage.email.click().clear().type(data.candidat.email.missingDomainname)
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Expected format: admin@example.com")
        })
        //7. Correct email with extra space
        recPage.email.click().clear().type(data.candidat.email.correct).type(" ")
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Expected format: admin@example.com")
        })
        //8. Doubled correct email
        recPage.email.click().clear().type(data.candidat.email.correct).type(data.candidat.email.correct)
        recPage.submit.click()
        recPage.email.should('have.css','border-color','rgb(235, 9, 16)')
        recPage.errorMessage.eq(2).invoke('text').then((text) => {
            expect(text).to.equal("Expected format: admin@example.com")
        })
    })

    it("Add new candidate - correct", () => {
        recPage.button.eq(2).click()
        cy.url().should('include', 'web/index.php/recruitment/addCandidate')
        recPage.firstName.click().clear().type(data.candidat.name)
        recPage.lastName.click().clear().type(data.candidat.lastname)
        recPage.email.click().clear().type(data.candidat.email.correct)
        recPage.submit.click()
        cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Saved')
        cy.url().should('include','web/index.php/recruitment/addCandidate/')
        recPage.firstName.invoke('val').should('equal', data.candidat.name)
        recPage.lastName.invoke('val').should('equal',data.candidat.lastname)
        recPage.email.invoke('val').should('equal',data.candidat.email.correct)
        cy.get('[placeholder="yyyy-dd-mm"]').invoke('val').then((val) => {
            cy.today().then((today) => {
                expect(val).to.equal(today)
              });
        })

    })

    it("Edit candidate data", () => {
        recPage.candidateName.click().type(data.candidat.name).wait(200)
        cy.contains('Searching...').should('not.exist')
        cy.get(".oxd-autocomplete-option").first().click()
        recPage.submit.click()
        const candidate = data.candidat.name + "  " + data.candidat.lastname
        recPage.cell.eq(2).invoke('text').then((text) => {
            expect(text).to.equal(candidate)
        })
        recPage.cell.eq(4).invoke('text').then((data) => {
            cy.today().then((today) => {
                expect(data).to.equal(today)
            });
        })
        recPage.lookCandidat.click()
        recPage.editCheckbox.should('have.css','background-color', 'rgb(232, 234, 239)')
        recPage.editCheckbox.click().wait(300)
        recPage.editCheckbox.should('not.have.css','background-color','rgb(232, 234, 239)')
        recPage.middleName.click().clear().type(data.candidat.middleName)
        cy.get('.oxd-select-text').click()
        cy.get('[role="option"]').then(options => {
            const exists = [...options].some(option => option.innerText === randomJobVacancy);
            if (exists) {
              cy.contains('[role="option"]', randomJobVacancy).click()
            } else {
              cy.log(`Vacancy "${randomJobVacancy}" not found – skipping`)
            }
          })
        recPage.contactNumber.click().clear().type(randomPhone)
        cy.get('.oxd-file-input').attachFile('pdfexample.pdf', { force: true }).trigger('change', { force: true });
        cy.get('.oxd-file-input').should('have.prop', 'files').then(files => {
            expect(files[0].name).to.eq('pdfexample.pdf')
        });
        const combined = data.candidat.keywords.join(' ')
        recPage.keyWords.click().clear().type(combined)
        cy.get('.oxd-button').click().wait(200)
        cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Updated')
        recPage.editCheckbox.should('have.css','background-color', 'rgb(232, 234, 239)')
        cy.reload()
        recPage.firstName.should('have.value',data.candidat.name)
        recPage.middleName.should('have.value', data.candidat.middleName)
        recPage.lastName.should('have.value', data.candidat.lastname)
        recPage.email.should('have.value',data.candidat.email.correct)
        recPage.contactNumber.should('have.value', randomPhone)
        ///cy.get('.uploaded-file-name') .should('contain', 'pdfexample.pdf'); TODO: Add assertion for uploaded file name when element is available
        recPage.keyWords.should('have.value', combined)
    })

})