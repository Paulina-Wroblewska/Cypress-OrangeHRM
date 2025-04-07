ENG 









PL

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

🔍 Przykład testu (login)

<pre> ```javascript it("Correct login", () => { cy.login(logindata.login.username.correct, logindata.login.password.correct) cy.url().should('include', 'web/index.php/dashboard/index') }) ``` </pre>

## 🛠 Jak uruchomić projekt?
### 🔧 Instalacja:
```bash
git clone https://github.com/Paulina-Wroblewska/Cypress-OrangeHRM.git
cd Cypress-OrangeHRM
npm install
```
👉GUI: 
```npx cypress open```

👉Headless (np. do CI/CD):
```npx cypress run```

🧰 Tech Stack
Cypress 12+
JavaScript (ES6+)
Mocha & Chai – struktura testów i asercje
Page Object Model – czysta architektura
Lodash / randomizacja – losowe dane
attach-file – dodawanie plików PDF

⬆️Pomysły na rozwój

## 👩‍💻 Autor 🩷
Projekt stworzony przez **Paulinę Wróblewską** 💖  
🔗 [GitHub](https://github.com/Paulina-Wroblewska)
🔗 [LinkedIn](https://www.linkedin.com/in/paulina-wr%C3%B3blewska-2381a217b/)


📄 Licencja
Projekt na licencji MIT – korzystaj, ucz się, rozwijaj ✨
