import {expect,test} from "@playwright/test";

test("scores, ranks, and opens evidence",async({page})=>{
  await page.goto("/");
  await expect(page.getByRole("heading",{name:/Don’t trust the AI claim/i})).toBeVisible();
  await page.getByLabel("Northstar Ledger Book accuracy").fill("70");
  await page.getByRole("button",{name:/Publish demo scorecard/i}).click();
  const first=page.locator(".card").first();
  await expect(first).toContainText("Human & Co.");
  await first.click();
  await expect(page.getByRole("dialog")).toContainText(/Fictional evidence breakdown/i);
  await page.getByRole("button",{name:"Close details"}).click();
});

test("validates a new firm and supports removal",async({page})=>{
  await page.goto("/");
  await page.getByRole("button",{name:"+ Add firm"}).click();
  await page.getByRole("button",{name:/Publish demo scorecard/i}).click();
  await expect(page.locator(".error")).toContainText("Firm name is required");
  await page.getByRole("button",{name:"Remove firm"}).last().click();
  await expect(page.locator(".error")).toBeHidden();
});

test("mobile has no horizontal overflow and scores",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="mobile");
  await page.goto("/");
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.getByRole("button",{name:/Publish demo scorecard/i}).click();
  await expect(page.getByText("Northstar Ledger")).toBeVisible();
});
