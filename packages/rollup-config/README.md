# @0xforkitall/rollup-config

This repository contains the [Rollup](https://github.com/rollup/rollup) configurations to build TypeScript projects.

## Installation

Use npm or yarn to install the package:

```
yarn add --dev @0xforkitall/rollup-config
```

## Usage

Import and use the `buildConfigs` utility on your `rollup.config.js` file:

```
const { buildConfigs } = require('@0xforkitall/rollup-config');

module.exports = [buildConfigs()];
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
