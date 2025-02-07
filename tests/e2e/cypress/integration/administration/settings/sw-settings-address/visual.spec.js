describe('Address settings: Visual testing', () => {
    beforeEach(() => {
        // Clean previous state and prepare Administration
        cy.loginViaApi()
            .then(() => {
                cy.setLocaleToEnGb();
            })
            .then(() => {
                cy.openInitialPage(Cypress.env('admin'));
            });
    });

    it('@visual: check appearance of address settings module', () => {
        cy.intercept({
            url: `${Cypress.env('apiPath')}/_action/system-config/schema?domain=core.address`,
            method: 'GET'
        }).as('getData');

        cy.get('.sw-dashboard-index__welcome-text').should('be.visible');
        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('a[href="#/sw/settings/address/index"]').click();
        cy.wait('@getData')
            .its('response.statusCode').should('equal', 200);
        cy.contains('.sw-card__title', 'Address');
        cy.get('.sw-loader').should('not.exist');
        cy.prepareAdminForScreenshot();
        cy.takeSnapshot('[Address settings] Details', '.sw-settings-address', null, {percyCSS: '.sw-notification-center__context-button--new-available:after { display: none; }'});
    });
});
