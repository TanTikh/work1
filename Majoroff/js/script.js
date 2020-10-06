$(document).ready(function () {
	var vw = $(window).width();

	$('.header__menu-icon').click(function (event) {
		$('.header__menu-icon, .header-contacts').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.header__menu-icon.active, .header__link').click(function (event) {
		$('.header__menu-icon, .header-contacts').removeClass('active');
		$('body').removeClass('lock');
	});

	(function stickyBlock() {
		var fixedBlockHeight = $('.fixed-block').height();
		var fixedItemsHeight = $('.fixed__items').height();

		var fixedBlockOffset = $('.fixed-block').offset();
		var fixedBlockOffsetTop = fixedBlockOffset.top;
		//высота скролла до фикс блока+(высота картинок-высота фикс блока)
		var offsetSum = fixedBlockOffsetTop + (fixedItemsHeight - fixedBlockHeight);
		var offsetFullSum = fixedBlockOffsetTop + fixedItemsHeight;
		$(window).scroll(function () {
			//если высота скролла больше чем расстояние сверху до фикс блока и меньше чем до конца секции минус высота фикс блока
			if ($(window).scrollTop() >= fixedBlockOffsetTop && $(window).scrollTop() <= offsetSum || $(window).scrollTop() <= offsetSum && $('.fixed-block').hasClass('off-sticky')) {
				$('.fixed-block').removeClass('off-sticky');
				$('.fixed-block').addClass('sticky');
				//если высота скролла больше чем сумма расстояния до блока и высоты секции минус высота блока
			} else if ($(window).scrollTop() > offsetSum) {
				$('.fixed-block').removeClass('sticky');
				$('.fixed-block').addClass('off-sticky');
				//если высота скролла меньше суммы расстояний
			}
			// else if ($(window).scrollTop() <= offsetSum) {
			// 	$('.fixed-block').removeClass('off-sticky');
			// 	// $('.fixed-block').addClass('sticky');
			// }
			else if ($(window).scrollTop() < fixedBlockOffsetTop && $('.fixed-block').hasClass('sticky')) {
				$('.fixed-block').removeClass('sticky');
			}
		});

	}());

	$('.works__slider').slick({
		infinite: true,
		centerMode: true,
		centerPadding: '120px',
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					centerPadding: '25px'
				}
			},
			{
				breakpoint: 1200,
				settings: {
					centerMode: false,
					centerPadding: '0px'
				}
			},

			{
				breakpoint: 992,
				settings: {
					centerMode: false,
					centerPadding: '0px',
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


	(function showSlideDesc() {
		if (vw < 992) {
			$('.works .slick-slide').on('click', function (e) {
				var eTarget = e.target;
				// var targetSlide = eTarget.parents('.works-slide');
				// console.log(eTarget);
				$(this).addClass('show').siblings('.slick-slide').removeClass('show');

			});

		}
	}());

	$('.reviews-slider').slick({
		infinite: true,
		// centerMode: true,
		// centerPadding: '120px',
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		// responsive: [
		// 	{
		// 		breakpoint: 1600,
		// 		settings: {
		// 			centerPadding: '25px'
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 1200,
		// 		settings: {
		// 			centerMode: false,
		// 			centerPadding: '0px'
		// 		}
		// 	},

		// 	{
		// 		breakpoint: 992,
		// 		settings: {
		// 			centerMode: false,
		// 			centerPadding: '0px',
		// 			slidesToShow: 2,
		// 			slidesToScroll: 1
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 576,
		// 		settings: {
		// 			centerMode: false,
		// 			centerPadding: '0px',
		// 			slidesToShow: 1,
		// 			slidesToScroll: 1
		// 		}
		// 	},

		// ]
	});

});