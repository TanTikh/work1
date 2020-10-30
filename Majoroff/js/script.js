$(document).ready(function () {
	var vw = $(window).width();
	/*кнопка меню*/

	if ($('.header__menu-icon').length) {
		$('.header__menu-icon').click(function () {
			$('.header__menu-icon, .header-contacts').toggleClass('active');
			$('body').toggleClass('lock');
		});
		$('.header__menu-icon.active, .header__link').click(function (event) {
			$('.header__menu-icon, .header-contacts').removeClass('active');
			$('body').removeClass('lock');
		});
	}

	/*плавный скролл */

	if ($('h2#works').length) {
		$('.header-bottom__link').on('click', function (e) {
			e.preventDefault();
			var targetBlockScrollHeight = $($(this).attr('href')).offset().top;
			$("html, body").animate({ scrollTop: targetBlockScrollHeight }, 2000);
		});
	}



	$('.footer-logo').on('click', function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, 2000);
	});
	/*фиксированный блок*/
	var prod = null;
	prod = $('.product');
	console.log(prod);

	if ($('.product').length) {
		(function stickyBlock() {
			var fixedSectionHeight = $('.product').height();
			var fixedBlockHeight = $('.product-about__fixed').height();
			var fixedBlockOffset = $('.product').offset();
			var fixedBlockOffsetTop = fixedBlockOffset.top;
			//высота скролла до фикс блока+(высота картинок-высота фикс блока)
			var offsetSum = fixedBlockOffsetTop + (fixedSectionHeight - fixedBlockHeight);
			$(window).scroll(function () {
				//если высота скролла больше чем расстояние сверху до фикс блока и меньше чем до конца секции минус высота фикс блока
				if ($(window).scrollTop() >= fixedBlockOffsetTop && $(window).scrollTop() <= offsetSum || $(window).scrollTop() <= offsetSum && $('.product-about__fixed').hasClass('off-sticky')) {
					$('.product-about__fixed').removeClass('off-sticky');
					$('.product-about__fixed').addClass('sticky');
					//если высота скролла больше чем сумма расстояния до блока и высоты секции минус высота блока
				} else if ($(window).scrollTop() >= offsetSum) {
					$('.product-about__fixed').removeClass('sticky');
					$('.product-about__fixed').addClass('off-sticky');
					//если высота скролла меньше суммы расстояний
				}
				else if ($(window).scrollTop() < fixedBlockOffsetTop && $('.product-about__fixed').hasClass('sticky')) {
					$('.product-about__fixed').removeClass('sticky');
				}
			});

		}());
	}

	/*слайдер с работами*/
	$('.works__slider').slick({
		infinite: true,
		centerMode: true,
		centerPadding: '120px',
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		responsive: [
			{
				breakpoint: 1599.98,
				settings: {
					centerMode: true,
					centerPadding: '25px',
					// centerPadding: '50px',
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 1199.98,
				settings: {
					centerMode: false,
					// centerPadding: '1px',
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},

			{
				breakpoint: 991.98,
				settings: {
					centerMode: false,
					// centerPadding: '0px',
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					centerMode: false,
					centerPadding: '0px',
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},

		]
	});

	/*показать описание работы на мобилках*/
	(function showSlideDesc() {
		if (vw < 992) {
			$('.works .slick-slide').on('click', function (e) {
				var eTarget = e.target;
				$(this).addClass('show').siblings('.slick-slide').removeClass('show');
			});
		}
	}());

	/*слайдер с отзывами*/

	$('.reviews-slider').slick({
		infinite: true,
		centerMode: true,
		centerPadding: '2px',
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		responsive: [

			{
				breakpoint: 1199.98,
				settings: {
					arrows: false
				}
			},


		]
	});
	// вопрос-ответ
	if ($('.faq').length) {
		$('.faq-item').eq(0).addClass("open").find('.faq-item__answer').slideDown(400);
		$('.faq-item__question').on('click', function (e) {

			if ($(this).parent().hasClass('open')) {
				return;
			} else {
				$('.faq-item').removeClass('open').find('.faq-item__answer').slideUp(400);
				$(this).parent().addClass('open').find('.faq-item__answer').slideDown(400);
			}

		});
	}


	//показать попап
	function showPopup(triggerSelector, popupSelector, closeSelector) {

		$(triggerSelector).on('click', function (e) {
			e.preventDefault();
			$(popupSelector).fadeIn();
			$('body').addClass('lock');
		});
		$(closeSelector).on('click', function (e) {
			// e.preventDefault();
			$(popupSelector).fadeOut();
			$('body').removeClass('lock');
			$(popupSelector).find('form').trigger('reset');
			$(popupSelector).find('input, textarea').val('');
			$('.popup__file-name').text('');
		});
	}

	showPopup('.popup-link', '.popup-file', '.popup-file .popup__close');
	showPopup('.popup-link-w', '.popup-want', '.popup-want .popup__close');
	showPopup('.f-cont__btn', '.popup-fr', '.popup-fr .popup__close');
	showPopup('.cat-popup-link', '.cat-popup-file', '.cat-popup-file .popup__close');
	showPopup('.cat-popup-link-w', '.cat-popup-want', '.cat-popup-want .popup__close');

	if ($('.cat__filter-title').length) {
		$('.cat__filter-btn').on('click', function () {
			$('.cat-filter').addClass('active');
		});
		$('.cat-filter__close-btn').on('click', function () {
			$('.cat-filter').removeClass('active');
		});

	}

	// inputmask
	$('input[type=tel]').inputmask("+7(999)999-99-99");
	// $('input[type=text]').inputmask({ regex: String.raw`[А-ЯЁа-яё ]*$` });

	// обработка блоков хочу такой же
	// var wantThisImg = null,
	// wantThisTitle = null;
	$(".popup-link-w").on("click", function () {
		var wimg = $(this).prev(".works-slide__product").css('background-image');
		wimg = wimg.slice(49);
		$('form#popup-form_want').append('<input type="hidden" name="wimg" value="' + wimg + '">');
		var wtitle = $(this).prev(".works-slide__product").find('.works-slide__title').text();
		$('form#popup-form_want').append('<input type="hidden" name="wtitle" value="' + wtitle + '">');

	});

	// форма с файлом
	var files; // переменная. будет содержать данные файлов

	// заполняем переменную данными, при изменении значения поля file
	$('input[type=file]').on('change', function () {
		files = this.files;
		var dots;
		var fileName = files[0].name.split('.');
		fileName[0].length > 8 ? dots = '...' : dots = '.';
		var showName = fileName[0].substring(0, 8) + dots + fileName[1];
		$('.popup__file-name').text(showName);
	});
	$('form').on('submit', function (e) {
		e.preventDefault();
		var t = $(this);
		var wimg = t.find('input[name=wimg]').val();
		var wtitle = t.find('input[name=wtitle]').val();
		var message = t.find('textarea[name=message]').val();
		$('.popup__btn .btn-text').css('display', 'none');
		$('.send-form').addClass('active');
		var fd = new FormData(e.target);
		fd.append('fname', t.attr('name'));
		fd.append('name', t.find('input[name=name]').val());
		fd.append('phone', t.find('input[name=phone]').val());
		fd.append('message', message);
		if (wimg != '' && wtitle != '') {
			fd.append('wimg', wimg);
			fd.append('wtitle', wtitle);
		}

		if (files) {
			$.each(files, function (key, value) {
				fd.append(key, value);
			});
		}
		return $.ajax({
			url: 'send.php',
			data: fd,
			dataType: 'json',
			processData: false,
			contentType: false,
			type: 'POST',
			// success: function (fd) {
			// 	alert(fd);
			// }
		}).done(function () {
			$('.popup__btn .btn-text').css('display', 'inline');
			$('.send-form').removeClass('active');
			t.trigger("reset");
			$('.popup__file-name').text('');
			window.location.href = "http://new-majoroff:88/thanks.html";
			// setTimeout(function () {
			// 	t.trigger("reset")
			// }, 1e3)
		}), !1
	});




});





