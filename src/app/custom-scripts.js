define(["dojo/topic"], function(topic) {
	/*
	* Custom Javascript to be executed while the application is initializing goes here
	*/
   $('.logoLink').attr('href', 'https://www.cityofsalinas.org/');
                  // logoLink.css('cursor', 'pointer')
                  //             .attr('href', headerCfg.logoTarget);

	// The application is ready
	topic.subscribe("tpl-ready", function(){
		/*
		* Custom Javascript to be executed when the application is ready goes here
		*/
	});
});
