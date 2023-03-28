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

This template is configured for recent dev versions (0.11.0-dev-xxxx) of Zig,
which have several differences to the previous build system (v0.10.1 or
earlier). You can download the latest version from the Zig website or (my own
preferred method) using [asdf](https://asdf-vm.com/) to install it (even just
locally for this project):

```bash
# asdf supports multiple versions of a tool, here to install latest dev version
asdf install zig master

# global use of that version
asdf global zig master

# only use that version in this project
asdf local zig master
```

-   [Zig](https://ziglang.org) v0.11-dev versions (by default) or v0.10, see
    [important
    differences](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/README.md#using-the-zig-build-system))
-   [Binaryen](https://github.com/WebAssembly/binaryen)

Please see the comments in
[build.zig](https://github.com/thi-ng/tpl-umbrella-zig/blob/main/build.zig) for
more details...

## Notes

This template pulls in more dependencies than needed for the runtime of your
actual app. Most of these additional packages are only required by the
[@thi.ng/wasm-api-bindgen](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-bindgen)
CLI tool to generate source code for the types shared between the WASM/JS
side... Feel free to remove that package if you're not making use of code
generation.

## License

This project is licensed under the MIT License. See LICENSE.txt

&copy; 2022 - 2023 Karsten Schmidt
