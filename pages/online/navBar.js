import faker from 'faker';
import puppeteer from 'puppeteer';

// const puppeteer = require('puppeteer');

const APP = 'https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc';

const member = {
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	email: faker.internet.email(),
	phone: faker.phone.phoneNumber(0),
	message: faker.random.words(),
	// userName: member.email(),
	userPassword: 'Daxko123!',
	birthDate: faker.date.past(),
	addressLineOne: faker.address.streetAddress(),
	addressCity: faker.address.city(),
	addressZipCode: faker.address.zipCode('35210'),
	emergencyFirstName: faker.name.firstName(),
	emergencyLastName: faker.name.lastName(),
	emergencyPhone: faker.phone.phoneNumber(0),
	fullName: faker.name.findName()
};

// let browser;
let page;
const width = 1920;
const height = 1080;

// beforeAll(async () => {
// browser = await puppeteer.launch({
// 	headless: false,
// 	slowMo: 60,
// 	args: [ `--window-size=${width},${height}` ]
// });
// page = await global.__BROWSER__.newPage();
// window.page = page;
// await page.setViewport({ width, height });
// await page.goto(APP, { waitUntil: 'networkidle0' });
// });

// afterAll(async () => {
// 	await page.close();
// });

function navBarModule() {
	this.loginButton = function() {
		describe('Logging into an Online Account ...', () => {
			test(
				'Clicking the Login button',
				async () => {
					await page.waitForSelector('.onlineNav__link--login');
					await page.click('.onlineNav__link--login');
					await page.waitForSelector('#lnkLoginSubmit');
				},
				60000
			);
		});
	};
	this.signUpButton = function() {
		describe('Signing up for an Online Account ...', () => {
			test(
				'Clicking the sign up button',
				async () => {
					await page.waitForSelector('.onlineNav__link--signup');
					await page.click('.onlineNav__link--signup');
					console.log(page.url());
					await page.waitForSelector('#next-link');
				},
				60000
			);
		});
	};
	this.programsButton = function() {
		describe('Using Programs button in Nav Bar to navigate to Landing Page ...', () => {
			test(
				'Clicking the Programs button',
				async () => {
					await page.waitForSelector('.onlineNav__link--programs');
					await page.click('.onlineNav__link--programs');
					await page.waitForSelector('.programsHome__headline');
				},
				60000
			);
		});
	};
	this.logOut = function() {
		describe('My Account on Nav Bar ...', () => {
			test(
				'Logging out with My Account button',
				async () => {
					await page.click('.onlineNav__link--account');
					await page.waitForSelector('.onlineNav__dropdown-menu-item-last');
					await page.click('onlineNav__dropdown-menu-item-last');
					await page.waitForSelector('.programsHome__search-form');
					const signup = await page.evaluate(() => {
						const values = Array.from(document.querySelectorAll('.onlineNav__link--signup'));
						return values.map((value) => value.textContent);
					});
					expect(signup[0]).toEqual('Sign Up');
				},
				60000
			);
		});
	};
}

module.exports = navBarModule;
