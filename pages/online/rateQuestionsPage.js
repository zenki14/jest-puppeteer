import faker from 'faker';
import puppeteer from 'puppeteer';
import navBarModule from './navBar.js';

// const puppeteer = require('puppeteer');

const nav = new navBarModule();

const APP = 'https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc';

// let browser;
// let page;
const width = 1920;
const height = 1080;

// beforeAll(async () => {
// browser = await puppeteer.launch({
// 	headless: false,
// 	slowMo: 60,
// 	args: [ `--window-size=${width},${height}` ]
// });
// page = await browser.newPage();
// page = await global.__BROWSER__.newPage();
// await page.setViewport({ width, height });
// await page.goto(APP, { waitUntil: 'networkidle0' });
// });

// afterAll(async () => {
// 	await page.close();
// });

function rateQuestionsPageModule() {
	this.submitRateQuestions = function() {
		// nav.signUpButton();
		describe('Rate Questions page...', () => {
			test(
				'User can select a Location',
				async () => {
					await page.select('#selected_branch-id', '561');
					const branch = await page.evaluate(() => {
						const values = Array.from(document.querySelectorAll('#selected_branch-id'));
						return values.map((value) => value.textContent);
					});
					expect(branch[0]).toEqual('Auburn Valley YMCA');
				},
				60000
			);
			test(
				'User can submit a Rate Option',
				async () => {
					await page.click('#next-link');
					await page.waitForSelector('.chooseMembership__location-name');
					const selectedBranch = await page.evaluate(() => {
						const values = Array.from(document.querySelectorAll('.chooseMembership__location-name'));
						return values.map((value) => value.textContent);
					});
					expect(selectedBranch[0]).toEqual('Auburn Valley YMCA');
				},
				60000
			);
		});
	};
}

module.exports = rateQuestionsPageModule;
