module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      gitAdd: {
        commmand: "git add ."
      },
      gitcommit: {
        commmand: msg =>
          `git commit -m \"commited by the grunt gang with the msg ${msg}\"`
      },
      gitPush: {
        commmand: "git push origin master"
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
        esversion: 6
      },
      all: ["Gruntfile.js", "client", "routes"]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("default", ["jshint"]);
  grunt.registerTask("git", ["shell:gitAdd:gitcommit:testing grunt:gitPush"]);
};
