[🇬🇧 English](#-english-version) | [🇵🇱 Polski](#-wersja-polska)
![Cypress](https://img.shields.io/badge/Cypress-12.0%2B-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18.x-blue)
![License](https://img.shields.io/badge/License-MIT-purple)
![Status](https://img.shields.io/badge/Build-coming_soon-lightgrey)

---
## 🇬🇧 English version
# 🌱 Cypress Tests – OrangeHRM Automation Suite

An automated end-to-end test suite for the [OrangeHRM](https://www.orangehrm.com/) system, written in **Cypress**.  
This project covers key functionalities of the system: login, employee management, and recruitment module.

---

## 🚀 Test Coverage

- 🔐 Login – correct and incorrect credentials, empty fields, redirections
- 🧑‍💼 PIM – adding, editing and deleting employees
- 📝 Recruitment – adding a candidate, form validations, editing data
- 🧱 Architecture based on **Page Object Model**
- 🎲 Use of random data and `fixture`s

---

## 📁 Project Structure

```bash
Cypress-OrangeHRM/
├── cypress/ 
│   ├── e2e/
│   │   ├── 1.Login.cy.js
│   │   ├── 2.PIM.cy.js
│   │   └── 3.Recruitment.cy.js
│   ├── fixtures/
│   │   └── data.json
│   ├── support/
│   │   └── PageObjectModel.js
├── cypress.config.js
├── package.json
└── .gitignore
```

## 🔍 Example test (login)
```javascript
it("Correct login", () => { 
  cy.login(logindata.login.username.correct, logindata.login.password.correct) 
  cy.url().should('include', 'web/index.php/dashboard/index') 
})
```

## 🛠How to run this project?
### 🔧 Installation:
```bash
git clone https://github.com/Paulina-Wroblewska/Cypress-OrangeHRM.git
cd Cypress-OrangeHRM
npm install
```
👉GUI: 
```bash 
npx cypress open
```

👉Headless (np. do CI/CD):
```bash 
npx cypress run
```

## 🧰 Tech Stack
- Cypress 12+
- JavaScript (ES6+)
- Mocha & Chai – test structure and assertions
- Page Object Model – clean and scalable architecture
- Lodash / randomizacja – random data generation
- attach-file – handling file uploads

## ⬆️ Ideas for development
Coming soon...

## 👩‍💻 Author 🩷
Project created by Paulina Wróblewska. 💖  
🔗 [GitHub](https://github.com/Paulina-Wroblewska)

🔗 [LinkedIn](https://www.linkedin.com/in/paulina-wr%C3%B3blewska-2381a217b/)


📄 Licencja
Project licensed under MIT – use, learn, grow ✨



## 🇵🇱 Wersja polska

# 🧪 Cypress Tests – OrangeHRM Automation Suite

Automatyczny zestaw testów E2E (end-to-end) dla systemu [OrangeHRM](https://www.orangehrm.com/), napisany w **Cypressie**.  
Testy pokrywają kluczowe funkcjonalności systemu: logowanie, zarządzanie pracownikami i moduł rekrutacji.

---

## 🚀 Zakres testów
- 🔐 Logowanie – poprawne i błędne dane, puste pola, przekierowania
- 👤 PIM – dodawanie, edycja i usuwanie pracowników
- 📄 Rekrutacja – dodawanie kandydata, walidacje formularzy, edycja danych
- 🧱 Struktura w oparciu o **Page Object Model**
- 🎲 Wykorzystanie losowych danych i `fixture`ów

## 🗂 Struktura projektu
```bash 
Cypress-OrangeHRM/
├── cypress/ 
│ ├── e2e/
│ │ ├── 1.Login.cy.js
│ │ ├── 2.PIM.cy.js
│ │ └── 3.Recruitment.cy.js
│ ├── fixtures/
│ │ └── data.json
│ ├── support/
│ │ └── PageObjectModel.js
├── cypress.config.js
├── package.json
└── .gitignore
```
## 🔍 Przykład testu (login)

```javascript
it("Correct login", () => { 
  cy.login(logindata.login.username.correct, logindata.login.password.correct) 
  cy.url().should('include', 'web/index.php/dashboard/index') 
})
```

## 🛠 Jak uruchomić projekt?
### 🔧 Instalacja:
```bash
git clone https://github.com/Paulina-Wroblewska/Cypress-OrangeHRM.git
cd Cypress-OrangeHRM
npm install
```
👉GUI: 
```bash
npx cypress open
```

👉Headless (np. do CI/CD):
``` bash 
npx cypress run
```

## 🧰 Tech Stack
- Cypress 12+
- JavaScript (ES6+)
- Mocha & Chai – struktura testów i asercje
- Page Object Model – czysta architektura
- Lodash / randomizacja – losowe dane
- attach-file – dodawanie plików PDF

## ⬆️Pomysły na rozwój
Coming soon...

## 👩‍💻 Autor 🩷
Projekt stworzony przez **Paulinę Wróblewską** 💖  
🔗 [GitHub](https://github.com/Paulina-Wroblewska)

🔗 [LinkedIn](https://www.linkedin.com/in/paulina-wr%C3%B3blewska-2381a217b/)


📄 Licencja
Projekt na licencji MIT – korzystaj, ucz się, rozwijaj ✨
