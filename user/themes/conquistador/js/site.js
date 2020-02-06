String.prototype.htmlSpecialChars = function () {
	return this.replace(/\</g, '<').replace(/\>/g, '>');
}

$(function () {
	// Search form in nav bar
	if ($('nav.site form#searchform').length) {
		var form = $('nav.site form#searchform');
		$('nav.site > ol').append('<li id="sform"><a href="" id="sreplace"><i class="icon-search"></i></a></li>');
		$('#sreplace').click(function () {
			$('#sform').append(form);
			$('#sreplace').fadeOut('fast', function () {
				$(form).fadeIn(function () {
					$('#s').focus()
				})
			});
			$('#s').attr('placeholder', 'Search For...');
			return false;
		});
	}

	// Admin keys
	var adminKeys = new Array('g', 'o', 'i', 'n');
	var adminCurrent = 0;
	$(window).keydown(function (e) {
		var key = String.fromCharCode(e.keyCode).toLowerCase();
		if (adminKeys[adminCurrent].toLowerCase() == key) {
			adminCurrent++;
			if (adminCurrent >= adminKeys.length) {
				document.location = HABARI_URL + '/admin';
				adminCurrent = 0;
			}
		}
		else {
			adminCurrent = 0;
		}
	});

	// Back to Top Link
	$('a[href=#top]').click(function () {
		$('html, body').animate({scrollTop: 0}, 'slow');
		return false;
	});
	$('#totop').click(function () {
		$('html, body').animate({scrollTop: 0}, 'slow');
		return false;
	});
	$('#totop').html("<small><i class=\"icon-arrow-up\"></i></small> Back to top");
	$(window).bind('scroll', function () {
		if ($(this).scrollTop() > 400) {
			$('#totop').fadeIn();
		} else {
			$('#totop').fadeOut();
		}
	});

	//stick navbar
	var num = 300; //number of pixels before modifying styles

	$(window).bind('scroll', function () {
		if ($(window).scrollTop() > num) {
			$('nav.site').addClass('fixed').fadeIn();
		} else {
			$('nav.site').removeClass('fixed');
		}
	});

	//session messages
	$('.messages').click(function () {
		$(this).fadeOut()
	});
	setTimeout(function () {
		$('.messages').fadeOut()
	}, 8000);

	// Fancybox
	if (CONQUISTADOR_USE_FANCYBOX) {
		$('a.fancybox').fancybox({hideOnContentClick: true});
		$('.fancybox-iframe').fancybox({
			'transitionIn': 'none',
			'transitionOut': 'none',
			'type': 'iframe',
			'width': '75%',
			'height': '70%'
		});
	}

	// Fluid Videos
	var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
		$fluidEl = $("div.wrap");
	$allVideos.each(function () {
		$(this)
			// jQuery .data does not work on object/embed elements
			.attr('data-aspectRatio', this.height / this.width)
			.removeAttr('height')
			.removeAttr('width');
	});
	$(window).resize(function () {
		var newWidth = $fluidEl.width();
		$allVideos.each(function () {
			var $el = $(this);
			$el
				.width(newWidth)
				.height(newWidth * $el.attr('data-aspectRatio'));
		});
	}).resize();

	// Admin Bar position
	if ( $('ul.admin.site').length ) {
		var stickyAdminLeft = $('ul.admin.site').offset().left;
		$(window).scroll(function () {
			$('ul.admin.site').css('position', 'fixed').css('top', '0').css('right', 'auto').css('left', stickyAdminLeft);
		});
		$(window).resize(function () {
			if ( $(document).width() < stickyAdminLeft + $('ul.admin.site').width() ) {
				stickyAdminLeft = $(document).width() < stickyAdminLeft + $('ul.admin.site').width()
			}
			else {
				stickyAdminLeft = parseInt($('.wrap').width()) + parseInt($('.wrap').offset().left) - parseInt($('ul.admin.site').width());
			}
			$('ul.admin.site').css('position', 'fixed').css('top', '0').css('right', 'auto').css('left', stickyAdminLeft);
		});
	}
});

