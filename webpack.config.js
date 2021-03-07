const path = require('path')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

module.exports = {
  entry: './app/assets/scripts/App.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  },
  devServer: {
    // watching for any file that ends with .HTML
    before: function(app, server) {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    // "hot module replacement" allows webpack to inject our new css and js into the browser's memory on the fly without having to reload/refresh
    port: 3000,
  // This would have a value of 8080 by default, but setting it to 300 just because it's easier to remember
    host: '0.0.0.0'
    // This will allow devices on the same network to be able to access the web dev werver from this computer
  },
  mode: 'development',
  module: {
    // deleted watch: true, because the dev server is going to be watching for changes
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader?url=false", { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }]
      }
    ]
  }
}