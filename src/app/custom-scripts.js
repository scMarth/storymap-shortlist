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

      function detailBtnsVisible(){
         var detailContainers = $('#paneLeft > div.detailContainer');
         //console.log(detailContainers);
         var result = false;
         var prefixStr = '#paneLeft > div.detailContainer:nth-child(';
         var suffixStr = ')';

         for (var i=1; i<=detailContainers.length; i++){
            var selector = prefixStr + i + suffixStr;
            //console.log(selector);
            var current = $(selector);
            // console.log('current:');
            // console.log(current);

            if (!(current)) continue;
            // console.log("detailcontainers sub i:");
            // console.log(detailContainers[i]);
            // console.log($('#paneLeft > div.detailContainer').children(i));
            // console.log($('#paneLeft > div.detailContainer').children(i).css('display'));
            // console.log($('#paneLeft > div.detailContainer')[i]);
            // console.log(detailContainers.css('display'));
            //if ($('#paneLeft > div.detailContainer').children(i).css('display') == 'block') result = true;
            if (current.css('display') == 'block') result = true;
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
            console.log(detailBtnsVisible());
            if (detailBtnsVisible()){
               $('#paneLeft > div.detailContainer').find($('.detail-btn-left')[themeIndex]).click();
            }else return;
         }
         else if (e.keyCode == '39') {
            console.log(detailBtnsVisible());
            // right arrow
            if (detailBtnsVisible()){
               $('#paneLeft > div.detailContainer').find($('.detail-btn-right')[themeIndex]).click();
            } else return;
         }else if (e.keyCode == '27'){
            console.log(detailBtnsVisible());
            // escape key
            if (detailBtnsVisible()){
               $('button.detailClose').click();
            } else return;
         }else{
            // else
            if (detailBtnsVisible()){
               console.log(e.keyCode);
            }
         }
      }
   });
});
