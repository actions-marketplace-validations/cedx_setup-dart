import chai from 'chai';
import {arch} from 'os';
import {format} from 'util';
import {DartSdk} from '../lib/index.js';

/** Tests the features of the {@link DartSdk} class. */
describe('DartSdk', () => {
  const {expect} = chai;

  const architecture = arch();
  const baseUrl = 'https://storage.googleapis.com/dart-archive';

  describe('#releaseUrl', () => {
    it('should points by default to the latest stable release', () => {
      const dartSdk = new DartSdk;
      const urlPattern = `https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-%s-x64-release.zip`;
      if (process.platform == 'darwin') expect(dartSdk.releaseUrl).to.equal(format(urlPattern, 'macos'));
      else if (process.platform == 'linux') expect(dartSdk.releaseUrl).to.equal(format(urlPattern, 'linux'));
      else if (process.platform == 'win32') expect(dartSdk.releaseUrl).to.equal(format(urlPattern, 'windows'));
    });

    it('should points to a valid Dart SDK release', () => {
      let sdk = new DartSdk({});
    });
  });

  describe('#download()', () => {
    it('should support multiple architecture', () => {

    });

    it('should support multiple release channels', () => {

    });

    it('should support multiple versions', () => {

    });
  });

  describe('#install()', () => {
    it('should points to TODO', () => {

    });
  });
});
