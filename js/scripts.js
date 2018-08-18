/*
    vim: ts=4
*/
var theme_path = '/sites/all/themes/cha';
var modalTimeoutID;
var modalSeconds;
var IE8 = (!document.addEventListener) ? 1 : 0;

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/*
	IE8 doesn't have string trim
*/
if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

function scroll_to_div(selector, offset) {
	jQuery("html,body").animate(
		{ scrollTop: jQuery(selector).offset().top - offset },
		'slow'
	);
	return(false);
}

/*
	Search screen open and close
*/
function open_search() {
	$("#search_overlay").removeClass("slideOutRight").addClass("animated slideInRight").show();
	return(false);
}

function close_search() {
	$("#search_overlay").removeClass("slideInRight").addClass("slideOutRight");
}

(function ($) {
    /*
		Touch or not?
	*/
	$("body").addClass(isMobile.any() ? "touch" : "no-touch");

	/*
		This fixes lex tooltips not displaying on iOS devices
	*/
	if (isMobile.iOS()) {
		$("body").addClass("iOS");
	}

	/*
		Down chevron in main header
	*/
	$("#nav-arrow-button").on("click", function(e) {
		scroll_to_div($(this).attr("href"), 70);
		return(false);
	});

	$(".section-jump").on("click", function(e) {
		var href = $(this).attr("href");
		if (href !== "#") {
			scroll_to_div(href, 70);
			return(false);
		}
		else {
			return(true);
		}
	});

	$(".section-jump-menu").on("click", function(e) {
		$('#navbarMegamenu, .navbar-toggler').trigger('click')
		return(false);
	});

    /*
        Footnote tooltips in GCIS viewer
    */
    $(document).on("click", "sup.gcis-tooltip", function(event) {
        $(this).qtip({
            overwrite: false,
            show: {
                event: "click",
                ready: true
            },
            hide: 'unfocus',
            style: {
                classes: 'qtip-light qtip-gcis'
            },
            position: {
                my: 'top center',
                at: 'bottom center',
            }
        }, event);
    });

	/*
		Lightbox using a Bootstrap modal
	*/
	$("a.lightbox").click(function(e) {
		var href = $(this).attr("href");
		var $dad = $(this).parent();
		var title = $(this).data("title");
		var caption_div = $dad.find("div.caption");
		var caption = caption_div.html();
		var backdrop = IE8 ? false : true;

		if (caption_div == null) {
			caption_div = $dad.parent().find("div.caption");
			caption = caption_div.html();
		}
		if (typeof caption_div.attr("data-expandedcaption") !== "undefined") {
			caption = caption_div.data("expandedcaption");
		}

		$("#modal-lightbox div.modal-body").html("<p class='lightbox-img'><img src='" + href + "'></p>");
		$("#modal-lightbox .modal-title").html(title);
		if (typeof(caption) != "undefined") {
			$("#modal-lightbox div.modal-body").append("<div class='caption'>" + caption + "</div>");
		}
		$("#modal-lightbox").modal({
			backdrop: !IE8,
			keyboard: true
		});
		$("#modal-lightbox").on('shown.bs.modal', function() {
			$("#modal-lightbox div.modal-body p.lightbox-img").css('opacity', 100);
		});
		$("#modal-lightbox").on('hidden.bs.modal', function() {
			$(document).off("click", "a.footnote-button");
		});
		$(document).on("click", "a.footnote-button", function(event) {
			$(this).qtip({
				overwrite: false,
				content: {
					attr: 'data-footnote-content',
				},
				show: {
					event: "click",
					ready: true
				},
				hide: 'unfocus',
				style: {
					classes: 'qtip-light qtip-gcis'
				},
				position: {
					my: 'bottom center',
					at: 'bottom center', 
					adjust: {
						y: -16
					}
				}
			}, event);
			return(false);
		});
		return(false);
	});

	/*
		Display a figure's metadata
	*/
	$("a.metadata_a").click(function(e) {
		$("<div class='modal-backdrop metadata-modal-backdrop'></div>").appendTo(document.body);
		gcis_show_figure($(this).attr("href"), show_figure_cb);
		e.preventDefault();
		return(false);
	});

	$("a.metadata_a").contextmenu(function() {
		alert("You can't right click the metadata button.");
		return(false);
	});

	/*
		Supporting evidence
	*/
	$("a.traceable_account_a").click(function(e) {
		scroll_to_div($(this).attr("href"), 60);
		return(false);
	});
	/*
	$("a.traceable_account_a").click(function(e) {
		var uuid = $(this).attr("href");
		var title = $(this).parent().parent().find("h3").html();
		var backdrop = IE8 ? false : true;

		e.preventDefault();

		// Stop the carousel
		//var owl_carousel = $(this).closest(".owl-carousel");
		//$(owl_carousel).trigger("stop.owl.autoplay");

		//$("#modal-lightbox").data("owl-carousel", owl_carousel);
		$("#modal-lightbox .modal-title").html(title);
		$("#modal-lightbox").modal({
			backdrop: !IE8,
			keyboard: true
		});
		gcis_show_finding(uuid, "#modal-lightbox");
		$("#modal-lightbox").off('hide.bs.modal');
		//$("#modal-lightbox").on('hide.bs.modal', function() {
			//var owl_carousel = $("#modal-lightbox").data("owl-carousel");
			//$(owl_carousel).trigger("play.owl.autoplay");
		//});
		return(false);
	});
	*/

	$(".related-resources").on("click", function(e) {
		var rr = $(".related-resources-div").html();
		var title = $(".related-resources-div").data("title");
		var backdrop = IE8 ? false : true;

		$("#modal-lightbox .modal-title").html(title);
		$("#modal-lightbox div.modal-body").html(rr);
		$("#modal-lightbox").modal({
			backdrop: !IE8,
			keyboard: true
		});
		e.preventDefault();
		return(false);
	});

	$(".figure-social-icons a.share").click(function(e) {
		var popup_content = $(this).next(".social-icons");
		var w = $(this);
		var position = {
		    my: 'center right',
		    at: 'center left'
		}
		show_share_tooltip(e, w, popup_content, position);
		e.preventDefault();
		return(false);
	});

	$(".icon-share").click(function(e) {
		var popup_content = $(this).parent().find(".social-icons");
		var w = $(this);
		var position = {
		    my: 'center right',
		    at: 'center left'
		}
		show_share_tooltip(e, w, popup_content, position);
		e.preventDefault();
		return(false);
	});

    $(".figure-social-icons a.download-list").click(function(e) {
        var popup_content = $(this).next(".download-list-icons");
		console.log(popup_content);
        var w = $(this);
        var position = {
            my: 'top left',
            at: 'bottom left'
        }
        show_list_tooltip(e, w, popup_content, position);
        e.preventDefault();
        return(false);
    });

	/*
		Social icons actions
	*/
	$(document).on("click", ".facebook-icon", function(e) {
		var href = $(this).data("fb-image");
		var title = $(this).data("fb-title");
		var qtip_w = $(this).parent().parent().parent();
		var what_to_share;

		what_to_share = (href.search("img/figure") == -1) ? window.location.href : href;

		FB.ui(
		  {
			method: 'share',
			name: 'Facebook Sharing',
			href: what_to_share,
			quote: title,
			picture: href,
		  },
		  function(response) {
		  	if (response && response.post_id) {
				;
			}
			else {
				console.log("Post not shared.");
			}
		  }
		);
		qtip_w.qtip('hide');
		return(false);
	});

	$(document).on("click", ".link-icon", function(e) {
		var lc = $(this).parent().find(".link-content")
		lc.slideToggle();
		e.preventDefault();
		return(false);
	});

	function show_figure_cb() {
		/*
			Display the modal
		*/
		$("a.zoom").off("click");
		$("a.zoom").on("click", function() {
			var href= $(this).attr("href");
			$("#metadata-image-zoom-modal .modal-body").html('<img src="' + href + '" style="width: 100%;">');
			$("#metadata-image-zoom-modal").modal({
				backdrop: true,
				keyboard: true
			});
			return false;
		});

		$('#metadata-summary-modal').modal();
		$("#metadata-summary-modal ul.nav-tabs li a:first").tab("show");
		$(".metadata-modal-backdrop").remove();

		/*
			http://miles-by-motorcycle.com/fv-b-8-670/stacking-bootstrap-dialogs-using-event-callbacks
		*/
		$('#metadata-summary-modal').on('hidden.bs.modal', function(event) {
			$(this).removeClass('fv-modal-stack');
			var fvid = $('body').data('fv_open_modals') - 1;
			// Dont know why "overflow" is set to "hidden" but it disables vertical scrolling
			$(".fv-modal-id-" + fvid).css("overflow-y", "auto");
			$('body').data('fv_open_modals', $('body').data('fv_open_modals') - 1);
		});
		$('#metadata-summary-modal').off('shown.bs.modal');
		$('#metadata-summary-modal').on('shown.bs.modal', function (event) {
			// keep track of the number of open modals
			if (typeof($('body').data('fv_open_modals')) == 'undefined') {
				$('body').data('fv_open_modals', 0);
			}

			// if the z-index of this modal has been set, ignore.
			if ($(this).hasClass('fv-modal-stack')) {
				return;
			}

			$(this).addClass('fv-modal-stack');
			var fvid = $('body').data('fv_open_modals') + 1;
			$(this).addClass('fv-modal-id-' + fvid);
			$('body').data('fv_open_modals', fvid);
			$(this).css('z-index', 1090 + (10 * $('body').data('fv_open_modals')));
			$('.modal-backdrop').not('.fv-modal-stack')
				.css('z-index', 1089 + (10 * $('body').data('fv_open_modals')));
			$('.modal-backdrop').not('fv-modal-stack')
				.addClass('fv-modal-stack');
		});
	}

	function show_share_tooltip(event, w, popup_content, position) {
	    w.removeData('qtip');
	    w.qtip({
		    overwrite: false,
		    content: {
			    text: "<div class='social-icons-figure'>" + $(popup_content).html() + "</div>",
		    },
		    show: {
			    event: event.type,
			    ready: true
		    },
		    hide: 'unfocus',
		    style: {
			    classes: 'qtip-download qtip-light qtip-shadow qtip-bootstrap qtip-tsu-figure',
		    },
		    position: position
	    }, event);
	}

    function show_list_tooltip(event, w, popup_content, position) {
        w.removeData('qtip');
        w.qtip({
            overwrite: false,
            content: {
                text: "<div class='download-list-icons-div'>" + $(popup_content).html() + "</div>",
            },
            show: {
                event: event.type,
                ready: true
            },
            hide: 'unfocus',
            style: {
                classes: 'qtip-download qtip-light qtip-shadow qtip-bootstrap qtip-tsu-figure',
            },
            position: position
        }, event);
    }

	$(function() {
		//balanceText($(".balance-text"), { watch: true});
		balanceText();

		$("a[href^='#fig-'], a[href^='#section-']").on("click", function(e) {
			var href = $(this).attr("href");
			scroll_to_div(href, 100);
			e.preventDefault();
			return(false);
		});

		/*
		$(document).bind("mouseup", function(e) {
			var sel = "";
			if (window.getSelection) {
				sel = window.getSelection();
			}
			else if (document.getSelection) {
				sel = document.getSelection();
			}
			else if (document.selection) {
				sel = document.selection.createRange().text;
			}
			if (sel != "") {
				console.log("Selected: " + sel);
			}
		});
		*/

		/*
			FAQ
		*/
		$(".faq-more").on("click", function() {
			var answer = $(this).parent().parent();
			var hidden = $(answer).parent().find(".faq-hidden-more");
			var h2 = $(hidden).find("h2")[0];
			$("div.mask").show();
			$(hidden).removeClass("zoomOut").addClass("zoomIn");
			if ($(hidden).find(".faq-answer").length == 0) {
				$(h2).after($(answer).clone());
				$(hidden).find("p.text-right").each(function() {
					$(this).hide();
				});
			}
			$(hidden).show();
			return(false);
		});
		$(".faq-less").on("click", function() {
			var hidden = $(this).parent().parent();
			scroll_to_div($(hidden).parent().parent(), 100);
			//$(hidden).hide();
			$(hidden).removeClass("zoomIn").hide();
			$("div.mask").hide();
			var b = $(hidden).parent().find(".faq-more")
			$(b).text("Read more");
			return(false);
		});
		$(".faq-close").on("click", function() {
			var hidden = $(this).parent();
			$(hidden).removeClass("zoomIn").addClass("zoomOut").hide();
			$("div.mask").hide();
			return(false);
		});

		/*
			lexicon
		*/
 		$('.glossary').glossarizer({
			sourceURL: '/glossary.json',
			replaceTag: 'a',
			replaceOnce: true,
			callback: function() {
				$("[data-toggle='tooltip']").tooltip({
					html: true,
					container: 'body',
					placement: 'auto',
					trigger: 'hover focus'
				});

				/*
				$(document).on("focusin", "a.glossarizer_replaced", function(event) {
					$(this).trigger("click");
					event.preventDefault();
					return(false);
				});
				$(document).on("keypress", "a.glossarizer_replaced", function(event) {
					if (event.which ==  13) {
						$(this).focus();
						$(this).trigger("click");
						event.preventDefault();
						return(false);
					}
				});

				$(document).on("click focus", "a.glossarizer_replaced", function(event) {
					console.log("e: ", event);
					$(this).removeData('qtip');
					$(this).qtip({
						prerender: true,
						overwrite: false,
						position: {
							target: 'mouse',
							adjust: {
								method: "flip none",
								y: -10,
								mouse: false
							}
						},
						show: {
							//event: event.type,
							event: "click focus",
							ready: true
						},
						hide: 'unfocus',
						style: {
							classes: 'qtip-light qtip-gcis',
							width: "300px"
						},
						events: {
							show: function(event, api) {
								var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
								if (w > 480) {
									api.set({
										"position.at": "top center",
										"position.my": "bottom center",
										//"position.viewport": $(window)
									});
								}
								else {
									api.set({
										"position.at": "center",
										"position.my": "center",
										"position.target": $(window)
									});
								}
							},
							render: function(event, api) {
								$(window).bind('keydown', function(e) {
									if (e.keyCode === 27) { api.hide(e); }
								});
							}
						}
					}, event);
				});
				*/
			}
		});


		/*
			Footnotes
		*/
		$.bigfoot({
			useFootnoteOnlyOnce: false,
			actionOriginalFN: "ignore"
		});

		if (!isMobile.any()) {
			jQuery(".qtip-top").qtip({
				style: {
					classes: 'qtip-light qtip-shadow'
				},
				position: {
					my: 'bottom center',
					at: 'top center'
				}
			});

			jQuery(".qtip-bottom").qtip({
				style: {
					classes: 'qtip-light qtip-shadow'
				},
				position: {
					my: 'top center',
					at: 'bottom center'
				}
			});

			jQuery('.health-tooltip').qtip({
				style: {
					classes: 'qtip-light qtip-shadow qtip-health-report'
				},
				position: {
					my: 'center right',
					at: 'center left'
				}
			});
		}

		hash_in_URL();
	});

    $(document).on("click", "a.confidence", function(event) {
        var w = $(window).outerWidth();
        //var owl_carousel = $(this).closest(".owl-carousel");
        var html = $(this).text();
        var matches = new Array();
        var re = /(.*)/i;
        var la = ["virtually certain", "extremely likely", "very likely", "likely", "about as likely as not", "very unlikely", "extremely unlikely", "exceptionally unlikely"];
        var ca = ["very high confidence", "high confidence", "medium confidence", "low confidence"];
        //
        // html = html.replace(/\s+/gi, " ");
        // matches = html.toLowerCase().match(re);
        //
        // if (!matches) {
        //     matches = html.match(/(.*)/i);
        // }
        // if (matches.length > 0) {
        //     if (matches.length > 2) {
        //         li = la.indexOf(matches[1]);
        //         ci = ca.indexOf(matches[2]);
        //     }
        //     else {
        //         li = la.indexOf(matches[1]);
        //         ci = ca.indexOf(matches[1]);
        //     }
        //
        //     var i = 0;
        //     $("table.likelihood td").each(function() {
        //         $(this).removeClass("hilite");
        //         if (li == i) {
        //             $(this).addClass("hilite");
        //         }
        //         i++;
        //     });
        //
        //     i = 0;
        //     $("table.confidence td").each(function() {
        //         $(this).removeClass("hilite");
        //         if (ci == i) {
        //             $(this).addClass("hilite");
        //         }
        //         i++;
        //     });
        // }

		/*
		 Compute a new width for the tooltip
		 */
        w = (w < 600) ? w*1.5 : 800;
        w += "px";

		/*
			Stop the carousel
		*/
        //$(owl_carousel).trigger("stop.owl.autoplay");

        var qt = $(this).qtip({
            overwrite: false,
            content: {
                button: true,
                text: function(e, api) {
                    return $("#likely-confidence-div").html();
                }
            },
            show: {
                event: event.type,
                ready: true
            },
            hide: 'unfocus',
            style: {
                classes: 'qtip-light qtip-shadow qtip-likely-conf',
                width: w
            },
            position: {
                my: 'center',
                at: 'center',
                target: $(window),
                adjust: {
                    scroll: false
                },
            },
            events: {
                visible: function(e, api) {
					/*
						Stash away the carousel this tooltip points at
					*/
                    var qid = api.get("id");
                    $(".confidence-level-td").matchHeight();
                    //$("#qtip-" + qid).data("owl-carousel", owl_carousel);
                },
                hide: function(event, api) {
                },
                render: function(event, api) {
                    $(window).bind('keydown', function(e) {
                        if(e.keyCode === 27) { api.hide(e); }
                    });
                }
            }
        }, event);
        event.preventDefault();
        return(false);
    })
	.each(function(i) {
		$.attr(this, 'oldtitle', $.attr(this, 'title'));
		$(this).removeAttr('title');
	});

    $(document).on("click", "a.recommended-citation", function(event) {
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var position = {
            my: 'top left',
            at: 'bottom center'
        };

        if (w <= 991) {
            position = {
                my: 'top right',
                at: 'bottom right'
            }
        }
        $(this).qtip({
            overwrite: false,
            content: {
                attr: 'data-title',
            },
            show: {
                event: "click",
                ready: true
            },
            hide: 'unfocus',
            style: {
                classes: 'qtip-light qtip-gcis'
            },
            position: position,
        }, event);
        event.preventDefault();
    });

	/*
		Handle hash tags in the URL
	*/
	function hash_in_URL() {
		var hash;
		if ((hash = window.location.hash) != "") {
			if (hash.indexOf("#fig-") != -1) {
				$(hash).find("a.lightbox").trigger("click");
			}
			else {
				scroll_to_div(hash, 70);
			}
		}
	}
})(jQuery);

