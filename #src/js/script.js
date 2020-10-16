$(document).ready(function () {
	var vw = $(window).width();
	/*кнопка меню*/
	$('.header__menu-icon').click(function (event) {
		$('.header__menu-icon, .header-contacts').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.header__menu-icon.active, .header__link').click(function (event) {
		$('.header__menu-icon, .header-contacts').removeClass('active');
		$('body').removeClass('lock');
	});
	/*плавный скролл */
	$('.header-bottom__link').on('click', function (e) {
		e.preventDefault();
		var targetBlockScrollHeight = $($(this).attr('href')).offset().top;
		$("html, body").animate({ scrollTop: targetBlockScrollHeight }, 2000);
	});

	$('.footer-logo').on('click', function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, 2000);
	});
	/*фиксированный блок*/
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
	/*слайдер с работами*/
	$('.works__slider').slick({
		infinite: true,
		centerMode: true,
		centerPadding: '120px',
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		responsive: [
			{
				breakpoint: 1599.98,
				settings: {
					centerMode: true,
					centerPadding: '25px',
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 1199.98,
				settings: {
					centerMode: false,
					// centerPadding: '1px',
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},

			{
				breakpoint: 991.98,
				settings: {
					centerMode: false,
					// centerPadding: '0px',
					slidesToShow: 2,
					slidesToScroll: 2
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
	$('.faq-item').eq(0).addClass("open").find('.faq-item__answer').slideDown(400);
	$('.faq-item__question').on('click', function (e) {

		if ($(this).parent().hasClass('open')) {
			return;
		} else {
			$('.faq-item').removeClass('open').find('.faq-item__answer').slideUp(400);
			$(this).parent().addClass('open').find('.faq-item__answer').slideDown(400);
		}

	});


});