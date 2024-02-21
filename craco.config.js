const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (oneOfRule) {
        const cssModuleRule = {
          test: /\.module\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                },
              },
            },
          ],
          include: path.resolve(__dirname, 'src'),
        };
        oneOfRule.oneOf.unshift(cssModuleRule);
      }

      return webpackConfig;
    },
  },
};