
describe('Spoti App', () => {
  it('should show songs list', () => {
    cy.visit('/');
    cy.get('#input_container').find('#input').type('Bad Bunny')
    cy.wait(2000).get('#songs_container').find('.track_container').should('have.length', 40)
  })

  it('shold fetch new 40 songs in scroll to bottom', () => {
    cy.visit('/');
    cy.get('#input_container').find('#input').type('Bad Bunny')    
    cy.wait(3000).scrollTo('bottom').get('#songs_container').find('.track_container').should('have.length', 80)
  })

});
