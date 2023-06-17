# @0xforkitall/shared-config

This repository contains the shared configurations files for [LintStaged](https://github.com/okonet/lint-staged), [Prettier](https://github.com/prettier/prettier) and [TypeScript](https://github.com/microsoft/TypeScript).

## Installation

Use npm or yarn to install the package:

```
yarn add --dev @0xforkitall/shared-config
```

## Usage

### LintStaged

Extends the LintStaged configurations on a `lint-staged.config.js` file:

```
module.exports = require('@0xforkitall/dev-config/lintstaged-config.js');
```

### Prettier

Extends the Prettier configurations on a `prettier.config.js` file:

```
module.exports = require('@0xforkitall/dev-config/prettier-config.js');
```

### TypeScript

Extends the TypeScript configurations on a `tsconfig.json` file:

```
{
  "extends": "@0xforkitall/dev-config/tsconfig.json"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
