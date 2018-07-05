import faker from 'faker';
import puppeteer from 'puppeteer';

const APP = 'https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc';

// let browser;
// let page;
const width = 1920;
const height = 1080;

beforeAll(async () => {
	// browser = await puppeteer.launch({
	// 	headless: false,
	// 	slowMo: 60,
	// 	args: [ `--window-size=${width},${height}` ]
	// });
	// page = await browser.newPage();
	// page = await global.__BROWSER__.newPage();
	// await page.setViewport({ width, height });
	// await page.goto(APP, { waitUntil: 'networkidle2' });
});

// afterAll(async () => {
// 	await page.close();
// });

function homePageModule() {
	this.programSearch = function() {
		describe('Searching for a Program...', () => {
			test(
				'Member can Search for a Program using a Keyword',
				async () => {
					await page.waitForSelector('.programsHome__headline');
					await page.click('input[name=keywords]');
					await page.type('input[name=keywords]', 'automation');
					await page.click('button[type=submit]');
					await page.waitForSelector('.programResults__headline');
				},
				60000
			);
		});
	};
}

module.exports = homePageModule;
