// I would like to apologize for this horribly oranized, super WET code.
// My only excuse is that I had to learn an EXTREMELY COMPLEX library, and make TWO rooms in less than 48 hours.
// So there you have it, enjoy!

var allCustomAnimationsHelper = {

  updateHTMLDialogText: function( input ){
    var title   = document.querySelector(".dialogue__headline");
    var content = document.querySelector(".dialogue__content");
    title.innerHTML = dialogueInformation[input].title;
    content.innerHTML = dialogueInformation[input].content;
  },

  closeAllOthers: function( input ){
    //Checks which animation was called, and foce-closes all others
    if(input != 'curtain')
      allCustomAnimationsHelper.curtain(true);
    if(input != 'headphones')
      allCustomAnimationsHelper.headphones(true);
    if(input != 'headboard')
      allCustomAnimationsHelper.headboard(true);
    if(input != 'clothes_drawer')
      allCustomAnimationsHelper.clothes_drawer(true);
    if(input != 'lighting')
      allCustomAnimationsHelper.lighting(true);
  },


  // clothes_drawer: function( forceClose ){
  //   var drawer   = document.getElementById("clothes-drawer");
  //   var drawer_2 = document.getElementById("clothes-drawer-2");
  //   var poi      = document.getElementById("clothes-drawer-poi");

  //   // opening animation and dialogue activation
  //   var _set = function(){
  //     drawer.setAttribute("animation", "property: position; to: -8.25 -8.824 4.917; delay: 100; dur: 500; easing: easeOutQuad; loop: false");
  //     drawer_2.setAttribute("animation", "property: position; to: 0.15 0 -5.141; dur: 610; easing: easeOutQuad; loop: false");
  //     drawer.classList.add('this--open');
  //     poi.setAttribute("visible", "false");

  //     setTimeout(function( ){
  //       toggleDialoge( drawer.getAttribute('animation-click-handler') );
  //     }, 200);
  //   };

  //   // hides dialoge and resets animation
  //   var _unset = function(){
  //     drawer.setAttribute("animation", "property: position; to: -9.679 -8.824 4.917; dur: 500; easing: easeOutQuad; loop: false");
  //     drawer_2.setAttribute("animation", "property: position; to: 0 0 -5.141; dur: 500; easing: easeOutQuad; loop: false");
  //     drawer.classList.remove('this--open');
  //     poi.setAttribute("visible", "true");

  //   };

  //   // if we received the request to force-close
  //   if( forceClose ){
  //     _unset();
  //   }
  //   // otherwise proceed with regular logic
  //   else{
  //     if( !drawer.classList.contains('this--open') ){
  //       _set();
  //     }else{
  //       _unset();
  //     }
  //   }
  // },

  // curtain: function( forceClose ){
  //   var drawer   = document.getElementById("curtain");
  //   var poi      = document.getElementById("curtain-poi");

  //   // opening animation and dialogue activation
  //   var _set = function(){
  //     // console.log('not open')
  //     drawer.setAttribute("animation", "property: position; to: -5.834 0.178 0.529; dur: 500; easing: easeOutQuad; loop: false");
  //     drawer.setAttribute("animation__2", "property: scale; to: 1.66 1 1; dur: 500; easing: easeOutQuad; loop: false");
  //     drawer.classList.add('this--open');
  //     poi.setAttribute("visible", "false");

  //     setTimeout(function( ){
  //       toggleDialoge( drawer.getAttribute('animation-click-handler') );
  //     }, 200);
  //   };

  //   // hides dialoge and resets animation
  //   var _unset = function(){
  //     drawer.setAttribute("animation", "property: position; to: -5.834 0.178 -1.029; dur: 500; easing: easeOutQuad; loop: false");
  //     drawer.setAttribute("animation__2", "property: scale; to: 1 1 1; dur: 500; easing: easeOutQuad; loop: false");
  //     drawer.classList.remove('this--open');
  //     poi.setAttribute("visible", "true");
  //   };

  //   // if we received the request to force-close
  //   if( forceClose ){
  //     _unset();
  //   }
  //   // otherwise proceed with regular logic
  //   else{
  //     if( !drawer.classList.contains('this--open') ){
  //       _set();
  //     }else{
  //       _unset();
  //     }
  //   }
  // },

  // headphones: function( forceClose ){
  //   var drawer   = document.getElementById("headphones");
  //   var poi      = document.getElementById("headphones-poi");


  //   // opening animation and dialogue activation
  //   var _set = function(){
  //     drawer.classList.add('this--open');

  //     setTimeout(function( ){
  //       toggleDialoge( drawer.getAttribute('animation-click-handler') );
  //     }, 20);
  //   };

  //   // hides dialoge and resets animation
  //   var _unset = function(){
  //     drawer.classList.remove('this--open');
  //   };

  //   // if we received the request to force-close
  //   if( forceClose ){
  //     _unset();
  //   }
  //   // otherwise proceed with regular logic
  //   else{
  //     if( !drawer.classList.contains('this--open') ){
  //       _set();
  //     }else{
  //       _unset();
  //     }
  //   }
  // },

  // lighting: function( forceClose ){
  //   var drawer   = document.getElementById("lighting");

  //   // opening animation and dialogue activation
  //   var _set = function(){
  //     drawer.classList.add('this--open');

  //     setTimeout(function( ){
  //       toggleDialoge( drawer.getAttribute('animation-click-handler') );
  //     }, 20);
  //   };

  //   // hides dialoge and resets animation
  //   var _unset = function(){
  //     drawer.classList.remove('this--open');
  //   };

  //   // if we received the request to force-close
  //   if( forceClose ){
  //     _unset();
  //   }
  //   // otherwise proceed with regular logic
  //   else{
  //     if( !drawer.classList.contains('this--open') ){
  //       _set();
  //     }else{
  //       _unset();
  //     }
  //   }
  // },

  // headboard: function( forceClose ){
  //   var drawer   = document.getElementById("headboard");
  //   var poi      = document.getElementById("headboard-poi");

  //   // opening animation and dialogue activation
  //   var _set = function(){
  //     drawer.classList.add('this--open');

  //     setTimeout(function( ){
  //       toggleDialoge( drawer.getAttribute('animation-click-handler') );
  //     }, 20);    };

  //   // hides dialoge and resets animation
  //   var _unset = function(){
  //     drawer.classList.remove('this--open');
  //   };

  //   // if we received the request to force-close
  //   if( forceClose ){
  //     _unset();
  //   }
  //   // otherwise proceed with regular logic
  //   else{
  //     if( !drawer.classList.contains('this--open') ){
  //       _set();
  //     }else{
  //       _unset();
  //     }
  //   }
  // },


};






