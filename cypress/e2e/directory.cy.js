import loginPage from '../support/page_objects/loginPage';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Request aborted')) {
    return false;
  }
});

describe('Halaman Directory', () => {
  it('Tampilan login', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('admin123');

    cy.intercept('GET', '**/employees/action-summary').as('actionsummary');
    loginPage.buttonLogin().click();
    cy.wait('@actionsummary').its('response.statusCode').should('eq', 200);

    loginPage.menuDashboard().should('have.text', 'Dashboard');

    cy.intercept('GET', '**/viewDirectory').as('viewDirectory');
    loginPage.menusidebar().contains('Directory').click();
    cy.wait('@viewDirectory');

    loginPage.textdirectory().should('have.text', 'Directory');

    loginPage.inputemployee().type('sara');
    loginPage.selectname().contains('Sara Tencrady').click();
    loginPage.jobTitle().eq(0).click();
    loginPage.pilihjobtitle().contains('Payroll Administrator').click();
    loginPage.location().eq(1).click();
    loginPage.pilihlokasi().contains('Texas R&D').click();
    loginPage.buttonsearch().click();

    loginPage.buttonresetdirectory().click();
    loginPage.viewafterreset().should('contain', 'Records Found');
  });
});
