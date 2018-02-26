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
        
        switch(getRandomInt(0, 3))
        {
            case 0: randomClickLink(); break;
            case 1: randomTypeText(); break;
            case 2: randomSelectCombo(); break;
        }
        
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
function randomTypeText() {

    cy.get('input').then($textFields => {
        
        var randomTextField = $textFields.get(getRandomInt(0, $textFields.length));

        if(!Cypress.Dom.isHidden(randomTextField)) {

            cy.wrap(randomTextField).click({force: true}).type('Hi, the monkey is here!');
        }
    });   
}

function randomSelectCombo() {

    cy.get('select').then($combos => {
        
        var randomCombo = $combos.get(getRandomInt(0, $combos.length));

        if(!Cypress.Dom.isHidden(randomCombo)) {

            optionCombo = randomCombo.options[getRandomInt(0, randomCombo.options.length)].value;
            cy.wrap(randomCombo).select(optionCombo, {force: true});
        }
    });   
}
