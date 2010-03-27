(function($) {
  $.fn.item = function(json) {
    var self = this;
    return {
      chain: function(options) {
        this.bind(self, json, options);
      },
      bind: function(ele, obj, options) {
        var self = this;
        for (var prop in obj) {
					if (options && typeof(options[prop]) == "function") {
						options[prop].call(this, ele, obj[prop]);
						continue;
					}
          ele.find("." + prop).each(function() {
            var match = $(this);
            if (match.hasClass('_chain')) return;
            if (match.hasClass('parent')) {
              if (obj[prop] instanceof Array) {
                for (var i = 0; i < obj[prop].length; i++) {
                  var newEl = $(match.find(".item")[0]).clone();
									newEl.find("[id]").each(function() {
										var self = $(this);
										var old = self.attr("id");
										var newId = old + i;
										self.attr("id", newId);
									});
                  match.append(newEl);
                  self.bind(newEl, obj[prop][i]);
                  newEl.addClass("_chain");
                  newEl.show();
                }
                return;
              }
              if (obj[prop] instanceof Object) {
                self.bind(match, obj[prop]);
                match.addClass("_chain");
                return;
              }
              self.bindString(match, obj[prop]);
              match.addClass("_chain");
              return;
            }
            self.bindString(match, obj[prop]);
            match.addClass("_chain");
          });
        }
      },
      bindString: function(match, obj) {
        if (match.filter('input').length) {
          match.val(obj);
          return;
        }
        if (match.filter('a').length) {
          match.attr("href", obj);
          match.text(obj);
          return;
        }
        if (match.filter('select').length) {
          match.find("option[value='" + obj + "']").attr("selected", "true");
          return;
        }
        match.html(obj);
      }
    }
  };
})(jQuery);