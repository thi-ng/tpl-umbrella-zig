# tpl-umbrella-zig

This is a bare-bones project template for hybrid
[TypeScript](https://www.typescriptlang.org/) & [Zig](https://ziglang.org) apps,
using
[thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)
related infrastructure for bridging both worlds, and using
[Vite](https://vitejs.dev/) as dev tool/server & bundler...

Edit/delete everything as you see fit, see linked package readme files for
further details & please submit an issue if you spot anything wrong! Thanks!

## Getting started

Please consult the [GitHub
documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
to learn more about template repos. Once you cloned the repo, proceed as
follows:

```bash
# git clone ...

cd <path-where-you-cloned-this-tpl>

# download & install all dependencies (can also use npm)
yarn install

# start dev server & open in browser
yarn start

# regenerate shared types (see thi.ng/wasm-api-bindgen)
yarn build:types

# production build
yarn build

# preview latest production build
yarn preview
```

## Requirements

-   [Zig](https://ziglang.org) versions >= 0.10.0
-   [Binaryen](https://github.com/WebAssembly/binaryen)

## License

This project is licensed under the MIT License. See LICENSE.txt

&copy; 2022 Karsten Schmidt
