# grunt-sassWatch

Automagically wire-up installed Bower components into your RequireJS config


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-sassWatch --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-requirejs');
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Example usage

// Assumes the styles (css and scss) directory is located at 'app/styles'.
grunt.loadNpmTasks('grunt-sassWatch');

// Will look for the styles directory at my_cool_styles
grunt.loadNpmTasks('grunt-sassWatch:my_cool_styles');

grunt.registerTask('default', ['sassWatch']);
```


## Why did I do this when grunt-contrib-sass and grunt-contrib-compass already exist?
Because neither of those solutions are fast enough to be used easily in a livereload enabled environment. The problem both libraries had was that they relied on grunt-watch, which meant that they were launching the sass (ruby) environment + vm each time a scss file needs to be compiled. Furthermore, since the files are not being watched by sass itself, the tasks end up recompiling every sass file instead of only the ones that changed.

I was able to reduce my sass compile time from 6+ seconds to under 0.5 seconds by doing two things:

	1. Splitting my scss files in two: 
		* vendor.scss - has all my @import statements for Bootstrap and FlatUI
		* main.scss   - app specific css rules
	2. Using grunt-sassWatch

