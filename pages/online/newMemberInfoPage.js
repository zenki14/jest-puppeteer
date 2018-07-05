import faker from 'faker';
import puppeteer from 'puppeteer';
import membershipTypesPageModule from './membershipTypesPage.js';

const mtp = new membershipTypesPageModule();

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

function submitNewOnlineMemberModule() {
	this.newMemberInfoSubmit = function() {
		mtp.submitMembershipType();
		describe('Submitting new online member info ...', () => {
			test(
				'User can submit their information',
				async () => {
					await page.click('input[type=email]');
					await page.type('input[type=email]', member.email);
					await page.click('input[name=password]');
					await page.type('input[name=password]', 'Daxko123!');
					await page.click('#password_confirm');
					await page.type('#password_confirm', 'Daxko123!');
					await page.click('#first_name');
					await page.type('#first_name', member.firstName);
					await page.click('#last_name');
					await page.type('#last_name', member.lastName);
					await page.select('#gender', 'M');
					await page.click('.birth_date');
					await page.type('.birth_date', '06261986');
					// defect found already with ^ regarding mobile view
					await page.select('#race', 'W');
					await page.click('#address_line_1');
					await page.type('#address_line_1', member.addressLineOne);
					await page.click('#address_city');
					await page.type('#address_city', member.addressCity);
					await page.select('#address_us_state', 'AL');
					await page.click('#address_us_zip');
					await page.type('#address_us_zip', member.addressZipCode);
					await page.click('#phone');
					await page.type('#phone', member.phone);
					await page.click('#emergency_contact_first_name');
					await page.type('#emergency_contact_first_name', member.emergencyFirstName);
					await page.click('#emergency_contact_last_name');
					await page.type('#emergency_contact_last_name', member.emergencyLastName);
					await page.click('#emergency_phone');
					await page.type('#emergency_phone', member.emergencyPhone);
					// await page.waitForSelector('#next-button');
					await page.click('#next-button');
					await page.waitForSelector('#members');
				},
				60000
			);
		});
	};
}

module.exports = submitNewOnlineMemberModule;
