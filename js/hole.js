jQuery(function($) { 
    $.fn.hole = function(options) {
      var $this = this;
      var settings = $.extend({
        x: 0,
        y: 0,
        r: 10,
        color: $(this).parent().css('background-color'),
      }, options );
      this.currentHole = {};
      var giveXY = function(radius, hole_radius, coordinate_x, coordinate_y){
        var coordinates = {};
        coordinates.x = -radius-(hole_radius/2)+coordinate_x;
        coordinates.y = -radius-(hole_radius/2)+coordinate_y
        return coordinates;
      }
      this.init = function(){
        //append empty div inside element to create hole
        this.append("<div class=\"hole\"></div>");
        var thishole = this.find(".hole");
        var parent = this;
        //calculate outer radius by width and height of parent
        this.outer_radius = Math.pow(Math.pow(parent.width(),2)+Math.pow(parent.height(),2),0.5);
        var coordinates = giveXY(this.outer_radius, settings.r, settings.x, settings.y);
        thishole.css({
          'left':coordinates.x,
          'top':coordinates.y,
          'width':settings.r,
          'height':settings.r,
          'border-width':this.outer_radius+'px',
          'border-type':'solid',
        })
        return {x:Math.round(coordinates.x+this.outer_radius+settings.r/2), y:Math.round(coordinates.y+this.outer_radius+settings.r/2), r:settings.r};
      }
      this.changeHole = function(opt){
        var defaults = $.extend({
          delay:0,
        }, opt)
        var thishole = this.find('.hole');
        var coordinates = giveXY(this.outer_radius, opt.r, opt.x, opt.y);
        setTimeout(function(){
          $($this).attr('data-hole-x',coordinates.x);
          $($this).attr('data-hole-y',coordinates.y);
          thishole.css({
            'transition':'1s',
            'left':coordinates.x,
            'top':coordinates.y,
            'width':opt.r,
            'height':opt.r,
            'border-width':this.outer_radius+'px',
            'border-type':'solid',
          })
        }, opt.delay)
        this.currentHole = {x:Math.round(coordinates.x+this.outer_radius+opt.r/2), y:Math.round(coordinates.y+this.outer_radius+opt.r/2), r:opt.r};
        return this;
      }
      this.currentHole = this.init();
      return this;
    }
  });
  $(document).ready(function(){
    var parent = $('.outer');
    holed = $('.outer').hole({
      x: parent.width()/2,
      y: parent.height()/2,
      r: pythagoras(parent.width(),parent.height())
    })
  })


  /*$.fn.hole = function(options) {
    var settings = $.extend({},$.fn.hole.defaults, options );
    $.fn.hole.defaults = {
      x: 0,
      y: 0,
      r: 10
    };
    defaults = $.fn.hole.defaults;
    this.append("<div></div>");
    var hole = this.find("div").addClass("hole");
    var parent = this;
    var outer_radius = Math.pow(Math.pow(parent.width(),2)+Math.pow(parent.height(),2),0.5);
    hole.css({
      'left':-outer_radius-(defaults.r/2)+defaults.x,
      'top':-outer_radius-(defaults.r/2)+defaults.y,
      'width':defaults.r,
      'height':defaults.r,
      'border':outer_radius+'px solid blue'
    })
    
    return hole;
  };
  $(document).ready(function(){
    var holed = $('.outer').hole({
      x: 150,
      y: 10,
      r: 50
    });
  })*/

  Number.prototype.round = function(precision){
    return Math.round(this*Math.pow(10,precision))/Math.pow(10,precision);
  }
  var pythagoras = function(w,h){
    return Math.pow(Math.pow(w,2)+Math.pow(h,2),0.5);
  }