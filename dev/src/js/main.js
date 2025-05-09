$(function() {
	initSortToggle();
	initBurgerMenu();
	initMobileSearch();
	initSelects();
	initIonRangeSliders();
	initFilterToggle();
	initTabs(".tabs");
	initClosePopup();
	initPasswordToggles();
	initPasswordValidation();
	setupSmileToggle();
	handleUserChatClick();
	initOverlayScroll();
	initMobileMenuToggle();
});

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

function initSelects() {
	$(".selectbox").select2({
		minimumResultsForSearch: 0,
		placeholder: "Выбрать"
	});

	$(".selectbox").on("select2:open", function () {
		$(".select2-container--open .select2-search__field").attr("placeholder", "Поиск");

		const waitForList = setInterval(() => {
			const resultsList = document.querySelector(".select2-results__options");

			if (resultsList) {
				const instance = OverlayScrollbars(resultsList);
				if (instance) instance.destroy();

				OverlayScrollbars(resultsList, {
					className: "os-theme-dark",
					scrollbars: {
						autoHide: "never",
						clickScrolling: true
					}
				});

				clearInterval(waitForList);
			}
		}, 50);
	});

	$("#country-id").select2({
		templateResult: function (option) {
			var $el = $(option.element),
				img = $el.data("img"),
				container = document.createElement("span");
			container.classList.add("select-img");

			if (img) {
				var imgEl = document.createElement("img");
				imgEl.src = img;
				container.appendChild(imgEl);
			}

			var textNode = document.createTextNode(option.text.trim());
			container.appendChild(textNode);

			return container;
		},

		templateSelection: function (option) {
			var img;

			if (option.element) {
				var $el = $(option.element);
				img = $el.data("img");
			} else {
				var $selected = $("#country-id option:selected");
				img = $selected.data("img");
			}

			var container = document.createElement("span");
			container.classList.add("select-img");

			if (img) {
				var imgEl = document.createElement("img");
				imgEl.src = img;
				container.appendChild(imgEl);
			}

			var textNode = document.createTextNode(option.text.trim());
			container.appendChild(textNode);

			return container;
		}
	});
}

$("body").on("click", ".js-sort", function(e) {
	e.stopPropagation();
	e.preventDefault();
	var parentItem = $(this).closest(".item, .sort");
	parentItem.toggleClass("open-sort");
});

$("body").on("click", ".js-comment", function(e) {
	e.stopPropagation();
	e.preventDefault();
	var parentItem = $(this).closest(".js-comment-wrapper");
	parentItem.addClass("active");
});

$("body").on("click", ".js-cancel-btn", function(e) {
	e.stopPropagation();
	e.preventDefault();
	var parentItem = $(this).closest(".js-comment-wrapper");
	parentItem.removeClass("active");
});

$("body").on("click", ".js-reply", function(e) {
	e.stopPropagation();
	e.preventDefault();
	var parentItem = $(this).closest(".js-comment-wrapper");
	parentItem.toggleClass("open-replies");
});

$("body").on("click", ".js-more-reply", function(e) {
	e.stopPropagation();
	e.preventDefault();
	var parentItem = $(this).closest(".js-comment-wrapper");
	parentItem.toggleClass("more-replies");
});

function initIonRangeSliders() {
	if ($(".js-range-slider1").length > 0) {
		let ageSlider = $(".js-range-slider1").ionRangeSlider({
			type: "double",
			min: 18,
			max: 100,
			from: 18,
			to: 60,
			grid: true,
			onChange: function (data) {
				$(".js-from1").val(data.from);
				$(".js-to1").val(data.to);
			}
		}).data("ionRangeSlider");

		$(".js-from1").val(ageSlider.result.from);
		$(".js-to1").val(ageSlider.result.to);
	}
}

function initFilterToggle() {
	$(".btn-filter").on("click", function (e) {
		if ($(e.target).closest(".btn-close").length) {
			$(this).removeClass("active");
			$(".footer-outer").show();
			$(".wrap-btn-tags").hide();
			$(".sidebar-community").removeClass("open-filter");
		} else {
			$(this).addClass("active");
			$(".footer-outer").hide();
			$(".wrap-btn-tags").show();
			$(".sidebar-community").addClass("open-filter");
		}
	});
}

function initTabs(containerSelector) {
	$(containerSelector).each(function () {
		const $tabs = $(this);
		const $buttons = $tabs.find(".tab-btn");
		const $contents = $tabs.find(".tabs-content");

		$buttons.on("click", function () {
			const index = $(this).index();

			$buttons.removeClass("active");
			$(this).addClass("active");

			$contents.removeClass("active");
			$contents.eq(index).addClass("active");
		});
	});
}

function initClosePopup() {
	$(".btn-close").on("click", function () {
		$("body").removeClass("fancybox-lock");
		$(".popup-wrap").hide();
	});
}

