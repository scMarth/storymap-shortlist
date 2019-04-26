define(["dojo/topic"], function(topic) {
/*
* Custom Javascript to be executed while the application is initializing goes here
*/

   // The application is ready
   topic.subscribe("tpl-ready", function(){
      /*
      * Custom Javascript to be executed when the application is ready goes here
      */

      /*****************************************************************
      * Keyboard Navigation
      *****************************************************************/

      document.onkeydown = processKey;

      function detailBtnsVisible(){
         var detailContainers = $('#paneLeft > div.detailContainer');
         var result = false;
         var prefixStr = '#paneLeft > div.detailContainer:nth-child(';
         var suffixStr = ')';

         // Check all detailContainers (the elements that contain the buttons) for each tab
         // if at least one is visible (i.e. not 'none') then that means buttons are visible
         for (var i=1; i<=detailContainers.length; i++){
            var selector = prefixStr + i + suffixStr; // Construct the selector
            var current = $(selector); // Use the selector to select the current detailContainer

            if (!(current)) continue; // Continue if it's undefined
            if (current.css('display') == 'block') result = true;
         }
         return result;
      }

      function processKey(e){
         e = e || window.event;

         var themeIndex = $('.entry.active').index();

         if (e.keyCode == '38') {
            // Up Arrow
            return;
         }
         else if (e.keyCode == '40') {
            // Down Arrow
            return;
         }
         else if (e.keyCode == '37') {
            // Left Arrow

            if (detailBtnsVisible()){
               $('#paneLeft > div.detailContainer').find($('.detail-btn-left')[themeIndex]).click();
            }else return;
         }
         else if (e.keyCode == '39') {
            // Right Arrow

            if (detailBtnsVisible()){
               $('#paneLeft > div.detailContainer').find($('.detail-btn-right')[themeIndex]).click();
            } else return;
         }else if (e.keyCode == '27'){
            // Escape Key

            if (detailBtnsVisible()){
               $('button.detailClose').click();
            } else return;
         }else{
            if (detailBtnsVisible()){
               //console.log(e.keyCode);
            }
         }
      }

      /*****************************************************************
      * Legend
      *****************************************************************/

      // Hide legend unless it's Desktop
      if (app.ui.mobileIntro.screenSize != "desktop")
         $('#legendOverlay').css('display', 'none');

      /*****************************************************************
      * Style unmapped tabs
      *****************************************************************/
     
      var slLayer = app.map.getLayer(app.data.getShortlistLayerId());
      unmappedTabs = [3] // list of tab IDs to hide, indexed from 0, starting with the left-most tab

      function getCurrentTabId(){
         return app.layerCurrent.graphics[0].attributes.tab_id;
      }

      // Returns whether or not a tab in 'unmappedTabs' is selected
      function unmappedTabSelected(){
         return (unmappedTabs.includes(getCurrentTabId()) ? true : false);
      }

      // Hide the location markers on tabs listed in 'unmappedTabs'
      function hideLocationMarkers(){
         for (var i=0; i<slLayer.graphics.length; i++){
            if (unmappedTabs.includes(slLayer.graphics[i].attributes.tab_id))
               slLayer.graphics[i].hide();
         }
      }

      // Hide the number divs in the current tab
      function hideCurrentTabNumbers(){
         console.log(getCurrentTabId());
         console.log("Hiding numbers");
         // Desktop
         $('#myList.tilelist > li > div.footer > div.num').css('display', 'none');
         $('#myList.tilelist > li > div.footer').css('padding-right', '14px');
         $('#myList.tilelist > li > div.footer > div.blurb').css('text-align', 'center');
         $('#myList.tilelist > li > div.footer > div.blurb').css('width', '100%');
         $('#myList.tilelist > li > div.footer > div.blurb').css('margin-left', '0px');
         $('#paneLeft > div.detailContainer.swiper-container.swiper-container-horizontal > div.detailView > div > div > div.detailFeatureNum').css('display', 'none');

         // Mobile
         $('#mobileList > li > div.footer > div.num').css('display', 'none');
      }

      // Show the number divs in the current tab
      function showCurrentTabNumbers(){
         console.log(getCurrentTabId());
         console.log("Showing numbers");
         // Desktop
         $('#myList.tilelist > li > div.footer > div.num').css('display', 'block');
         $('#myList.tilelist > li > div.footer').css('padding-right', '0px');
         $('#myList.tilelist > li > div.footer > div.blurb').css('text-align', 'left');
         $('#myList.tilelist > li > div.footer > div.blurb').css('width', '148px');
         $('#myList.tilelist > li > div.footer > div.blurb').css('margin-left', '4px');
         $('#paneLeft > div.detailContainer.swiper-container.swiper-container-horizontal > div.detailView > div > div > div.detailFeatureNum').css('display', 'block');

         // Mobile
         $('#mobileList > li > div.footer > div.num').css('display', 'block');
      }

      // Styles tabs in 'unmappedTabs' (hides numbers, hides location markers)
      function styleTabIfUnmapped(){
         if (unmappedTabSelected()){
            hideLocationMarkers();
            hideCurrentTabNumbers();
         }else{
            showCurrentTabNumbers();
         }
      }

      // Attatch unmapped tab styling to map's update-end event
      if (slLayer.updating)
         slLayer.on("update-end", styleTabIfUnmapped);
      else
         styleTabIfUnmapped();

      // (DESKTOP) Everytime an unmapped tab is clicked, hide the location markers
      $('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs').click(function(event) {
         styleTabIfUnmapped();
      });

      // (DESKTOP) Everytime an entry is clicked on an unmapped tab, hide the numbers
      $('#myList').click(function(event) {
         styleTabIfUnmapped();
      });

      // (MOBILE) Everytime an entry is clicked on an unmapped tab, hide the numbers
      $('#mobileList').click(function(event) {
         styleTabIfUnmapped();
      });

      // (MOBILE) Hide / show numbers based on which item is selected in the mobile intro
      $('#mobileThemeList').click(function(event) {
         styleTabIfUnmapped();
      });

      // (MOBILE) Everytime an unmapped tab is navigated to, hide the location markers and numbers
      $('#mobileThemeBar').click(function(event) {
         styleTabIfUnmapped();
      });

   });
});
