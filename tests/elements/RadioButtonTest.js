const { getHomePage } = require("../BaseTest");
const { capitalizeFirstLetter } = require("../../utils/StringUtils")
const { expect } = require('chai');

describe('Radiobuttons functionality check', function() {
  const options = ['yes', 'impressive', 'no'];
  let radioButtonPage;
  beforeEach (async function(){
    const homePage= await getHomePage();
    const elementsPage= await homePage.gotoElements();
    radioButtonPage= await elementsPage.gotoRadioButtonMenuItem();
  });
  options.forEach(option => {
    it(`should select "${capitalizeFirstLetter(option)}" and show correct confirmation message`, async function() {
      const enabled = await radioButtonPage.isRBOptionEnabled(option);
      expect(enabled, `"${capitalizeFirstLetter(option)}"-option should not be disabled`).to.be.true;

      if (!enabled) {
        console.warn(`Skipping "${option}" because it's disabled`);
        return; // skip the rest
      }
      await radioButtonPage.selectRBOption(option);
      const optionSelected= await radioButtonPage.isRBOptionSelected(option);
      const actualConfirmationText= await radioButtonPage.getRBOptionConfirmationText();
      const actualConfirmation= await radioButtonPage.getRBOptionConfirmation();
      const actualOptionColorInMessage= await radioButtonPage.verifyColor();
      //console.log(`Color for ${option}:`, actualOptionColorInMessage);
      expect(optionSelected, `${option}-option was not selected`).to.be.true;
      expect(actualConfirmationText, 'The Message Does Not Start With "You have selected "').to.be.equal("You have selected ");
      expect(actualConfirmation, 'Actual And Expected Confirmation Text Do Not Match').to.be.equal(capitalizeFirstLetter(option));
      expect(actualOptionColorInMessage, 'Actual And Expected Color Of Selected Option In Message Do Not Match').to.be.equal("rgba(40, 167, 69, 1)");
    });
  });
});