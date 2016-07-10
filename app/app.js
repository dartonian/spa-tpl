;(function(){
	'use strict';

	angular.module('app',['ui.router', 'LocalStorageModule', 'app.main'])
	//.config(['$httpProvider', '$urlRouterProvider', '$stateProvider',config])
	.run(['$rootScope', '$state', '$stateParams', '$location',run]);
	///////////

	//app.$inject = ['app.main', 'app.shared', 'app.contacts', 'app.timetable', 'app.about', 'app.gallery'];
	//config.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider'];
	//run.$inject = ['$rootScope', '$state', '$stateParams', '$location'];

	//function config ($httpProvider,$urlRouterProvider,$stateProvider) {

	//}

	function run ($rootScope, $state, $stateParams, $location) {
		$state.go('public.main')
	}

}());