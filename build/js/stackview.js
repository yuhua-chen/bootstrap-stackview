+function ($) {
	'use strict';

	// Stack View Class Definition
	// ===========================

	var StackView = function (element, options) {
		this.$element    = $(element)
		this.$views      = this.$element.children()
		this.options     = options
		this.interval    = options.interval
		this.$toggle     = $(options.toggle)
		this.currentIndex = 0
		this.$active     = this.$views.eq(this.currentIndex)

		this.updateBreadcumb("push")
	}

	StackView.DEFAULTS = {
		interval: 600
	}

	StackView.prototype.getCurrentIndex = function () {
		return this.currentIndex
	}

	StackView.prototype.push = function() {
		if (this.currentIndex==this.$views.length-1) return
		return this.action('push')
	}

	StackView.prototype.pop = function() {
		if (this.currentIndex==0) return
		return this.action('pop')
	}

	StackView.prototype.action = function(type) {
		if (type=='push') {
			this.currentIndex++;
			this.$active = this.$views.eq(this.currentIndex).animate( {left:0}, this.interval);
		} else if (type == 'pop') {
			this.$active = this.$views.eq(this.currentIndex).animate( {left:'100%'}, this.interval);
			this.currentIndex--;
		}

		this.updateBreadcumb(type)

		var e = $.Event('action.cyh.stackview', { relatedTarget: this.$active, action:type })
    	this.$element.trigger(e)
    	if (e.isDefaultPrevented()) return

		return this
	}

	StackView.prototype.updateBreadcumb = function (type) {
		if (type=='push') {
			this.$toggle.children().last().removeClass('active').end().end().append('<li class="active">'+this.$active.data('title')+'</li>')
		} else {
			this.$toggle.children().last().remove().prev().addClass('active')
		}
	}

	// Stack View Plugin Definition
	// ============================

	$.fn.stackview = function (option) {
		return this.each(function() {
			var $this   = $(this)
			var data    = $this.data('cyh.stackview')
			var options = $.extend({}, StackView.DEFAULTS, $this.data(), typeof option == 'object' && option)
			var action  = typeof option == 'string' ? option : options.action

			if (!data) $this.data('cyh.stackview', (data = new StackView(this, options)))
			if (action) data[action]()
		})
	}

	$.fn.carousel.Constructor = StackView

	// StackView Data-API
	// ==================

	$(document).on('click.cyh.stackview.data-api', '[data-action]', function (e) {
		var $this   = $(this), href
		var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
		var options = $.extend({}, $target.data(), $this.data())		
		$target.stackview(options)

		e.preventDefault()
	})

}(jQuery);

