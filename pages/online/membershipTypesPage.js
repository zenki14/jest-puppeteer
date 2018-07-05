import faker from 'faker';
import puppeteer from 'puppeteer';
import rateQuestionsPageModule from './rateQuestionsPage.js';

const rqp = new rateQuestionsPageModule();

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

function membershipTypesPageModule() {
	this.submitMembershipType = function() {
		rqp.submitRateQuestions();
		describe('Membership Types Page ...', () => {
			test(
				'User can submit a membership type',
				async () => {
					await page.click('.chooseMembership__membership-name', 'Adult');
					await page.waitForSelector('#next-button');
				},
				60000
			);
			// test('User can View Map',
			//   async () => {
			//     await page.click('[data-ga-label=View_Map]');
			//     await page.waitForSelector('.section-hero-header-title');
			//     await page.close();
			//     await page.waitForSelector('.chooseMembership__location-name');
			//   }, 60000);
		});
	};
}

module.exports = membershipTypesPageModule;
