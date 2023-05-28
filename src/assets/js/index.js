// import { gsap } from 'gsap';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

// global.gsap = gsap;

// gsap.defaults({
// 	overwrite: 'auto',
// });

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			// Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}

const menuBurger = document.querySelector('.menu__burger');
const basket = document.querySelector('.basket');
menuBurger.addEventListener('click', function () {
	if (basket.classList.contains('basket--open')) {
		basket.classList.remove('basket--open');
		menuBurger.classList.remove('menu__burger--open');
	} else {
		basket.classList.add('basket--open');
		menuBurger.classList.add('menu__burger--open');
	}
});

const basketProductItem = document.querySelectorAll('.basket__product-item');
let productCount = basketProductItem.length;

function countTotal() {
	const subTotalPrice = document.querySelector('.basket__subtotal-price');
	const taxPrice = Number(document.querySelector('.basket__tax-price').innerHTML);
	const shippingPrice = Number(document.querySelector('.basket__shipping-price').innerHTML);
	const totalPrice = document.querySelector('.basket__total-price');
	let subTotal = 0;
	basketProductItem.forEach(item => {
		const basketCountPrice = Number(item.querySelector('.basket__count-price').innerHTML);
		const basketCountSpan = Number(item.querySelector('.basket__count-span').innerHTML);
		subTotal = subTotal + basketCountPrice * basketCountSpan;
		console.log(subTotal);
		console.log(basketCountPrice);
		console.log(basketCountSpan);
	});
	subTotalPrice.innerHTML = subTotal;
	if (subTotal == 0) {
		totalPrice.innerHTML = '0';
	} else {
		totalPrice.innerHTML = subTotal + taxPrice + shippingPrice;
	}
	console.log('shit');
}

document.addEventListener('DOMContentLoaded', () => {
	countTotal();
});
basketProductItem.forEach(item => {
	const cartNumber = document.querySelector('.menu__cart-number span');
	const basketCountButtonMinus = item.querySelector('.basket__count-button--minus');
	const basketCountButtonPlus = item.querySelector('.basket__count-button--plus');
	const basketCountSpan = item.querySelector('.basket__count-span');
	function removeItem() {
		basketCountSpan.innerHTML = '0';
		countTotal();
		item.remove();
		productCount--;
		cartNumber.innerHTML = productCount;
	}
	item.querySelector('.basket__item-close').addEventListener('click', removeItem);
	basketCountButtonMinus.addEventListener('click', function () {
		basketCountSpan.innerHTML = Number(basketCountSpan.innerHTML) - 1;
		if (Number(basketCountSpan.innerHTML) <= 0) {
			removeItem();
		}
		countTotal();
	});
	basketCountButtonPlus.addEventListener('click', function () {
		basketCountSpan.innerHTML = Number(basketCountSpan.innerHTML) + 1;
		countTotal();
	});
});
