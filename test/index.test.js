'use strict';

const Path = require('path');

const ConfigMan = require('../');

describe('ConfigMan', function () {

  describe('constructor', function () {

    it('should create a new configurator with default options', function () {
      const Configurator = new ConfigMan({ env: 'foo' });
      expect(Configurator.env).to.equal('foo');
      expect(Configurator.defaultConfigName).to.equal('default');
      expect(Configurator.root).to.equal(Path.join(process.cwd(), 'config'));
    });

    it('should instantiate a new configurator with custom values', function () {
      const env = 'foo';
      const root = 'bar';
      const defaultConfigName = 'test';
      const Configurator = new ConfigMan({ env, root, defaultConfigName });
      expect(Configurator.env).to.equal(env);
      expect(Configurator.defaultConfigName).to.equal(defaultConfigName);
      expect(Configurator.root).to.equal(root);
    });

    it('should NOT instantiate (missing env)', function () {
      expect(() => {
        new ConfigMan();
      }).to.throw(/env/);
    });

  });


  describe('.get()', function () {

    it('should have merged env and default properties', function () {
      const Configurator = new ConfigMan({ env: 'foo', root: Path.join(process.cwd(), 'test/fixtures') });
      const config = Configurator.get('example');
      expect(config.name).to.equal('foo');
      expect(config.defaultParam).to.equal(config.defaultParam);
    });

    it('should have cached the previously retrieved config', function () {
      const Configurator = new ConfigMan({ env: 'foo', root: Path.join(process.cwd(), 'test/fixtures') });
      Configurator.get('example');
      const regularRequire = require;
      require = () => { throw new Error('should not require the file') };
      Configurator.get('example');
      require = regularRequire;
    });

    it('should return nested property', function () {
      const Configurator = new ConfigMan({ env: 'foo', root: Path.join(process.cwd(), 'test/fixtures') });
      expect(Configurator.get('example', 'name')).to.equal('foo');
    });

    it('should throw if no arg', function () {
      const Configurator = new ConfigMan({ env: 'foo', root: Path.join(process.cwd(), 'test/fixtures') });
      expect(() => {
        Configurator.get();
      }).to.throw(/undefined/);
    });

  });

});