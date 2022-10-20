$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper').length) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			}
		})
	}


	// Карусель товаров
	const productsSliders = []

	$('.products .swiper').each(function (i) {
		$(this).addClass('products_s' + i)

		let options = {
			loop: true,
			speed: 500,
			spaceBetween: 0,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					slidesPerView: 'auto'
				},
				480: {
					slidesPerView: 2
				},
				768: {
					slidesPerView: 3
				},
				1280: {
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => {
					productHeight($(swiper.$el), $(swiper.$el).find('.product_wrap').length)
				},
				resize: swiper => {
					productHeight($(swiper.$el), $(swiper.$el).find('.product_wrap').length)
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Категории - бегущая строка
	const wordsSliders = []

	$('.category .words .swiper').each(function (i) {
		$(this).addClass('words_s' + i)

		let options = {
			loop: true,
			speed: 500,
			spaceBetween: 40,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			centeredSlides: true,
			speed: 6000,
			autoplay: {
				delay: 1,
			},
			allowTouchMove: false,
			disableOnInteraction: true
		}

		wordsSliders.push(new Swiper('.words_s' + i, options))
	})


	// Страница товара
	if ($('.product_info .images').length) {
		const productSlider = new Swiper('.product_info .images .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$('.product_info .images .thumbs .btn').removeClass('active')
						$('.product_info .images .thumbs .btn').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})

		$('.product_info .images .thumbs .btn').click(function (e) {
			e.preventDefault()

			productSlider.slideTo($(this).data('slide-index'), 500)
		})
	}


	// Фильтр
	$('.filter .mob_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	$('.filter .spoler_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		$(this).toggleClass('active')
		parent.find('.hide').slideToggle(300)
	})

	// Моб. табы
	$('.mob_tab_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.tabs_container')

		if (!$(this).hasClass('active')) {
			parent.find('.mob_tab_btn').removeClass('active')
			parent.find('.tab_content').slideUp(300)

			$(this).toggleClass('active').next().slideDown(300)
		} else {
			parent.find('.mob_tab_btn').removeClass('active')
			parent.find('.tab_content').slideUp(300)
		}
	})


	// Фиксация блока
	$('.sticky').stick_in_parent({
		offset_top: 20
	})


	// Меню
	$('header .catalog .mains > *').mouseenter(function () {
		let index = $(this).index()

		$('header .catalog .mains a').removeClass('active')
		$(this).find('a').addClass('active')

		$('header .catalog .subs > *').hide()
		$('header .catalog .subs > *').eq(index).fadeIn(300)
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}

	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline'
		}])
	})

	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	// Мини всплывающие окна
	$('.mini_modal_btn').click(function (e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Кастомный select
	$('select').niceSelect()


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('.mob_menu').toggleClass('show')
	})


	$('.mob_menu .catalog .btn').click(function (e) {
		e.preventDefault()

		$('.mob_menu .catalog_sub').addClass('show')
	})

	$('.mob_menu .catalog_sub .back .btn').click(function (e) {
		e.preventDefault()

		$('.mob_menu .catalog_sub').removeClass('show')
	})


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				if ($('.tabs button[data-content="#' + anchor + '"]').length) {
					const $activeTab = $('.tabs button[data-content="#' + anchor + '"]'),
						$parent = $activeTab.closest('.tabs_container'),
						level = $activeTab.data('level')

					$parent.find('.tabs:first button, .tab_content.' + level).removeClass('active')

					$activeTab.addClass('active')
					$('#' + anchor).addClass('active')
				}

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row:not(.cont)').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Фикс. шапка
	headerInit = true,
		headerHeight = $('.mob_header').outerHeight()

	$('.mob_header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Выравнивание элементов в сетке
		$('.products .row:not(.cont)').each(function () {
			productHeight($(this), parseInt($(this).css('--products_count')))
		})


		// Фикс. шапка
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit = true
			headerHeight = $('.mob_header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > 0
				? $('.mob_header').addClass('fixed')
				: $('.mob_header').removeClass('fixed')
		}, 100)


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product_wrap')

	$products.height('auto')
	$products.find('.name').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish))
		setHeight($products.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}