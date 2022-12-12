
var aframeInteractions = (function(){



  var _shadowOpacity = 0.2;
  if( !showShadows )
    _shadowOpacity = 0.0012;

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
   * different size component
   * screen size
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
   * responsible component
   * transparant PNG
   */
  AFRAME.registerComponent('alpha-test', {
    dependencies: ['material'],
    init: function () {
      this.el.getObject3D('mesh').material.alphaTest = 0.5;
    }
  });
  /**
   not visible element catch by a shadow
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
   * zoom with mouse and arrow
   */
  var _cameraZoomAdjustment = function( modifier ){
    var camera = document.getElementById("camera");
    var initialCameraConfig = camera.getAttribute('camera');
    // back to camera
    initialCameraConfig.zoom = initialCameraConfig.zoom + modifier;

    if( initialCameraConfig.zoom > 0.44 && initialCameraConfig.zoom < 3 ){
      camera.setAttribute('camera', initialCameraConfig);
    }
  };
  /**
   * Determins if scrolled forward or backward
   */
  function _mouseWheelHandler(e) {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    //adjust camera
    _cameraZoomAdjustment( delta*0.01 );

    return false;
  }
  if (document.addEventListener) {

    document.addEventListener("mousewheel", _mouseWheelHandler, false);
    
    document.addEventListener("DOMMouseScroll", _mouseWheelHandler, false);
  }
  
  else document.attachEvent("onmousewheel", _mouseWheelHandler);

  /* pinch to zoom end */
  document.addEventListener('gestureend', function(e) {
    if (e.scale < 1.0) { //to zoom out
      _cameraZoomAdjustment( -0.15 );

    } else if (e.scale > 1.0) { // to zoom in
      _cameraZoomAdjustment( 0.15 );
    }
  }, false);

  /* pinch to zoom change event */
  document.addEventListener('gesturechange', function(e) {
    // 1-e.scale, because everything smaller than one should be treated as negaive
    // then the whole thing is revered again, and made smaller and fed to the same
    _cameraZoomAdjustment( -( (1-e.scale)*0.1) );
  }, false);

  /** Switches the T-Shirt Design on Button Click */
  var tshirtchanger = function(){

    document.querySelectorAll('.material_switcher').forEach(item => {
      item.addEventListener('click', event => {

        document.querySelector(".material_switcher.this--active").classList.remove("this--active");
        item.classList.add("this--active");

        var outfit = item.getAttribute("data-outfitid");
        console.log(outfit);

        document.getElementById("tshirty").setAttribute("material", "src: #"+outfit);
        document.getElementById("tshirtf").setAttribute("material", "src: #"+outfit);
        // document.getElementById("tshirtt").setAttribute("material", "src: #"+outfit);
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
          // document.getElementById("tshirtt").setAttribute("scale", "0.2 0.2 0.2");
        }else{
          document.getElementById("tshirtf").setAttribute("scale", "3 3 3");
          document.getElementById("tshirty").setAttribute("scale", "0 0 0");
          // document.getElementById("tshirtt").setAttribute("scale", "0.2 0.2 0.2");
        }
      })
    });
  };

  /* Executes all the code */
  var init = function(){
    tshirtchanger();
  };
  return{
    init: init
  };

})();