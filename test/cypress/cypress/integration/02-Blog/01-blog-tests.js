/// <reference types="Cypress" />

import { generateTenantInfo } from '../../support/objects';

describe('Blog Tests', function () {
    let blogs;
    let tenant;

    before(() => {
        // load fixtures once before any tests
        // and they are kept in closure variables
        cy.fixture('blog-posts').then(x => {
            blogs = x
        })
        // generate a tenant for all tests below
        tenant = generateTenantInfo("Blog")
        cy.newTenant(tenant);

    })

    it('Can add blog post and it displays in the frontend', function () {
        cy.tenantLogin(tenant);
        cy.visitAdmin(tenant);
       
        blogs.forEach(blog => {
            cy.get('#adminMenu > #menu-Blog').click()
            // create blog post button
            cy.get('#btn-create-BlogPost').click();
            cy.get('#TitlePart_Title').type(blog.name);
            cy.get('.CodeMirror textarea')
                // we use `force: true` below because the textarea is hidden
                // and by default Cypress won't interact with hidden elements
                .type(blog.text, { force: true });

            
            cy.get('.multiselect > .multiselect__select').click()
        
            cy.get('.multiselect__content-wrapper > .multiselect__content > .multiselect__element > .multiselect__option--highlight > span').click()
        
            cy.get('.multiselect > .multiselect__content-wrapper > .multiselect__content > .multiselect__element > .multiselect__option--highlight').click()

            // click publish button
            cy.get('@btn-submit-publish').click();

            cy.visitTenantPage(blog, `blog/${blog.name}`);

            cy.get('h1').should('contain.text', blog.name);
            cy.get(':nth-child(3) > .row > .col-lg-8 > p').should('contain.text', blog.text);
        });


    });
});
