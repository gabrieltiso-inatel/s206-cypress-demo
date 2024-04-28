/// <reference = cypress>

describe("Testes de login, registro e deleção de usuários", () => {
  it("Deve registrar um usuário com sucesso", () => {
    createUser();
    cy.get('.ng-binding').should("have.text", "Registration successful");
  });

  it("Deve falhar ao registrar um usuário", () => {
    cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login");
    cy.get('.btn-link').click();
    cy.get('#firstName').type("Gabriel");
    cy.get('#Text1').type("Gabriel");
    cy.get('#username').type("Gabriel");
    cy.get('.btn-primary').should("be.disabled");
  });

  it("Deve testar o login de um usuário com sucesso", () => {
    let [username, password] = createUser();
    cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login");
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
    cy.get('h1.ng-binding').should("contain.text", username);
  })

  it("Deve testar a deleção de um usuário com sucesso", () => {
    let [username, password] = createUser();
    cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login");
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
    cy.get('.ng-binding > a').click();
    cy.get('.ng-binding').should("have.text", "Hi !")
  })
})

function createUser() {
  let now = new Date();
  let hours = now.getHours().toString();
  let minutes = now.getMinutes().toString();
  let seconds = now.getSeconds().toString();

  let userId = hours + minutes + seconds + "ID";
  let userPassword = hours + minutes + seconds + "Password";

  cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login");
  cy.get('.btn-link').click();
  cy.get('#firstName').type(userId);
  cy.get('#Text1').type(userId);
  cy.get('#username').type(userId);
  cy.get('#password').type(userPassword);
  cy.get('.btn-primary').click();

  return [userId, userPassword];
}
