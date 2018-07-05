import faker from 'faker';
import puppeteer from 'puppeteer';
import submitNewOnlineMemberModule from './newMemberInfoPage.js';

const nmip = new submitNewOnlineMemberModule();

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

function newUnitSubmitModule() {
	this.newUnitSubmit = function() {
		nmip.newMemberInfoSubmit();
		describe('New Unit Review Page ...', () => {
			test(
				'User can submit their information',
				async () => {
					await page.click('#next-button');
					await page.waitForSelector('#selected-billing-method-id');
				},
				60000
			);
		});
	};
}

module.exports = newUnitSubmitModule;
