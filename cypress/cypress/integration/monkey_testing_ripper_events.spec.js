describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function randomEvent(monkeyLeft){
    if(monkeyLeft > 0){
        randomClickLink();
        randomEvent(monkeyLeft -1);
    }
}

function randomClickLink() {

    cy.get('a').then($links => {
        
        var randomLink = $links.get(getRandomInt(0, $links.length));

        if(!Cypress.Dom.isHidden(randomLink)) {

            cy.wrap(randomLink).click({force: true});

        }
    });   
}
