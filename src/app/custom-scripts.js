define(["dojo/topic"], function(topic) {
/*
* Custom Javascript to be executed while the application is initializing goes here
*/

   // The application is ready
   topic.subscribe("tpl-ready", function(){
      /*
      * Custom Javascript to be executed when the application is ready goes here
      */

      document.onkeydown = checkKey;

      function arrowsVisible(){
         var detailContainers = $('#paneLeft > div.detailContainer');
         var result = false;
         for (var i=0; i<detailContainers.length; i++){
            if (!(detailContainers[i])) continue;
            if ($('#paneLeft > div.detailContainer').children(i).css('display') == 'block') result = true;
         }
         return result;
      }

      function checkKey(e){
         e = e || window.event;

         var leftArrowBtn = $('#paneLeft > div.detailContainer > div.detail-btn-container.detail-btn-left > div');
         var rightArrowBtn = $('#paneLeft > div.detailContainer > div.detail-btn-container.detail-btn-right > div');
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
            if (arrowsVisible()){
               $('#paneLeft > div.detailContainer').find($('.detail-btn-left')[themeIndex]).click();
            }
         }
         else if (e.keyCode == '39') {
            // right arrow
            if (arrowsVisible()){
               $('#paneLeft > div.detailContainer').find($('.detail-btn-right')[themeIndex]).click();
            }
         }
      }
   });
});
