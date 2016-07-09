'use strict';

const Path = require('path');
const merge = require('lodash/merge');
const cloneDeep = require('lodash/cloneDeep');

const DEFAULT_ROOT = Path.join(process.cwd(), 'config');
const DEFAULT_DEFAULT_CONFIG_NAME = 'default';


class ConfigMan {

  get root() { return this._root; }

  get env() { return this._env; }

  get defaultConfigName() { return this._defaultConfigName; }

  constructor(options = {}) {
    this._env = options.env;
    if (!this._env) throw new Error('"env" is required');
    
    this._root = options.root || DEFAULT_ROOT;
    this._defaultConfigName = options.defaultConfigName || DEFAULT_DEFAULT_CONFIG_NAME;

    this._cache = {};

    Object.freeze(this);
  }

  get(...paths) {
    if (!paths.length) throw new Error('Unknown config : undefined');
    return paths.reduce((acc, prop) => acc[prop], this._resolve(paths.shift()));
  }

  _resolve(name) {
    if (name in this._cache) return this._cache[name];
    const config = cloneDeep(require(Path.join(this._root, name)));
    const merged = merge(config[this._defaultConfigName] || {}, config[this._env] || {});
    this._cache[name] = merged;
    return merged;
  }

}

module.exports = ConfigMan;