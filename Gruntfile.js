module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      ls: { command: "ls" },
      mkdir: { command: "mkdir test" },
      git: {
        command: [
          "git add .",
          'git commit -m "commited by grunt gang"',
          "git push origin master"
        ].join("&&")
      },
      add: {
        command: "git add ."
      },
      commit: {
        command: msg => `git commit -m \"commited by grunt gang  ${msg} \"`
      },
      push: {
        command: "git push origin master"
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
  grunt.registerTask(
    "git",
    ["shell:add", "shell:commit:grunsssssst", "shell:push"].join("&&")
  );
  grunt.registerTask("git", ["shell:git"]);
  grunt.registerTask("gitchain", ["shell:ls", "shell:ls"]);
};
