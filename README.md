# @0xforkitall/dev-config

Repository to collect ESLint, TypeScript and other configuration files.

## Packages

-   [@0xforkitall/eslint-config](packages/eslint-config/README.md): ESLint configuration file for React projects;
-   [@0xforkitall/eslint-config-nextjs](packages/eslint-config-nextjs/README.md): ESLint configuration file for NextJs projects;
-   [@0xforkitall/rollup-config](packages/rollup-config/README.md): Rollup configurations for TypeScript libraries;
-   [@0xforkitall/shared-config](packages/shared-config/README.md): TypeScript, Prettier and other configuration files;

## Renovate

Create a `renovate.json` file

```
{
  extends: ["github>0xforkitall/dev-config:renovate.json5"],
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
