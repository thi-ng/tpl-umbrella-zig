const std = @import("std");

pub fn build(b: *std.Build) void {
    b.installArtifact(@import("node_modules/@thi.ng/wasm-api/zig/build.zig").wasmLib(b, .{
        // Declare extra WASM API packages to use
        // Each package can also declare dependencies to other such packages
        // (wasm-api and wasm-api-bindgen are made available everywhere)
        .modules = &.{
            .{ .name = "wasm-api-dom", .path = "@thi.ng/wasm-api-dom/zig/lib.zig" },
            .{ .name = "wasm-api-schedule", .path = "@thi.ng/wasm-api-schedule/zig/lib.zig" },
        },
        // (optional) build mode override
        // if commented out, we can pass CLI args to choose build mode (default: .Debug)
        // see build:zig-prod script alias in package.json
        // .optimize = .ReleaseSmall,
    }));
}
