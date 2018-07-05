import faker from 'faker';
import puppeteer from 'puppeteer';
import newUnitSubmitModule from './newUnitPage.js';
import navBarModule from './navBar.js';

const nup = new newUnitSubmitModule();
const nav = new navBarModule();

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

function newOnlinePaymentMethodModule() {
	this.payWithNewCard = function() {
		nup.newUnitSubmit();
		describe('Payment Method Page ...', () => {
			test(
				'User can submit a payment with a credit card',
				async () => {
					await page.select('#selected-billing-method-id', 'new_credit_card');
					await page.waitForSelector('#cc-exp');
					await page.click('.name-cc');
					await page.type('.name-cc', member.fullName);
					await page.click('.address');
					await page.type('.address', member.addressLineOne);
					await page.click('.zip');
					await page.type('.zip', member.addressZipCode);
					await page.click('#cc-number');
					await page.type('#cc-number', '4111 1111 1111 1111');
					await page.waitForSelector('.card-icon.visa');
					await page.click('#cc-cvv');
					await page.type('#cc-cvv', '123');
					await page.click('#cc-exp');
					await page.type('#cc-exp', '0121');
					await page.click('#continue-button');
					await page.waitForSelector('.receipt-web');
					nav.logOut();
				},
				60000
			);
		});
	};
}

module.exports = newOnlinePaymentMethodModule;