/* NCA4 */
$(function() {
    /*
    	Handle the top menu bar
    */
    var waypoint1 = new Waypoint({
		element: document.getElementById("intro-header"),
		handler: function(direction) {
			var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			if (direction == "down") {
				$(".navbar").css({
					"background-color": "rgba(47, 86, 117, 0.9)",
					"box-shadow": "0 1px 5px rgba(0, 0, 0, 0.2)",
					"border-bottom": "1px solid #ccc"
				});
				if (w < 768) {
					$(".nca4-title-mobile").fadeIn("slow");
				}
				else {
					$(".nca4-title").fadeIn("slow");
				}
			}
			else {
				$(".navbar").css({
					"background-color": "rgba(0, 0, 0, 0.5)",	// matches the CSS in site2.css
					"box-shadow": "none",
					"border-bottom": "none"
				});
				if (w < 768) {
					$(".nca4-title-mobile").fadeOut("slow");
				}
				else {
					$(".nca4-title").fadeOut("fast");
				}
			}
		},
		offset: function() {
		  return -this.element.clientHeight;
		}
    });

    /*
    	Show/hide the section navigation
    */
    if (document.getElementById("full-chapter")) {
		var waypoint2 = new Waypoint({
			element: document.getElementById("full-chapter"),
			handler: function(direction) {
				var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				if (w >= 600) {
					if (direction == "down") {
						$("#dot-nav").fadeIn("slow");
					}
					else {
						$("#dot-nav").fadeOut("slow");
					}
				}
			},
			offset: function() {
				return 70;
			}
		});
    }

    /*
    	Buttons in the front page
    */
    $(".intro-header-inner .row .col-sm-6 h2 a").matchHeight({
		byRow: false
    });

    /* Don't think we use Bootstrap tooltips */
    $("[data-toggle='tooltip']").tooltip({
		placement: "left"
    });

    /*
    	Section navigation jumps
    */
    $("#dot-nav ul li a").on("click", function(e) {
		var href = $(this).attr("href");
		if (href.indexOf("#references") !== -1) {
			$(".btn-footnote").trigger("click");
			scroll_to_div("#references", 60);
			return(false);
		}
		if (href.indexOf("#traceable-accounts") !== -1) {
			$(".btn-traceable-accounts").trigger("click");
			scroll_to_div("#traceable-accounts", 60);
			return(false);
		}
		else if (href.substring(0, 1) == "#") {
			scroll_to_div(href, 60);
			return(false);
		}
		else {
			return(true);	// allow propagation
		}
    });

    /* Make Bootstrap dropdown menus slide up and down */
    $('.dropdown-menu').addClass('invisible');
    $('.dropdown').on('show.bs.dropdown', function(e) {
		$('.dropdown-menu').removeClass('invisible');
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });
    $('.dropdown').on('hide.bs.dropdown', function(e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

    $(".section-selector").on("click", function(e) {
		var href = $(this).attr("href");
		if (href == "#executive-summary") {
			$("#full-chapter").hide();
		} else {
			$("#executive-summary").hide();
		}
		$(href).show();
		scroll_to_div(href, 70);
		e.preventDefault();
		return(false);
    });

    /*
		Handle shrinking/expanding of report figures
    */
    $("body").on("click", "a.expand", function(e) {
		var section = $(this).closest("section.md-3");
		var caption = $(section).find("div.caption");
		$(section).removeClass("md-3 small-figure");
		if ($(section).hasClass("faq-figure")) {
			$(section).addClass("big-figure");
		}
		else {
			$(section).addClass("offset-lg-1 col-lg-7 big-figure");
		}
		$(this).removeClass("expand").addClass("shrink").text("SHRINK");
		if ($(section).hasClass("photo")) {
			var caption = $(section).find("div.caption");
			var expanded_caption = $(caption).data("expandedcaption");
			var short_caption = $(caption).html();
			$(caption).html(expanded_caption);
			$(caption).data("shortcaption", short_caption);
		}
		scroll_to_div($(section), 70);
		$(section).hide().slideDown("slow");
		e.preventDefault();
		return(false);
    });

    $("body").on("click", "a.shrink", function(e) {
		var section = $(this).closest("section.big-figure");
		$(section).removeClass("offset-lg-1 col-lg-7 big-figure");
		$(section).addClass("md-3 small-figure");
		$(this).removeClass("shrink").addClass("expand").text("EXPAND");
		if ($(section).hasClass("photo")) {
			var caption = $(section).find("div.caption");
			var short_caption = $(caption).data("shortcaption");
			$(caption).data("expandedcaption", $(caption).html());
			$(caption).html(short_caption);
		}
		scroll_to_div($(section), 100);
		$(section).hide().fadeIn("slow");
		e.preventDefault();
		return(false);
    });

    /*
		Code showing/hiding section navigation
    */
    $(".dot-nav-close").on("click", function(e) {
		if ($("#dot-nav ul li").not(".header").css("display") == "none") {
			$("#dot-nav ul li").not(".header").show();
			$(".dot-nav-close").html('&times;');
			$("#dot-nav").css("transform", "rotate(0deg)");
			$("#dot-nav").css("bottom", "1em");
		}
		else {
			$("#dot-nav").css("transform-origin", "right top");
			var l = $("#dot-nav ul li.header").width();
			$("#dot-nav").css("transform", "rotate(90deg)");
			$("#dot-nav ul li").not(".header").hide();
			$("#dot-nav ul li.header").width(l);
			$(".dot-nav-close").html('+');
		}
		e.preventDefault();
		return(false);
    });

    /* The following is only used in chapter pages */
    $('.btn-footnote').click(function(e) {
		$("div.footnotes").slideToggle("slow", function() {
			if ($("div.footnotes").css("display") == "block") {
				$(".btn-footnote").html("REFERENCES <i class='fas fa-chevron-circle-up'></i>");
				scroll_to_div(".btn-footnote", 60);
			}
			else {
				$(".btn-footnote").html("REFERENCES <i class='fas fa-chevron-circle-down'></i>");
			}
		});
		e.preventDefault();
		return(false);
    });
    $('.btn-traceable-accounts').click(function(e) {
		$("div.traceable-accounts").slideToggle("slow", function() {
			if ($("div.traceable-accounts").css("display") == "block") {
				$(".btn-traceable-accounts").html("TRACEABLE ACCOUNTS <i class='fas fa-chevron-circle-up'></i>");
				scroll_to_div(".btn-traceable-accounts", 60);
			}
			else {
				$(".btn-traceable-accounts").html("TRACEABLE ACCOUNTS <i class='fas fa-chevron-circle-down'></i>");
			}
		});
		e.preventDefault();
		return(false);
    });

    /*
		Show/hide a chapter's executive summary
    */
    $("#view-executive-summary button").click(function(e) {
		$("#executive-summary").slideToggle("slow", function() {
			Waypoint.refreshAll();
			if ($("#executive-summary").css("display") == "block") {
				$("#view-executive-summary button").html("HIDE THE EXECUTIVE SUMMARY <i class='fas fa-chevron-up'></i>");
				scroll_to_div("#executive-summary", 70);
			}
			else {
				$("#view-executive-summary button").html("VIEW THE EXECUTIVE SUMMARY <i class='fas fa-chevron-down'></i>");
				scroll_to_div("#full-chapter", 70);
			}
			$("#dot-nav").show();
		});
		e.preventDefault();
		return(false);
    });

    $("#hide-executive-summary button").click(function(e) {
		$("#executive-summary").hide("slow", function() {
			Waypoint.refreshAll();
			$("#view-executive-summary button").html("VIEW THE EXECUTIVE SUMMARY <i class='fas fa-chevron-down'></i>");
			scroll_to_div("#full-chapter", 70);
		});
		e.preventDefault();
		return(false);
    });

    /*
		The second element is the Executive Summary
    */
    $("#dot-nav ul li:nth-of-type(2) a").click(function(e) {
		$("#executive-summary").slideDown(0, function() {
			$("#view-executive-summary button").html("HIDE THE EXECUTIVE SUMMARY <i class='fas fa-chevron-up'></i>");
			scroll_to_div($("#executive-summary"), 70);
		});
		e.preventDefault();
		return(false);
    });

	/*
		Key messages slider
	*/
	$("#slick-carousel").slick({
		infinite: true,		// enable wrap-around
		autoplay: false,
		accessibility: true,
		arrows: true,
		dots: true,
		slidesToShow: 1,
		fade: false,		// fade instead of slide
	});

	/*
		Handle external links

		Can't seem to combine the 2 selectors...
	*/
    $("a[href^='http://']:not([href*='globalchange.gov'])").on("click", function(event) {
		external_link_modal(this.href);
		event.preventDefault();
		return(false);
	});
    $("a[href^='https://']:not([href*='globalchange.gov'])").on("click", function(event) {
		external_link_modal(this.href);
		event.preventDefault();
		return(false);
	});
});

function external_link_modal(href) {
	modalSeconds = 11;
	modalCountdown(href);
	$("#modal-external-link").modal({
		backdrop: !IE8,
		keyboard: true
	});
	$("#modal-external-link .modal-footer .btn-go").off("click");
	$("#modal-external-link .modal-footer .btn-stay").off("click");
	$("#modal-external-link .modal-footer .btn-go").click(href, function(event) {
		modalCountdownCancel();
		window.open(event.data, "_blank");
	});
	$("#modal-external-link .modal-footer .btn-stay").click(href, function(event) {
		modalCountdownCancel();
	});
}

function modalCountdown(href) {
	if (--modalSeconds > 0) {
		$("#modal-external-link .modal-body").html("You will exit the National CLimate Assessment web site in " +  modalSeconds + " seconds and will be re-directed to the following site:<br><br>" + href.substring(0, 79) + (href.length > 79 ? "..." : ""));
		modalTimeoutID = setTimeout(modalCountdown, 1000, href);
	}
	else if (modalTimeoutID != -1) {
		$("#modal-external-link").modal("hide");
		window.open(href, "_blank");
	}
}

function modalCountdownCancel() {
	modalSeconds = 0;
	clearTimeout(modalTimeoutID);
	modalTimeoutID = -1;
}
