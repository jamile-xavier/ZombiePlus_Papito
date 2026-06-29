// @ts-check
import { test, expect } from "@playwright/test";

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // await page.click('//button[text()="Aperte o play... se tiver coragem"]');

  // await page
  //   .getByRole('button', { name: 'Aperte o play... se tiver coragem' })
  //   .click();

  // Localizador com substring
  await page.getByRole("button", { name: /Aperte o play/ }).click();

  // await page.locator('#name').fill("Fernando Papito");

  //ELEMENTO[PROP=VALUE]
  // await page.locator("input[name=name]").fill("Fernando Papito");

  // await page.locator('input[placecholder="Seu nome completo"]').fill("Fernando Papito");

  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera",
  );

  await page.getByPlaceholder("Seu nome completo").fill("Fernando Papito");
  await page.getByPlaceholder("Seu email principal").fill("papito@yahoo.com");

  await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

  // await page.getByText("seus dados conosco").click();
  // const content = await page.content();
  // console.log(content);
  // npx playwright test --ui
  // Consigo dessa forma obter as informações do modal flutuante
  // No Get content em console terá o html da página facilitando assim a inclusão na automação da validação

  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await expect(page.locator(".toast")).toHaveText(message);

  await expect(page.locator(".toast")).toBeHidden({ timeout: 5000 });

  // Incluir timeout durqnte a construçãod o teste para ajudar na visualização. Após conclusão remover
  // await page.waitForTimeout(5000);
});
