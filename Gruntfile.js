var fs = require('fs');
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy:{
			main:{
				files:[
					{
						expand:true, 
						flatten: true,
						filter: 'isFile',
						src:['bower_components/bootstrap/dist/js/**'], 
						dest:'public/javascripts/'
					},
					{
						expand:true, 
						flatten: true,
						filter: 'isFile',
						src:['bower_components/bootstrap/dist/css/**'], 
						dest:'public/stylesheets/'
					},
					{
						expand:true, 
						flatten: true,
						filter: 'isFile',
						src:['bower_components/bootstrap/dist/fonts/**'], 
						dest:'public/fonts/'
					}
				]
			}
		},
		nodemon:{
			dev:{
				options:{
					file:'market.js',
					args:['-d 0']
				}
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
		},
		mochaTest:{
			test:{
				reporter:'spec'
			},
			src:['test/test.js']
		}	
	});
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('default', ['copy']);
	grunt.registerTask('dev', ['jshint','mochaTest','nodemon']);
};

