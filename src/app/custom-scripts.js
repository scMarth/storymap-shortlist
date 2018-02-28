define(["dojo/topic"], function(topic) {
/*
* Custom Javascript to be executed while the application is initializing goes here
*/

   // The application is ready
   topic.subscribe("tpl-ready", function(){
      /*
      * Custom Javascript to be executed when the application is ready goes here
      */

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
            // up arrow
            return;
         }
         else if (e.keyCode == '40') {
            // down arrow
            return;
         }
         else if (e.keyCode == '37') {
            // left arrow
            if (detailBtnsVisible()){
               $('#paneLeft > div.detailContainer').find($('.detail-btn-left')[themeIndex]).click();
            }else return;
         }
         else if (e.keyCode == '39') {
            // right arrow
            if (detailBtnsVisible()){
               $('#paneLeft > div.detailContainer').find($('.detail-btn-right')[themeIndex]).click();
            } else return;
         }else if (e.keyCode == '27'){
            // escape key
            if (detailBtnsVisible()){
               $('button.detailClose').click();
            } else return;
         }else{
            // else
            if (detailBtnsVisible()){
               //console.log(e.keyCode);
            }
         }

      }
   });
});
