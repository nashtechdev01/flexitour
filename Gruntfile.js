module.exports = function(grunt) {
    grunt.initConfig({
        mocha_istanbul: {
            // Pass all JS unit tests through mocha.
            // Also generate coverage for all JS files which were loaded.
            coverage: {
                src: 'test',
                options: {
                    mask: '*.js',
                    coverageFolder: 'coverage/js',
                    istanbulOptions: [
                        '--hook-run-in-context'
                    ],
                }
            },
            test: {
                src: 'test',
                options: {
                    mask: '*.js',
                    coverage: false,
                }
            },
        },
        umd: {
            all: {
                options: {
                    src: 'src/tour.js',
                    dest: 'build/tour.js',
                    objectToExport: 'Tour',
                    deps: {
                        default: ['$', 'Popper'],
                        amd: [
                            {'jquery': '$'},
                            {'local_usertours/popper': 'Popper'}
                        ],
                        cjs: ['jquery', 'popper.js']
                    }
                }
            }
        },
        watch: {
            js: {
                files: ["src/*.js"],
                tasks: ["js"]
            },
            tests: {
                files: ["test/*.js", "testFramework.js"],
                tasks: ["mocha_istanbul:coverage"],
            }
        },
    });
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-umd');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask("js", ["umd:all", "test"]);
    grunt.registerTask("test", ["mocha_istanbul:coverage"]);
    grunt.registerTask("default", ["js", "watch"]);
};