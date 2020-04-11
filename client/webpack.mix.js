const mix = require('laravel-mix');
const autoprefixer = require('autoprefixer');
const postCssPresetEnv = require('postcss-preset-env');

// Set the public path
mix.setPublicPath('assets/dist');

// Setup and configure css
mix.styles(['assets/src/css/style.css'], 'assets/dist/css/style.css');

// Setup additional CSS-related options including Tailwind and any other PostCSS items
mix.options({
    // Disable processing css urls for speed
    processCssUrls: false,
    postCss: [
        // PostCSS plugins
        autoprefixer(),
        postCssPresetEnv({ stage: 2 }),
    ],
});

// Setup and configure JS
mix.js('assets/src/js/main.js', 'assets/dist/js');

// Automatic code-splitting
mix.extract();

// Directly copy over some folders
mix.copy('assets/src/img', 'assets/dist/img');

//
// Production configuration
//

if (mix.inProduction()) {
    // Allow versioning in production
    mix.version();
}
