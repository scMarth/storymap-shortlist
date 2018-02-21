// script error with esri/Map
//define(["dojo/topic", "esri/Map"], function(topic, Map) {
define(["dojo/topic"], function(topic) {
   /*
   * Custom Javascript to be executed while the application is initializing goes here
   */

   // gives error
   // app isn't even defined here lol
   /*
   app.map.on("load", function(){
      console.log("Hello, the map has been loaded");
      console.log($('#map_gc > g:nth-child(2) > image'));
      $('#map_gc > g:nth-child(2) > image').remove();
   });
   */

   // The application is ready
   topic.subscribe("tpl-ready", function(){
      /*
      * Custom Javascript to be executed when the application is ready goes here
      */

      // Prints:
      //
      // Hello friend
      // 0
      // Hello # 2
      // 0
      // location markers still there
      /*
      console.log('Hello friend');
      console.log($('myList').length); // 0
      while ($('#map_gc > g:nth-child(2) > image').length != $('myList').length){
         continue;
      }
      console.log('Hello # 2');
      console.log($('myList').length); // 0
      */

      // doesn't print at all, doesn't seem to ever fire
      /*
      dojo.connect(app.map, "onLoad", function(){
         console.log("Hello, the map has been loaded");
         console.log($('#map_gc > g:nth-child(2) > image'));
         $('#map_gc > g:nth-child(2) > image').remove();
      });
      */

      // nothing is printed out as far as i can see
      // doesn't seem to ever fire 
      /*
      app.map.on("load", function(){
         console.log("Hello, the map has been loaded");
         console.log($('#map_gc > g:nth-child(2) > image'));
         $('#map_gc > g:nth-child(2) > image').remove();
      });
      */

      // prints 'map is loaded'
      // then prints out a selected element... same as when overview is clicked except there
      // are no images yet it seems... no images selected
      // location markers are still there
      /*
      if (app.map.loaded){
         console.log("map is loaded")
         console.log($('#map_gc > g:nth-child(2) > image'));
         $('#map_gc > g:nth-child(2) > image').remove();
      }else{
         app.map.on('load', function(){
            console.log("MAP READY");
            console.log($('#map_gc > g:nth-child(2) > image'));
            $('#map_gc > g:nth-child(2) > image').remove();
         });
      }
      */

      // prints 'map graphics loaded'
      // then prints out a selected element... same as when overview is clicked except there
      // are no images yet it seems... no images selected
      // location markers are still there
      /*
      if (app.map.graphics.loaded){
         console.log("map graphics loaded");
         console.log($('#map_gc > g:nth-child(2) > image'));
         $('#map_gc > g:nth-child(2) > image').remove();
      }else{
         app.map.graphics.on('load', function(){
            console.log("MAP GRAPHICS READY");
            console.log($('#map_gc > g:nth-child(2) > image'));
            $('#map_gc > g:nth-child(2) > image').remove();
         });
      }
      */

      // prints 'update-end!'
      // then prints out a selected element... same as when overview is clicked except there
      // are no images yet it seems... no images selected
      // location markers are still there
      /*
      if (app.map.graphics.on('update-end')){
         console.log("update end!");
         console.log($('#map_gc > g:nth-child(2) > image'));
         $('#map_gc > g:nth-child(2) > image').remove();
      }else{
         app.map.graphics.on('update-end', function(){
            console.log("UPDATE END READY");
            console.log($('#map_gc > g:nth-child(2) > image'));
            $('#map_gc > g:nth-child(2) > image').remove();
         });
      }
      */

      // doesn't seem to print anything
      // never prints any selected elements
      // location markers are still there
      /*
      app.map.graphics.on("update-end", function(){
         console.log("update-end fired!");
         console.log($('#map_gc > g:nth-child(2) > image'));
         $('#map_gc > g:nth-child(2) > image').remove();
      });
      */

      // prints 'update!!!'
      // then prints out a selected element... same as when overview is clicked except there
      // are no images yet it seems... no images selected
      // location markers are still there
      /*
      if (app.map.graphics.on('update')){
         console.log("update!!!");
         console.log($('#map_gc > g:nth-child(2) > image'));
         $('#map_gc > g:nth-child(2) > image').remove();
      }else{
         app.map.graphics.on('update', function(){
            console.log("UPDATE READY");
            console.log($('#map_gc > g:nth-child(2) > image'));
            $('#map_gc > g:nth-child(2) > image').remove();
         });
      }
      */

      /*
      var slLayer = app.map.getLayer(app.data.getShortlistLayerId());
      console.log(slLayer);
      for (var i = 0; i < slLayer.graphics.length ; i++){
         console.log(slLayer.graphics[i].attributes.name);
         console.log(slLayer.graphics[i].attributes.tab_id);
      }
      */

      var slLayer = app.map.getLayer(app.data.getShortlistLayerId());
      //console.log(slLayer);

      function hideFirstTabLocationMarkers(){
         for (var i=0; i<slLayer.graphics.length; i++){
            if (slLayer.graphics[i].attributes.tab_id == 0){
               slLayer.graphics[i].hide();
            }else continue;
         }
      }

      if (slLayer.updating){
         slLayer.on("update-end", hideFirstTabLocationMarkers);
      }else{
         hideFirstTabLocationMarkers();
      }

      // Everytime the Overview tab is clicked, hide the location markers
      $('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs').click(function(event) {
         if ($(event.target).is('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1)')){
            hideFirstTabLocationMarkers();
         }else if ($(event.target).is('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1) > .entryLbl')){
            hideFirstTabLocationMarkers();
         }
      });

      /*
      if(slLayer.updating){
         slLayer.on("update-end", function(){
            console.log("Layer done updating");
            slLayer.hide();
         });
      } else {
         console.log("Layer already updated");
         slLayer.hide();
      }
      */

      /*
      // Everytime the Overview tab is clicked, hide the location markers
      $('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs').click(function(event) {
         if ($(event.target).is('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1)')){
            console.log('tab clicked');
            //console.log(app.map); 
            console.log($('#map_gc > g:nth-child(2) > image'));
            //$('#map_gc > g:nth-child(2) > image').remove();
            
            //console.log(app.map.graphics.getChildGraphics()); // getChildGraphics is not a function
            //console.log(app.map.graphics.getContent()); // getContent is not a function
            //console.log(app.map.graphics.getContent); // undefined
            //console.log(app.map.graphics); // this isn't null.. it actually prints something
            //console.log(app.map.graphics.toJson); // undefined

            // GET error esri/Map.js

            // require(["esri/Map", "esri/Graphic"], function(Map, Graphic){
            //    console.log("Vincent...");
            //    console.log(app.map.graphics.toJson()); // toJson is not a function ... need require?               
            // });

            console.log(app.map); // undefined
            console.log(app.map.graphics); // undefined

         }else if ($(event.target).is('#nav-bar > div.nav-bar.isTab > div.entries > ul.nav.nav-tabs > .entry:nth-child(1) > .entryLbl')){
            console.log('tab clicked');
            //console.log(app.map);
            console.log($('#map_gc > g:nth-child(2) > image'));
            //$('#map_gc > g:nth-child(2) > image').remove();

            console.log(app.map); // undefined
            console.log(app.map.graphics); // toJson is not a function ... need require?
         }else{
            return;
         }
      });
      */


   });
});


// todo: click events: different maps printed?