define(["dojo/topic"], function(topic) {
   /*
   * Custom Javascript to be executed while the application is initializing goes here
   */

   // The application is ready
   topic.subscribe("tpl-ready", function(){
      /*
      * Custom Javascript to be executed when the application is ready goes here
      */

      var slLayer = app.map.getLayer(app.data.getShortlistLayerId());

      function hideFirstTabLocationMarkers(){
         for (var i=0; i<slLayer.graphics.length; i++){
            if (slLayer.graphics[i].attributes.tab_id == 0)
               slLayer.graphics[i].hide();
         }
      }

      if (slLayer.updating)
         slLayer.on("update-end", hideFirstTabLocationMarkers);
      else
         hideFirstTabLocationMarkers();

      // (DESKTOP) Everytime the Overview tab is clicked, hide the location markers
      $('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs').click(function(event) {
         console.log($(event.target));

         if ($(event.target).is('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1)'))
            hideFirstTabLocationMarkers();
         else if ($(event.target).is('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1) > .entryLbl'))
            hideFirstTabLocationMarkers();
      });

      // (MOBILE) Everytime the Overview tab is clicked, hide the location markers
      $('#mobileThemeBar').click(function(event) {
         //console.log($(event.target));

         if ($(event.target).is('#mobileThemeBar > #navThemeLeft'))
            hideFirstTabLocationMarkers();
         else if ($(event.target).is('#mobileThemeBar > #navThemeLeft > div.detail-btn.ion-chevron-left'))
            hideFirstTabLocationMarkers();
         else if ($(event.target).is('#mobileThemeBar > #navThemeLeft > div.detail-btn.ion-chevron-left::before'))
            hideFirstTabLocationMarkers();
      });

   });
});