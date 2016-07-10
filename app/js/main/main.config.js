;(function(){
	'use strict'
	angular.module('app.main', [])
		.config(['$stateProvider', config]);

	///////////////

	function config ($stateProvider) {

		$stateProvider
			.state('public', {
                url: '/',
                abstract: true,
                templateUrl: 'js/shared/layout/_layout.html',
            })
			.state('public.main', {
				url: 'main',
	            controller: 'MainCtrl',
	            templateUrl: 'js/main/main.html',
	            resolve: {
	            	list: mainResolve
	            }
			});
	}

	mainResolve.$inject = ['localStorage'];

    function mainResolve(localStorage){
    	var list = localStorage.getWithExpiration('list');

    	if(!list)
    		list = [];

        	return list;
    }

}());