# ConfigMan

Dead simple, lightweight configuration utility.

## Installation

`npm i configman --save`


## Example

Given the following directory, at the root of your project :

```
config/
    app.js
    db.js
```

`app.js` containing :

```javascript
module.exports = {
    default: { // This default name can be changed at instantiation
        name: 'My awesome app'
        port: 3000
    },
    dev: { // Could be anything
        port: 8888
    }
}
```

And `db.js` containing :

```javascript
module.exports = {
    default: {
        name: 'myawesomedb',
        port: 3306
    },
    dev: {
        user: 'johndoe',
        password: 'youwillneverfind'
    }
}
```

We can easily retrieve the app's `port` and `name` for the `dev` environment :

```javascript
const ConfigMan = require('configman');

const Config = new ConfigMan({ env: 'dev' });

Config.get('app').name; // "My awesome app"
Config.get('app').port; // 8888
```

We can also request nested properties :

```javascript
Config.get('db', 'user'); // "johndoe"
```

## API documentation

**constructor**

```javascript
new ConfigMan(options)
```

- `options` {`Object`}
    - `options.env` {`String`} : Environment's name, must match the one in the files
    - [`options.defaultConfigName` = 'default'] {`String`} : The name of the property containing the configs default values
    - [`options.root` = 'config'] {`String`} : The directory in which to retrieve the config files

**.get()** *any*

```
Config.get(...paths)
```

- `paths` {...String} : at least one path matching the file to read in `root`, optionally more to get nested properties

## License

MIT


