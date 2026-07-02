const { expect } = require("@playwright/test");

export class Toast {
  constructor(page) {
    this.page = page;
  }

  async haveText(message) {
    const toast = this.page.locator(".toast");
    await expect(toast).toHaveText(message);
    await expect(toast).toBeHidden({ timeout: 5000 });
  }

  async alertHaveText(text) {
    const alert = this.page.locator("span[class$=alert]");
    await expect(alert).toHaveText(text);
  }
}
