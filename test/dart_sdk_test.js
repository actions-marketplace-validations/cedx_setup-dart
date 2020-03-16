const {expect} = require('chai');
const {existsSync, promises} = require('fs');
const {normalize, join} = require('path');
const {format} = require('util');
const {Architecture, DartSdk, Platform, ReleaseChannel} = require('../lib/index.js');

/** Tests the features of the {@link DartSdk} class. */
describe('DartSdk', function() {
  this.timeout(120000);

  before(() => {
    if (!('RUNNER_TEMP' in process.env)) process.env.RUNNER_TEMP = join(__dirname, '../var/tests/temp');
    if (!('RUNNER_TOOL_CACHE' in process.env)) process.env.RUNNER_TOOL_CACHE = join(__dirname, '../var/tests/cache');
  });

  describe('.releaseUrl', () => {
    it('should point, by default, to the latest stable release', () => {
      const dartSdk = new DartSdk;
      const urlPattern = `https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-%s-x64-release.zip`;
      if (process.platform == 'darwin') expect(dartSdk.releaseUrl).to.equal(format(urlPattern, Platform.macos));
      else if (process.platform == 'win32') expect(dartSdk.releaseUrl).to.equal(format(urlPattern, Platform.windows));
      else expect(dartSdk.releaseUrl).to.equal(format(urlPattern, Platform.linux));
    });

    it('should point to a valid Dart SDK release', () => {
      const dartSdk = new DartSdk({architecture: Architecture.ia32, releaseChannel: ReleaseChannel.dev, version: '12.34.56-dev.7.8'});
      const urlPattern = `https://storage.googleapis.com/dart-archive/channels/dev/release/12.34.56-dev.7.8/sdk/dartsdk-%s-ia32-release.zip`;
      if (process.platform == 'darwin') expect(dartSdk.releaseUrl).to.equal(format(urlPattern, Platform.macos));
      else if (process.platform == 'win32') expect(dartSdk.releaseUrl).to.equal(format(urlPattern, Platform.windows));
      else expect(dartSdk.releaseUrl).to.equal(format(urlPattern, Platform.linux));
    });
  });

  describe('.download()', () => {
    it('should properly download and extract the Dart SDK', async () => {
      const executable = process.platform == 'win32' ? 'dart.exe' : 'dart';
      const sdkDir = await new DartSdk({releaseChannel: ReleaseChannel.stable, version: '2.7.0'}).download();
      expect(existsSync(join(sdkDir, `bin/${executable}`))).to.be.true;
      expect((await promises.readFile(join(sdkDir, 'version'), 'utf8')).trim()).to.equal('2.7.0');
    });
  });

  describe('.install()', () => {
    it('should add the Dart SDK binaries to the PATH environment variable', async () => {
      const dartSdk = new DartSdk;
      await dartSdk.install();
      expect(process.env.PATH).to.contain(normalize(`/dart-sdk/${dartSdk.version}/${dartSdk.architecture}/bin`));
    });
  });
});