/**
 * If an animation-click-handler is clicked,
 * run the animation with that attribute's name
 * reset all others with that name
 * and update the dialogue in case it gets clickeded
 */
AFRAME.registerComponent('animation-click-handler', {
  init: function () {

    this.el.addEventListener('mouseenter', function () {
      console.log('droidbishop');
    }); // end addEventListener mouseenter


    this.el.addEventListener('mousedown', function () {
      console.log('click');

      // calls the animation with the name that was passed from the
      allCustomAnimationsHelper[ this.getAttribute('animation-click-handler') ]();
      allCustomAnimationsHelper.closeAllOthers( this.getAttribute('animation-click-handler') );
      allCustomAnimationsHelper.updateHTMLDialogText( this.getAttribute('animation-click-handler') );

    }); // end addEventListener mousedown
  } // end init
});




/**
 * Switches Rooms, which right now is switching html files,
 * because I ran out of time to program them into a single application
 */
AFRAME.registerComponent('framechange-click-handler', {
  init: function () {

    this.el.addEventListener('mouseenter', function () {
      console.log('switch rooms!');
    }); // end addEventListener mouseenter


    this.el.addEventListener('mousedown', function () {
      console.log('click');
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



AFRAME.registerComponent('dialog-more-button', {
  init: function () {
    this.el.addEventListener('mousedown', function () {
      toggleDialoge( this.getAttribute('dialog-more-button') );
    });
  }
});



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
    mesh.material.opacity = 0.15;
  }
});


var toggleDialoge = function( input ){
  if( document.querySelector(".dialogue").classList.contains('this--visible') ){
    document.querySelector(".dialogue").classList.remove('this--visible');
    // also reset all animations
    allCustomAnimationsHelper.closeAllOthers( false );
  }else{
    document.querySelector(".dialogue").classList.add('this--visible');
  }
  // sorry buddy, you were nice too
  // document.querySelector(".dialogue").classList.toggle('this--visible');
};


var el = document.querySelector(".dialogue__closer");
console.log(el);
document.querySelector(".dialogue__closer").addEventListener('click', function(){
  toggleDialoge();
});
