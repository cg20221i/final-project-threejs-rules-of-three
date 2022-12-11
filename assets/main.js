/**
 * This is an Immediately-Invoked Function Expression to contain and scope
 * all the JavaScript used, except for select functions,
 * which are returned at the end as public methods.
 *
 * Read more about it here:
 * https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript
 *
 * As a general rule, all function/method names that are limited to it and
 * private are prefixed with an underscore (_)
 */
var aframeInteractions = (function(){


  // the showShadows variable is set in the HTML head, and if it is true,
  // we're going to use visible shadows instead of (almost) invisible ones
  var _shadowOpacity = 0.2;
  if( !showShadows )
    _shadowOpacity = 0.0012;



  /* * * * * * * * * * * * AFRAME COMPONENT EXTENSIONS * * * * * * * * * * * * * */



  /**
   * Switches Rooms, which right now is switching html files,
   * because I ran out of time to program them into a single application
   */
  AFRAME.registerComponent('framechange-click-handler', {
    init: function () {

      this.el.addEventListener('mousedown', function () {
        var fileTraget = this.getAttribute('framechange-click-handler')
        var camera            = document.getElementById('camera');
        var frameBlendOverlay = document.querySelector('.frame-blend-overlay');

        camera.setAttribute("animation", "property: camera.zoom; from: 0.8; to: 2; dur: 350;");
        frameBlendOverlay.classList.add('this--visible');

        setTimeout(function(){
          window.location.href = fileTraget;
        }, 175);

      }); // end addEventListener mousedown
    } // end init
  });




  /**
   * Helper function for the Custom Desktop size component defined below
   * Allows for different geometry (ie POI size) on Desktop
   */
  var _handle_desktop_geometry = function( passed_el ){
    // caches the mobile and desktop geometroies
    var desktop_geometry = passed_el.getAttribute('desktop-geometry');
    var regular_geometry = passed_el.getAttribute('geometry');

    // gets window width
    var window_width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    // if a desktop style is detected, apply the desktop geometry
    if( window_width >= 768 ){
      passed_el.setAttribute('geometry', desktop_geometry);
    }else{
      passed_el.setAttribute('geometry', regular_geometry);
    }
  };



  /**
   * This custom component allows for a different size POI on a certain
   * screen size (defined in the helper function above)
   * That way we can have larger icons on mobile than on desktop,
   * or something similar!
   */
  AFRAME.registerComponent('desktop-geometry', {
    schema: {
      radius: {type: 'string', default: ''},
      primitive: {type: 'string', default: ''},
    },
    init: function () {
      _handle_desktop_geometry( this.el );
    }
  });



  /**
   * This custom Component is responsible for allowing the use
   * of transparent PNGs in images with the ability to see through the items
   */
  AFRAME.registerComponent('alpha-test', {
    dependencies: ['material'],
    init: function () {
      this.el.getObject3D('mesh').material.alphaTest = 0.5;
    }
  });



  /**
   * Any Element with the shadow-material will not be visible,
   * but WILL catch a shadow.
   * Used for matte-boxing!
   */
  AFRAME.registerComponent('shadow-material', {
    init: function(){
      let el = this.el;
      let self = this;
      let mesh = el.getObject3D('mesh');
      if (!mesh){return;}
      mesh.material = new THREE.ShadowMaterial();
      mesh.material.opacity = _shadowOpacity;
    }
  });



  /**
   * Helper function that assits in
   * zooming with the mousewheel and pinch to zoom
   */
  var _cameraZoomAdjustment = function( modifier ){

    // fetches the camera and its original `camera`` attribute
    var camera = document.getElementById("camera");
    var initialCameraConfig = camera.getAttribute('camera');

    // modifies the camera attribute by the zoom factor
    // and writes it back to the camer
    initialCameraConfig.zoom = initialCameraConfig.zoom + modifier;

    if( initialCameraConfig.zoom > 0.44 && initialCameraConfig.zoom < 3 ){
      camera.setAttribute('camera', initialCameraConfig);
    }
  };



  /**
   * Determins if scrolled forward or backward
   * scroll listening code below adapted from
   * https://www.sitepoint.com/html5-javascript-mouse-wheel/
   */
  function _mouseWheelHandler(e) {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    // adjusts the camera zoom by the delta,
    // either + or - 1
    _cameraZoomAdjustment( delta*0.01 );

    return false;
  }



  /**
   * cross-browser scroll listeners
   */
  if (document.addEventListener) {
    // IE9, Chrome, Safari, Opera
    document.addEventListener("mousewheel", _mouseWheelHandler, false);
    // Firefox
    document.addEventListener("DOMMouseScroll", _mouseWheelHandler, false);
  }
  // IE 6/7/8
  else document.attachEvent("onmousewheel", _mouseWheelHandler);



  /**
   * pinch to zoom end event
   */
  document.addEventListener('gestureend', function(e) {
    if (e.scale < 1.0) {
      // User moved fingers closer together
      // alert('zoom out');
      _cameraZoomAdjustment( -0.15 );

    } else if (e.scale > 1.0) {
      // User moved fingers further apart
      // alert('zoom in');
      _cameraZoomAdjustment( 0.15 );
    }
  }, false);



  /**
   * pinch to zoom change event
   */
  document.addEventListener('gesturechange', function(e) {
    // 1-e.scale, because everything smaller than one should be treated as negaive
    // then the whole thing is revered again, and made smaller and fed to the same
    _cameraZoomAdjustment( -( (1-e.scale)*0.1) );
  }, false);



  /**
   * Switches the T-Shirt Design on Button Click
   */
  var tshirtchanger = function(){

    document.querySelectorAll('.material_switcher').forEach(item => {
      item.addEventListener('click', event => {

        // change active class
        document.querySelector(".material_switcher.this--active").classList.remove("this--active");
        item.classList.add("this--active");

        // determine which outfit was selected
        var outfit = item.getAttribute("data-outfitid");
        console.log(outfit);

        // change the outfit(s) :D
        document.getElementById("tshirty").setAttribute("material", "src: #"+outfit);
        document.getElementById("tshirtf").setAttribute("material", "src: #"+outfit);
        document.getElementById("tshirtt").setAttribute("material", "src: #"+outfit);
      })
    });


    document.querySelectorAll('.type_switcher').forEach(item => {
      item.addEventListener('click', event => {

        // change active class
        document.querySelector(".type_switcher.this--active").classList.remove("this--active");
        item.classList.add("this--active");

        // determine which outfit was selected
        var shotfittype = item.getAttribute("data-shotfittype");
        // console.log(shotfittype);

        // change the Body Type!!! :D'
        if(shotfittype == 'tshirty'){
          document.getElementById("tshirty").setAttribute("scale", "3 3 3");
          document.getElementById("tshirtf").setAttribute("scale", "0 0 0");
          document.getElementById("tshirtt").setAttribute("scale", "0.2 0.2 0.2");
        }else{
          document.getElementById("tshirtf").setAttribute("scale", "3 3 3");
          document.getElementById("tshirty").setAttribute("scale", "0 0 0");
          document.getElementById("tshirtt").setAttribute("scale", "0.2 0.2 0.2");
        }

      })
    });


  };



  /**
   * Executes all the code that needs to run right away
   */
  var init = function(){
    tshirtchanger();
  };


 /**
  * Any JavaScript needed outside this object
  * is returned as a public method
  */
  return{
    init: init
  };

})();