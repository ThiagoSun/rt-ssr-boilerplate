/* eslint-disable */
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const withPlugins = require("next-compose-plugins");
// const cssLoaderGetLocalIdent = require("css-loader/lib/getLocalIdent.js");
const withLessExcludeAntd = require("./next-less.config.js");

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/less/antd-custom.less'), 'utf8')
);

const nextConfig = {
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    return config
  }
};

module.exports = withPlugins([
  [withLessExcludeAntd, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]_[hash:base64:5]"
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
  }],
  [withBundleAnalyzer, {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
  }]
], nextConfig);
