// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = function (config) {
  config.set({
    singleRun: true,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    reporters: ['progress'],
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    client: {
      clearContext: false
    }
  });
};
