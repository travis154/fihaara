/* ========================================================================
 * Copyright 2014 Iulogy.
 * Use it however you want.
 * It follows bootstrap & jquery standards. http://learn.jquery.com/plugins/advanced-plugin-concepts/
 * ======================================================================== */


	+function ($) {
	'use strict';

	// EXTENDER PUBLIC CLASS DEFINITION
	// ==============================

	var Extender = function (element, options) {
		this.el  = $(element)
		this.options   = $.extend({}, Extender.DEFAULTS, options)
		this.templates = this.el.find("[data-role=extender-templates]");
		this.labels = this.el.find("[data-role=extender-labels]");
		this.content = this.el.find("[data-role=extender-content]");
		
		var self = this.el
		var templates = this.templates
		var content = this.content
		
		if(!this.templates.length){
			return;
		}
		this.labels.on('click.iulogy.bs.extenter.data-api', '> small', function(){
			var small = $(this);
			var template = small.data().template;
			var appendTarget = small.data().append;
			$(appendTarget||content).append(templates.find("[data-template="+template+"]").html());
			small.off();
			small.remove();
		});
	}

	Extender.DEFAULTS = {
	}

	

	// EXTENDER PLUGIN DEFINITION
	// ========================

	var old = $.fn.extender

	$.fn.extender = function (option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('iulogy.bs.extender')
			var options = typeof option == 'object' && option

			if (!data) {
				$this.data('iulogy.bs.extender', (data = new Extender(this, options)))
			}

		})
	}

	$.fn.extender.Constructor = Extender


	// EXTENDER NO CONFLICT
	// ==================

	$.fn.extender.noConflict = function () {
		$.fn.extender = old
		return this
	}


  // EXTENDER DATA-API
  // ===============
	$(window).on('load', function(){
		$('.extender').each(function(){
			var self = $(this);
			self.extender(self.data());
		});
	});

}(jQuery);
