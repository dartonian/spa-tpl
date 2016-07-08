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
                templateUrl: '_layout.html',
            })
			.state('public.main', {
				url: 'main',
	            controller: 'MainCtrl',
	            templateUrl: 'main.html'
			});
		}

}());