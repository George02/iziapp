module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', '*.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		},
		wiredep: { task: { src: ['src/app/views/*.html'] }},
		sass: {
			options: {
				sourcemap: 'none'
			},
			dist: {
				files: {
					'dist/app/assets/css/main.css': 'src/app/sass/main.scss'
				}
			}
		},
		includeSource: {
			options: {
				basePath: 'src/app/assets/',
				baseUrl: 'assets/'
			},
			myTarget: {
				files: {'dist/app/views/master.html': 'src/app/views/master.html'}
			}
		},
		cssbeautifier : {
			files : ["dist/app/assets/css/*.css"]
		},
		exec: {
			run_nodemon: {
				command: 'nodemon dist/app/main.js'
			}
		},
		copy: {
			files: {
				expand: true,
				dest: 'dist',
				cwd: 'src/',
				src: '**'
			}
		},
		clean: ['dist']
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-include-source');
	grunt.loadNpmTasks('grunt-cssbeautifier');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('build', ['clean', 'copy', 'sass', 'includeSource', 'cssbeautifier', 'wiredep']);
	grunt.registerTask('run', 'exec');
};