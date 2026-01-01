describe('App E2E', () => {
    beforeEach(() => {
        cy.visit('/');
        // Wait for data loading (simulated delay in UserStore)
        cy.wait(2000);
    });

    it('should load home page and display welcome message', () => {
        cy.title().should('include', 'Webbundle Starter Kit');
        cy.get('h1').should('contain.text', 'Welcome!');
    });

    it('should switch languages', () => {
        // Initial state EN
        cy.get('.MuiSelect-select').should('contain.text', 'EN');
        cy.contains('Welcome!').should('be.visible');

        // Switch to DE
        cy.get('.MuiSelect-select').click();
        cy.get('li[data-value="de"]').click();

        // Verify DE
        cy.get('.MuiSelect-select').should('contain.text', 'DE');
        cy.contains('Willkommen!').should('be.visible');

        // Switch back to EN
        cy.get('.MuiSelect-select').click();
        cy.get('li[data-value="en"]').click();

        // Verify EN
        cy.get('.MuiSelect-select').should('contain.text', 'EN');
        cy.contains('Welcome!').should('be.visible');
    });

    it('should fallback to EN for unsupported languages', () => {
        // Mock navigator.language
        cy.visit('/', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', {
                    value: 'fr-FR'
                });
            }
        });

        cy.get('h1').should('contain.text', 'Welcome!');
        cy.get('.MuiSelect-select').should('contain.text', 'EN');
    });

    it('should display user avatar and menu', () => {
        // Verify initials are present (means user loaded)
        cy.get('.MuiAvatar-root').should('contain.text', 'AT');

        // Open menu with force ensuring click registers
        cy.get('.MuiAvatar-root').click({ force: true });

        // Wait for transition
        cy.wait(1000);

        // Check menu content (MUI Popover)
        cy.get('[role="menu"]').should('exist'); // Menu should exist in DOM
        cy.contains('Aria Test').should('be.visible');
        cy.contains('linda.bolt@osapiens.com').should('be.visible');
        cy.contains('Logout').should('be.visible');

        // Close menu
        cy.get('body').click(0, 0, { force: true });
    });

    it('should display app header elements', () => {
        cy.contains('SUPPLIER OS APPLICATION').should('be.visible');
        cy.contains('BUG BOUNTY CHALLENGE').should('be.visible');
        // Check countdown
        cy.get('.MuiToolbar-root').contains(/\d{2}:\d{2}/).should('be.visible');
    });
});
