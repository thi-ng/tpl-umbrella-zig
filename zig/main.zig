const std = @import("std");
const wasm = @import("wasm-api");
const bindgen = @import("wasm-api-bindgen");
const dom = @import("wasm-api-dom");
const schedule = @import("wasm-api-schedule").schedule;

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-schedule/zig/lib.zig
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

// empty stub (only needed for debug builds)
pub fn log(
    comptime _: std.log.Level,
    comptime _: @Type(.EnumLiteral),
    comptime _: []const u8,
    _: anytype,
) void {}

/// Since various initialization functions can return errors
/// we're bundling them all in a single fn, which is then called by start()
/// and so only needs one code site for error handling
fn init() !void {
    // the WASM API modules auto-initialize themselves if the root source
    // file exposes a `WASM_ALLOCATOR`, otherwise you'll have to initialize manually:
    // try dom.init(customAllocator);
    // try schedule.init(customAllocator);

    // then instantiate everything else, e.g. some DOM elements...
    dummyInit();
}

/// Main entry point
export fn start() void {
    init() catch |e| @panic(@errorName(e));
    wasm.printStr("done");
}

// BEGIN DUMMY CODE - SAFE TO DELETE! /////////////////////////////////

// import generated types (via `yarn build:types` command)
const types = @import("generated/types.zig");

const styles = [_]types.StyleConfig{
    .{ .bg = "yellow", .font = "serif", .size = 14 },
    .{ .bg = "cyan", .font = "monospace", .size = 18 },
    .{ .bg = "magenta", .font = "sans-serif", .size = 24 },
};

var styleID: usize = 0;

// imported JS function to apply a style preset
// (see DummyModule in /src/index.ts for reference)
pub extern "dummy" fn setStyle(ptr: *const types.StyleConfig) void;

fn updateStyle(_: *const dom.Event, _: ?*anyopaque) void {
    setStyle(&styles[styleID]);
    styleID = @mod(styleID + 1, styles.len);
}

fn dummyInit() void {
    _ = dom.createElement(&.{
        .tag = "div",
        .id = "app",
        .class = "ma3",
        .parent = dom.body,
        .index = 0,
        .children = dom.children(&.{
            .{ .tag = "h1", .text = "Hello Zig! 👋" },
            .{
                .tag = "button",
                .text = "Click me!",
                .attribs = dom.attribs(&.{
                    dom.Attrib.event("click", updateStyle, null),
                }),
            },
        }),
    });
}

// END OF DUMMY CODE //////////////////////////////////////////////////
