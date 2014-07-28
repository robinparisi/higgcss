module.exports = function(grunt) {

    // 1. Configuration principale
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            prod: {
                options: {
                    compress: false,
                },
                files: {
                    "build/css/style.css": "less/style.less"
                }
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 3 versions', '> 1%', 'ie 8'],
                    diff: false
                },
                files: {
                    'build/css/style.css': 'build/css/style.css'
                }
            }
        },
        watch: {
            less: {
                options: {
                    livereload: true,
                    files: ['build/css/*']
                },
                files: ['less/**'],
                tasks: ['less', 'autoprefixer']
            }
        }
    });

    // 2. Plugins
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // 3. Tâches à lancer par default
    grunt.registerTask('default', ['less', 'autoprefixer']);


};