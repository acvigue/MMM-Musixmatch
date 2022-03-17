'use strict';

Module.register('MMM-Musixmatch', {

  // default values
  defaults: {
    // Module misc
    name: 'MMM-Musixmatch',
    hidden: false,

    // user definable
    updatesEvery: 1,          // How often should the table be updated in s?
    showCoverArt: true       // Do you want the cover art to be displayed?
  },


  start: function () {
    Log.info('Starting module: ' + this.name );
    this.updateDom();

    this.subElements = [];
  },

  getDom: function () {
    //console.log(context);
    var wpr = document.createElement("div");
    this.subElements = [];

    wpr.style="z-index: 400; max-height: 200px; overflow: scroll;";
    const context = Window.npos.context;

    if(context.noSong == false && context.mxmError == "" && context.subs.length > 0) {
      for(const [i,sub] of context.subs.entries()) {
        var line = document.createElement("p");
        line.style="";
        line.className = (i == 0) ? "light roboto medium bold" : "dimmed roboto medium";
        line.innerHTML = sub.text;
        wpr.appendChild(line);
        this.subElements.push(line);
      }
    }
  
		return wpr;
  },

  notificationReceived: function(notification, payload, sender) {
    if(notification == "SUB_UPDATE") {
      this.updateDom();
      try {
        this.subElements[0].scrollIntoView()
      } catch(e) {

      }
    }

    if(notification == "MM_UPDATE") {
      console.log("update rcvd");
      for(const sub of this.subElements) {
        sub.className = "roboto dimmed medium";
      }
      let sub = this.subElements[Window.npos.context.lindex];
      sub.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      sub.className = "roboto light medium bold";
    }
  }
});
