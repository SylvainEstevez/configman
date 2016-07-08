'use strict';

const Path = require('path');
const merge = require('lodash/merge');
const cloneDeep = require('lodash/cloneDeep');

const DEFAULT_ROOT = Path.join(process.cwd(), 'config');
const DEFAULT_DEFAULT_CONFIG_NAME = 'default';

class Configurator {

  get root() { return this._root; }

  get env() { return this._env; }

  get defaultConfigName() { return this._defaultConfigName; }

  constructor({ root = DEFAULT_ROOT , defaultConfigName = DEFAULT_DEFAULT_CONFIG_NAME, env = null }) {
    this._env = env;
    if (!this._env) throw new Error('"env" is required');

    this._root = root;
    this._defaultConfigName = defaultConfigName;

    this._cache = {};
  }

  get(...paths) {
    if (!paths.length) throw new Error('Unknown config : undefined');

    let final = this._resolve(paths.shift());

    for (const path of paths) {
      final = final[path];
    }

    return final;
  }

  _resolve(name) {
    if (name in this._cache) return this._cache[name];
    const config = cloneDeep(require(Path.join(this._root, name)));
    const merged = merge(config[this._defaultConfigName], config[this._env]);
    this._cache[name] = merged;
    return merged;
  }

}


module.exports = Configurator;