function initPasswordToggles() {
	$(".toggle-password").off("click").on("click", function () {
	const $toggle = $(this);
	const $input = $toggle.siblings("input");
	const isVisible = $toggle.hasClass("visible");

	$input.attr("type", isVisible ? "password" : "text");

	$toggle.toggleClass("visible");

	const icon = $toggle.find("use");
		icon.attr("xlink:href", isVisible ? "#reg-eye-hide" : "#reg-eye-show");
	});
}

function initPasswordValidation() {
	$(".form").on("submit", function (e) {
		e.preventDefault();

		const $form = $(this);
		let allValid = true;

		const $password = $form.find('input[name="password"]');
		const $repeat = $form.find('input[name="passwordRepeat"]');

		if ($password.length === 0) {
			return;
		}

		const val1 = $password.val().trim();
		const val2 = $repeat.length ? $repeat.val().trim() : '';

		$form.find(".wrap-input").removeClass("input-error");
		$form.find(".error-message").removeClass("active");

		if (val1.length < 5) {
			$password.closest(".wrap-input").addClass("input-error");
			$password.siblings(".error-message").addClass("active").text("Пароль слишком короткий");
			allValid = false;
		}

		if ($repeat.length > 0) {
			if (val2.length < 5 || val1 !== val2) {
				$repeat.closest(".wrap-input").addClass("input-error");
				$repeat.siblings(".error-message").addClass("active").text("Пароли не совпадают или слишком короткий");
				allValid = false;
			}
		}

		if (allValid) {
			$form.submit();
		}
	});
}

function setupSmileToggle() {
	const $button = $(".btn-smile");
	const $smileysBar = $(".smileys-bar");
	const $textareaHolder = $(".textarea-holder");

	$button.on("click", function (e) {
		e.stopPropagation();
		$button.toggleClass("active");
		$smileysBar.toggleClass("open");
	});

	$smileysBar.on("click", function (e) {
		e.stopPropagation(); 
	});

	$(document).on("click", function (e) {
		if (!$(e.target).closest(".textarea-holder, .smileys-bar").length) {
			$button.removeClass("active");
			$smileysBar.removeClass("open");
		}
	});
}

function handleUserChatClick() {
	$(".js-message").on("click", function () {
		const $link = $(this);
		const $textMessage = $link.find(".text-message");
		const $timeData = $link.find(".data");
		const $avatarHTML = $link.find(".avatar").html();
		const $dialogueHolder = $(".dialogue-holder");
		const $isDialogue = $dialogueHolder.find(".is-dialogue");
		const $blockMessage = $isDialogue.find(".block-message");
		const $usersList = $link.closest(".sidebar-chat");

		$link.find(".value").remove();
		$(".js-message").removeClass("active");
		$link.addClass("active");

		if (window.innerWidth <= 768 && $link.hasClass("active")) {
			$usersList.addClass("open-mobile-chat");
		} else {
			$usersList.removeClass("open-mobile-chat");
		}

		if ($textMessage.length === 0 || !$textMessage.text().trim()) {
			$isDialogue.removeClass("open-chat");
			$dialogueHolder.find(".dialogue-empty").show();
			$blockMessage.find(".box-wrap").remove();
			return;
		}

		const messageText = $textMessage.text().trim();
		const messageTime = $timeData.length ? $timeData.text().trim() : "00:00";

		$dialogueHolder.find(".dialogue-empty").hide();
		$isDialogue.addClass("open-chat");
		$blockMessage.find(".box-wrap").remove();

		const $boxWrap = $("<div class=\"box-wrap\"></div>");
		const $wrap = $("<div class=\"wrap\"></div>");
		const $col = $("<div class=\"col\"></div>");
		const $avatar = $("<div class=\"avatar\"></div>").html($avatarHTML);
		const $text = $("<div class=\"item text\"></div>").text(messageText);
		const $data = $("<div class=\"data\"></div>").text(messageTime);

		$col.append($avatar, $text);
		$wrap.append($col, $data);
		$boxWrap.append($wrap);
		$blockMessage.append($boxWrap);
	});

	$(".js-back").on("click", function () {
		$(".sidebar-chat").removeClass("open-mobile-chat");
		$(".js-message").removeClass("active");
	});
}

function initOverlayScroll() {
	$(".scroll-box").each(function () {
		OverlayScrollbars(this, {
			className: "os-theme-dark",
				scrollbars: {
				autoHide: "never",
				clickScrolling: true,
				horizontal: "hidden"
			}
		});
	});
}

function initMobileMenuToggle() {
	function isMobile() {
		return window.innerWidth <= 768;
	}

	$(".burger").on("click", function () {
		if (isMobile()) {
			$("body").addClass("fixed");
		}
	});

	$(".menu-header .btn-close").on("click", function () {
		if (isMobile()) {
			$("body").removeClass("fixed");
		}
	});
}