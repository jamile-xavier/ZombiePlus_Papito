// @ts-check
import { test, expect } from "@playwright/test";
const { faker } = require("@faker-js/faker");
const { LandingPage } = require("../pages/LandingPage");
const { Toast } = require("../pages/Components");

let landingPage;
let toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});

// test("deve cadastrar um lead na fila de espera", async ({ page }) => {
//visit
// await page.goto("http://localhost:3000/");

// await page.click('//button[text()="Aperte o play... se tiver coragem"]');

// await page
//   .getByRole('button', { name: 'Aperte o play... se tiver coragem' })
//   .click();

// Localizador com substring
//openLeadModal
// await page.getByRole("button", { name: /Aperte o play/ }).click();

// await page.locator('#name').fill("Fernando Papito");

//ELEMENTO[PROP=VALUE]
// await page.locator("input[name=name]").fill("Fernando Papito");

// await page.locator('input[placecholder="Seu nome completo"]').fill("Fernando Papito");

// await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
//   "Fila de espera",
// );
// submitLeadForm
// await page.getByPlaceholder("Informe seu nome").fill("Fernando Papito");
// await page.getByPlaceholder("Informe seu email").fill("papito@yahoo.com");

// await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

//npx playwright test --headed
// await page.getByText("seus dados conosco").click();
// const content = await page.content();
// console.log(content);
// npx playwright test --ui
// Consigo dessa forma obter as informações do modal flutuante
// No Get content em console terá o html da página facilitando assim a inclusão na automação da validação
//toastHaveText
// const message =
//   "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
// await expect(page.locator(".toast")).toHaveText(message);

// await expect(page.locator(".toast")).toBeHidden({ timeout: 5000 });

// Incluir timeout durante a construção do teste para ajudar na visualização. Após conclusão remover
// await page.waitForTimeout(5000);
// });

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await landingPage.visit();
  await landingPage.OpenLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await toast.haveText(message);
});

test("não deve cadastrar quando o email já existe", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await landingPage.visit();
  await landingPage.OpenLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  await landingPage.visit();
  await landingPage.OpenLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);
  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await toast.haveText(message);
});

test("não deve cadastrar com email incorreto", async ({ page }) => {
  await landingPage.visit();
  await landingPage.OpenLeadModal();
  await landingPage.submitLeadForm("Fernando Papito", "papito.com.br");

  await toast.alertHaveText("Email incorreto");
});

test("não deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.OpenLeadModal();
  await landingPage.submitLeadForm("", "papito@yahoo.com");

  await toast.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando o e-mail não é preenchido", async ({
  page,
}) => {
  await landingPage.visit();
  await landingPage.OpenLeadModal();
  await landingPage.submitLeadForm("Fernando Papito", "");

  await toast.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhum campo é preenchido", async ({
  page,
}) => {
  await landingPage.visit();
  await landingPage.OpenLeadModal();
  await landingPage.submitLeadForm("", "");

  await toast.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
