"use strict";

document.addEventListener("DOMContentLoaded", () => {
	scNavbarView();
});

window.addEventListener('resize', function (event) {
	scNavbarView();
});

function scNavbarView() {
	let bodyWidth,
		navbar,
		navbarWidth,
		navbarItems,
		navbarItemsWidth = 0,
		key = 0;
	bodyWidth = document.documentElement.clientWidth;
	navbar = document.querySelector('.navbar');
	navbarItems = document.querySelectorAll('.navbar__item');
	if (navbar !== null && bodyWidth > 1280) { // SC: left and right navbar items on line
		navbarWidth = navbar.offsetWidth;
		if (navbarItems !== null) {
			for (let i = 0; i < navbarItems.length; i++) {
				navbarItemsWidth += navbarItems[i].offsetWidth;
				if (
					(
						navbarItemsWidth >= navbarWidth
						&& key == 0
					)
					||
					(
						Math.floor(navbarItemsWidth / navbarWidth) > 1
						&& navbarItemsWidth >= (navbarWidth * Math.floor(navbarItemsWidth / navbarWidth))
						&& key == (Math.floor(navbarItemsWidth / navbarWidth) - 1)
					)
				) {
					navbarItems[i - 1].classList.add('navbar__item_right');
					navbarItems[i].classList.add('navbar__item_left');
					key++;
					navbarItemsWidth = (navbarWidth * Math.floor(navbarItemsWidth / navbarWidth)) + navbarItems[i].offsetWidth;
				}
			}
		}
	}
	else if (navbar !== null && bodyWidth <= 1280) { // SC: navbar items on mobile
		document.querySelector('.navbar-opener__button').addEventListener("click", () => {
			navbar.classList.add('navbar_open');
		});

		document.querySelector('.navbar__button-close').addEventListener("click", () => {
			navbar.classList.remove('navbar_open');
			scRenameRemove();
		});

		document.addEventListener('keydown', function (event) {
			// ESCAPE key pressed
			if (event.code == 'Escape') {
				navbar.classList.remove('navbar_open');
				scRenameRemove();
			}
		});

		// SC: click on item when has dropdown menu
		let nameClickItem = '';
		navbar.addEventListener("click", function (event) {
			if (event.target.closest('.navbar__item-parent:not(.active) .navbar__link')) {
				event.preventDefault();
				nameClickItem = event.target.closest('.navbar__item-parent .navbar__link').textContent;
				document.querySelector('.navbar__title .navbar__link').textContent = nameClickItem;
				event.target.closest('.navbar__item-parent .navbar__link').textContent = 'Смотреть все';
				event.target.closest('.navbar__item-parent').classList.add('active');
				navbar.classList.add('active');
			}
		});

		// SC: click back button
		document.querySelector('.navbar__button-back').addEventListener("click", () => {
			scRenameRemove();
		});

	}

	// SC: function reneme and remove active
	function scRenameRemove() {
		let titleSection = '';
		titleSection = document.querySelector('.navbar__title .navbar__link').textContent;
		document.querySelector('.navbar__title .navbar__link').textContent = 'Каталог';
		document.querySelector('.navbar__item-parent.active .navbar__link').textContent = titleSection;
		navbar.classList.remove('active');
		document.querySelector('.navbar__item-parent.active').classList.remove('active');
	}
}