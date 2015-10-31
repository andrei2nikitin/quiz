module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: {
                options: {
                    paths: ["less"],
                    compress: false
                },
                files: {
                    "static/css/main.css": [
                        "client/less/fonts.less",
                        "client/less/normalize.css",
                        "client/less/layout.less",
                        "client/less/main.less"
                    ]
                }
            },
            prod: {
                options: {
                    paths: ["less"],
                    compress: true
                },
                files: {
                    "static/css/main.css": [
                        "client/less/fonts.less",
                        "client/less/normalize.css",
                        "client/less/layout.less",
                        "client/less/main.less"
                    ]
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    beautify: {
                        width: 80,
                        beautify: true
                    }
                },
                files: {
                    'static/js/main.js': [
                        'client/js/tf-banner.js',
                        'client/js/main.js'
                    ]
                }
            },
            prod: {
                files: {
                    'static/js/main.js': [
                        'client/js/tf-banner.js',
                        'client/js/main.js'
                    ]
                }
            }
        },
        concat: {
            dev: {
                files: {
                    'static/js/main.js': [
                        'client/js/tf-banner.js',
                        'client/js/main.js'
                    ]
                }
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 8 versions']
                },
                files: {
                    'static/css/main.css': 'static/css/main.css'
                }
            }
        },
        watch: {
            js: {
                files: ['client/js/src/*'],
                tasks: ['concat:dev'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['client/less/*'],
                tasks: ['less', 'autoprefixer:dev']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Default task(s).
    grunt.registerTask('dev', ['less:dev', 'autoprefixer:dev', 'concat:dev']);
    grunt.registerTask('prod', ['less:prod', 'autoprefixer:dev', 'uglify:prod']);
};
