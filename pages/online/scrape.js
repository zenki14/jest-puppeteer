const puppeteer = require('puppeteer');

let scrape = async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc');
	await page.waitForSelector('.onlineNav__link--signup');
	await page.click('onlineNav__link--signup');
	await page.waitFor(3000);
	const result = await page.evaluate(() => {
		let cartId = document.URL;

		return {
			cartId
		};

		// Scrape
	});
	browser.close();
	return result;
};
