/// <reference types="Cypress" />

import faker from 'faker';
import { blog } from '../../support/objects';



describe('Blog Tests', function () {
    let blogs

    before(() => {
        // load fixtures once before any tests
        // and they are kept in closure variables
        cy.fixture('blog-posts').then(x => {
            blogs = x
        })

    })

    it('Can add blog post and it displays in the frontend', function () {
        cy.login(blog);
        cy.visitAdmin(blog);

        // blog admin menu
        blogs.forEach(blog => {
            cy.get('#menu-Blog').click();
            // create blog post button
            cy.get('p > .btn.btn-primary').click();
            cy.get('#TitlePart_Title').type(blog.name);
            var text = faker.lorem.sentence();
            cy.get('.CodeMirror textarea')
                // we use `force: true` below because the textarea is hidden
                // and by default Cypress won't interact with hidden elements
                .type(blog.text, { force: true });

            // click publish button
            cy.get('.btn-success').click();

            cy.visitTenantPage(blog, `blog/${blogName}`);

            cy.get('h1').should('contain.text', blogName);
            cy.get(':nth-child(3) > .row > .col-lg-8 > p').should('contain.text', text);
        });


    });
});
