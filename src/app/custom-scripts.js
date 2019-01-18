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
      * Overview Tab Doesn't show Location Markers
      *****************************************************************/
     
      var slLayer = app.map.getLayer(app.data.getShortlistLayerId());

      // Hide the first tab's location markers
      function hideFirstTabLocationMarkers(){
         for (var i=0; i<slLayer.graphics.length; i++){
            if (slLayer.graphics[i].attributes.tab_id == 0)
               slLayer.graphics[i].hide();
         }
      }

      // Hide the number divs in the current tab
      function hideCurrentTabNumbers(){
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

      // (DESKTOP) Returns whether or not the Overview tab is selected
      function overviewTabSelected(){
         if ($('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1)').hasClass('active'))
            return true;
         else
            return false;
      }

      // Styles the first tab as an Overview tab (hides numbers, hides location markers)
      function firstTabToOverview(){
         hideFirstTabLocationMarkers();
         hideCurrentTabNumbers();
      }

      // Attatch Overview tab styling to map's update-end event
      if (slLayer.updating)
         slLayer.on("update-end", firstTabToOverview);
      else
         firstTabToOverview();

      // (DESKTOP) Everytime the Overview tab is clicked, hide the location markers
      $('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs').click(function(event) {
         if ($(event.target).is('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1)'))
            firstTabToOverview();
         else if ($(event.target).is('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1) > .entryLbl'))
            firstTabToOverview();
         else
            showCurrentTabNumbers();
      });

      // (DESKTOP) Everytime an entry is clicked on the overview tab, hide the numbers
      $('#myList').click(function(event) {
         if (overviewTabSelected()){
            hideCurrentTabNumbers();
         }else{
            showCurrentTabNumbers();
         }
      });

      // (MOBILE) Returns whether or not the Overview tab is selected
      function mobileOverviewTabSelected(){
         if ($('#mobileThemeBarSlider > div.mobileThemeTitle.swiper-slide.swiper-slide-active > p')[0].innerHTML == "Overview")
            return true;
         else
            return false;
      }

      // (MOBILE) Everytime an entry is clicked on the overview tab, hide the numbers
      $('#mobileList').click(function(event) {
         if (mobileOverviewTabSelected()){
            hideCurrentTabNumbers();
         }else{
            showCurrentTabNumbers();
         }
      });

      // (MOBILE) Hide / show numbers based on which item is selected in the mobile intro
      $('#mobileThemeList').click(function(event) {
         if ($(event.target).is('#mobileThemeList > li.mobileTitleThemes:nth-child(1)'))
            hideCurrentTabNumbers();
         else if ($(event.target).is('#mobileThemeList > li.mobileTitleThemes:nth-child(1) > span'))
            hideCurrentTabNumbers();
         else
            showCurrentTabNumbers();
      });

      // (MOBILE) Everytime the Overview tab is navigated to, hide the location markers and numbers
      $('#mobileThemeBar').click(function(event) {
         if (mobileOverviewTabSelected()){
            firstTabToOverview();
         }else{
            showCurrentTabNumbers();
         }
      });

   });
});
