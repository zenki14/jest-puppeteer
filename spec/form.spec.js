import faker from 'faker';
import puppeteer from 'puppeteer';

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

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 60,
		args: [ `--window-size=${width},${height}` ]
	});
	page = await browser.newPage();
	await page.setViewport({ width, height });
	// await page.goto(APP, networkidle0);
});

afterAll(() => {
	browser.close();
});

describe('Membership Join', () => {
	test(
		'can sign up for an account',
		async () => {
			await page.goto(APP, { waitUntil: 'networkidle0' });
			await page.waitForSelector('.onlineNav__link--signup');
			await page.click('.onlineNav__link--signup');
			await page.waitForSelector('#next-link');
			await page.select('#selected_branch-id', '561');
			await page.click('#next-link');
			await page.waitForSelector('.chooseMembership__location-name');
			const branch = await page.evaluate(() => {
				const values = Array.from(document.querySelectorAll('.chooseMembership__location-name'));
				return values.map((value) => value.textContent);
			});
			expect(branch[0]).toEqual('Auburn Valley YMCA');
			await page.click('.chooseMembership__membership-name', 'Adult');
			await page.waitForSelector('#next-button');
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
			await page.waitForSelector('#next-button');
			await page.click('#next-button');
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
			await page.waitForSelector(
				'body > header.online__main-header.container > nav > ul > li:nth-child(2) > div > button'
			);
			await page.click('body > header.online__main-header.container > nav > ul > li:nth-child(2) > div > button');
			await page.waitForSelector('.onlineNav__dropdown-menu-link');
			await page.click('.onlineNav__dropdown-menu-item-last');
			await page.waitForSelector('.programsHome__search-form');
			const signup = await page.evaluate(() => {
				const values = Array.from(document.querySelectorAll('.onlineNav__link--signup'));
				return values.map((value) => value.textContent);
			});
			expect(signup[0]).toEqual('Sign Up');
		},
		180000
	);
});
