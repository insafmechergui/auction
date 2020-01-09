module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      ls: {
        command: "ls"
      },
      add: {
        command: "git add ."
      },
      commit: {
        command: 'git commit -m "commited by grunt gang"'
      },
      push: {
        command: "git push origin master"
      }
    },

    jshint: {
      options: {
        //     curly: true,
        //     eqeqeq: true,
        //     eqnull: true,
        //     browser: true,
        //     globals: {
        //       jQuery: true
        //     },
        esversion: 6
      },
      all: ["Gruntfile.js", "client", "routes"]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("default", ["jshint"]);
  grunt.registerTask("git", ["shell:add:commit:push"]);
  grunt.registerTask("gitadd", ["shell:add"]);
};
