import loginPage from '../support/page_objects/loginPage';


describe('Login Feature',() => {
    //TC1
    it('Tampilan login',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
        loginPage.buttonLogin().click();
        cy.wait("@actionsummary").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(200);
        })
        loginPage.menuDashboard().should('have.text','Dashboard')
    })
    //TC2
    it('Pengguna dapat login menggunakan data valid',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
        loginPage.buttonLogin().click();
        cy.wait("@actionsummary").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        })
        loginPage.menuDashboard().should('have.text','Dashboard')
    })
    //TC3
    it('Pengguna dapat login dengan username dan password minimum yang sesuai',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
        loginPage.buttonLogin().click();
        cy.wait("@actionsummary").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(200);
        })
        loginPage.menuDashboard().should('have.text','Dashboard')
    })
    //TC4
    it('Pengguna dapat login dengan username dan password karakter alfanumerik',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
        loginPage.buttonLogin().click();
        cy.wait("@actionsummary").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        })
        loginPage.menuDashboard().should('have.text','Dashboard')
    })    
    //TC5
    it('Pengguna dapat login yang berisi karakter huruf abjad besar dan huruf abjad kecil.',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
        loginPage.buttonLogin().click();
        cy.wait("@actionsummary").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        })
        loginPage.menuDashboard().should('have.text','Dashboard')
    })
    //TC6
    it('Pengguna login setelah reset kata sandi untuk memastikan kata sandi baru berfungsi', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.forgotPassword().click();
        loginPage.textReset().should('contain','Reset Password');
        loginPage.inputUsername().type('Admin');
    
        cy.intercept("GET","**/messages").as("messages");
    
        loginPage.buttonReset().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        })
        loginPage.textSuccesReset().should('contain','Reset Password link sent successfully');
    })
    //Cancel reset password
    it('cancel reset password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
        loginPage.textLogin().should('have.text','Login');
        loginPage.forgotPassword().click();
        loginPage.textReset().should('contain','Reset Password');
        cy.intercept("GET","**/messages").as("messages");
    
        loginPage.buttoncancel().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        })
        loginPage.textLogin().should('have.text','Login');
    })
    //TC7
    it('User Login with Invalid Username',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Hallo');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/messages").as("messages");
        loginPage.buttonLogin().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        })
        loginPage.invalidLogin().should('have.text','Invalid credentials');
    })
    //TC8
    it('User Login with Invalid Password',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('hallo');
        cy.intercept("GET","**/messages").as("messages");
        loginPage.buttonLogin().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        })
        loginPage.invalidLogin().should('have.text','Invalid credentials');
    })
    //TC9
    // it('Username kosong',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     loginPage.textLogin().should('have.text','Login');
    //     loginPage.inputUsername().clear();
    //     loginPage.inputPassword().type('hallo');
    //     cy.intercept("GET","**/messages").as("messages");
    //     loginPage.buttonLogin().click();
    //     cy.wait("@messages").then((intercept) => {
    //         expect(intercept.response.statusCode).to.eq(304);
    //     })
    //     loginPage.invalidLogin().should('have.text','Invalid credentials');
    // })
    //TC10
    // it('Password Kosong',() => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //     loginPage.textLogin().should('have.text','Login');
    //     loginPage.inputUsername().type('Admin');
    //     loginPage.inputPassword().clear();
    //     cy.intercept("GET","**/messages").as("messages");
    //     loginPage.buttonLogin().click();
    //     cy.wait("@messages").then((intercept) => {
    //         expect(intercept.response.statusCode).to.eq(304);
    //     })
    //     loginPage.invalidLogin().should('have.text','Invalid credentials');
    // })
    //TC11
    it('Username dan password invalid',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Hallo');
        loginPage.inputPassword().type('hallo123');
        cy.intercept("GET","**/messages").as("messages");
        loginPage.buttonLogin().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        })
        loginPage.invalidLogin().should('have.text','Invalid credentials');
    })
    // it('User Login with invalid Username',() => {
    //     loginPage.textLogin().should('have.text','Login');
    //     loginPage.inputUsername().type('Admin123');
    // })
    // it('User Login with Invalid Password',() => {
    //     loginPage.textLogin().should('have.text','Login');
    //     loginPage.inputPassword().type('admin');
    // })
})