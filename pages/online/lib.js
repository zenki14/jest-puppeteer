import faker from 'faker';
import puppeteer from 'puppeteer';
import navBarModule from './navBar.js';
import homePageModule from './homePage.js';
import rateQuestionsPageModule from './rateQuestionsPage.js';
import membershipTypesPageModule from './membershipTypesPage.js';
import submitNewOnlineMemberModule from './newMemberInfoPage.js';
import newUnitSubmitModule from './newUnitPage.js';
import newOnlinePaymentMethodModule from './onlinePaymentPage.js';

const nav = new navBarModule();
const home = new homePageModule();
const rqp = new rateQuestionsPageModule();
const mtp = new membershipTypesPageModule();
const nmip = new submitNewOnlineMemberModule();
const nup = new newUnitSubmitModule();
const nopmm = new newOnlinePaymentMethodModule();

const APP = 'https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc';

let page;

beforeAll(async () => {
	// const page = await global.__BROWSER__.newPage();
	await page.goto(APP, { waitUntil: 'networkidle0' });
});

function libOnlineModule() {
	//Nav Bar
	// nav.loginButton();
	const signUpButton = nav.signUpButton();
	this.signUpButton;
	// nav.programsButton();
	// nav.logOut();
}

module.exports = libOnlineModule;
