$(function() {
	initSortToggle();
	initBurgerMenu();
	initMobileSearch();
});

$(window).on('load', function () {
	//calls functions
});

$(window).on('resize', function () {
	//calls functions
});

$(window).load(function() {
	//calls functions
});

$(window).scroll(function() {
	//calls functions
});

//functions

function initSortToggle() {
	$(".js-drop").on("click", function(e) {
		e.preventDefault();

		var $dropParent = $(this).closest(".drop");

		if (!$dropParent.hasClass("open-drop")) {
			$(".drop").removeClass("open-drop");
			$dropParent.addClass("open-drop");
		} else {
			$dropParent.removeClass("open-drop");
		}
	});

	$(document).on("click", function(e) {
		if (!$(e.target).closest(".drop").length) {
			$(".drop").removeClass("open-drop");
		}
	});
}

function initBurgerMenu() {
	$(".burger").on("click", function(e) {
		e.stopPropagation();

		$(".header-top").removeClass("open-search");
		$(this).closest(".header-top").toggleClass("open-menu");

		if ($(".user-profile.drop").hasClass("open-drop")) {
			$(".user-profile.drop").removeClass("open-drop");
		}
	});

	$(document).on("click", function(e) {
		if (!$(e.target).closest(".burger").length) {
			$(".header-top").removeClass("open-menu");
		}
	});
}

function initMobileSearch() {
	$(".btn-search").on("click", function(e) {
		e.stopPropagation();

		$(".header-top").removeClass("open-menu");
		$(this).closest(".header-top").toggleClass("open-search");
	});

	$(document).on("click", function(e) {
		if ($(e.target).closest(".wrap-search").length) {
			return;
		}

		if (!$(e.target).closest(".btn-search").length) {
			$(".header-top").removeClass("open-search");
		}
	});
}
