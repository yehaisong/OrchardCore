import { creds } from './objects';

Cypress.Commands.add('newTenant', function(tenantInfo) {
    cy.saasLogin();
    cy.createTenant(tenantInfo);
    cy.gotoTenantSetup(tenantInfo);
    cy.setupSite(tenantInfo);
});

Cypress.Commands.add('saasLogin', function() {
    cy.visit(`/login`);
    cy.get('#UserName').type(creds.username);
    cy.get('#Password').type(creds.password);
    cy.get('form').submit();
});

Cypress.Commands.add('tenantLogin', function({prefix}) {
    cy.visit(`${prefix}/login`);
    cy.get('#UserName').type(creds.username);
    cy.get('#Password').type(creds.password);
    cy.get('form').submit();
});

Cypress.Commands.add('gotoTenantSetup', ({ name }) => {
    cy.visit('/Admin/Tenants');
    cy.get(`#btn-setup-${name}`).click();
});
Cypress.Commands.add('setupSite', ({ name, setupRecipe, username, email, password, passwordConfirmation }) => {
    cy.get('#SiteName').type(name);
    cy.get('body').then($body => {
        const elem = $body.find('#RecipeName');
        if (elem) {
            elem.val(setupRecipe);
        }
        const db = $body.find('#DatabaseProvider');
        if (db) {
            db.val('Sqlite');
        }
    });
    cy.get('#UserName').type(username);
    cy.get('#Email').type(email);
    cy.get('#Password').type(password);
    cy.get('#PasswordConfirmation').type(passwordConfirmation);
    cy.get('#SubmitButton').click();
});
Cypress.Commands.add('createTenant', ({ name, prefix }) => {
    // We create tenants on the SaaS tenant
    cy.visit('/Admin/Tenants');
    cy.get('#btn-add-tenant').click();
    cy.get('#Name').type(name);
    cy.get('#RequestUrlPrefix').type(prefix);
    cy.get('#btn-create').click();
});

Cypress.Commands.add('runRecipe', ({ prefix }, recipeName) => {
    cy.visit(`${prefix}/Admin/Recipes`);
    cy.get(`[data-run-button="${recipeName}"]`).click();
    cy.get('#modalOkButton').click();
});
Cypress.Commands.add('visitAdmin', ({ prefix }) => {
    cy.visit(`${prefix}/Admin`);
});
Cypress.Commands.add('visitTenantPage', ({ prefix }, url) => {
    cy.visit(`${prefix}/${url}`);
});
