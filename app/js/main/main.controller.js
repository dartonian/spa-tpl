;(function(){
	'use strict';
	angular.module('app.main')
		.controller('MainCtrl', MainCtrl);
	//////////

	MainCtrl.$inject = ['$scope', 'localStorage', 'list'];

	function MainCtrl ($scope, localStorage, list) {

		$scope.list = list || [];

		function pushToLs(value) {
			if(!value.length)
				value = false;

			localStorage.setWithExpiration('list', value, 9999);
		}

	    $scope.add = function () {
	    	if(!$scope.input)
	    		return;

	        $scope.list.push({txt:$scope.input, done:false});
	        $scope.input = "";

	        pushToLs($scope.list);
	    };

	    $scope.remove = function () {

			$scope.list = $scope.list.filter(function(i){
				if(!i.done)
					return i;
			});

			pushToLs($scope.list);
	    };

	}

}());