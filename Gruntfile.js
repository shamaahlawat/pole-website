module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n'
            },
            build: {
                src: ['js/fullpage.js', 'js/main.js', 'js/map-style.js'],
                dest: 'js/scripts.js'
            }
        },

        cssmin: {
            target: {
                files: {
                    'css/styles.css': ['css/style.css', 'css/fullpage.css', 'css/font-awesome.css', 'css/animate.css']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);

};
