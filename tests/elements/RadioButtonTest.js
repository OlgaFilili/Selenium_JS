const { getHomePage } = require("../BaseTest");
const { expect } = require('chai');

describe('Impressive RadioButton is Selected', function() {
  it('Impressive is not selected', async function() {
    const homePage= await getHomePage();
    const elementsPage= await homePage.gotoElements();
    const radioButtonPage= await elementsPage.gotoRadioButtonMenuItem();

    await radioButtonPage.clickRB_Impressive();
    const ImpressiveSelected= await radioButtonPage.isRB_ImpressiveSelected();
    expect(ImpressiveSelected).to.be.true;
  });
});