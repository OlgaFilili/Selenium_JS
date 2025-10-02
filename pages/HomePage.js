class HomePage extends BasePage 
{
  constructor() {
    super();
    this.url = 'https://demoqa.com/';
  }

  async open() {
    await this._open(this.url);
  }
}