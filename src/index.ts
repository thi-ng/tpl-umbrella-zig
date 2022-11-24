import type { Fn0 } from "@thi.ng/api";
import { ConsoleLogger, LogLevel, NULL_LOGGER } from "@thi.ng/logger";
import { IWasmAPI, WasmBridge, WasmExports } from "@thi.ng/wasm-api";
import { DOMExports, WasmDom } from "@thi.ng/wasm-api-dom";
import { ScheduleExports, WasmSchedule } from "@thi.ng/wasm-api-schedule";
import { $StyleConfig } from "./generated/types";
import WASM_URL from "./main.wasm?url";

interface WasmApp extends WasmExports, DOMExports, ScheduleExports {
    /**
     * Exposed function in WASM module (see /zig/main.zig)
     */
    start: Fn0<void>;
}

/**
 * Custom example WASM API module. Can safely be discarded or used as basis for
 * your own... See https://thi.ng/wasm-api for details/usage.
 */
class DummyModule implements IWasmAPI<any> {
    /**
     * Module ID, used to avoid namespace clashes in WASM imports
     */
    readonly id = "dummy";

    parent!: WasmBridge<WasmApp>;

    async init(parent: WasmBridge<WasmApp>) {
        this.parent = parent;
        return true;
    }

    /**
     * Functions returned here will be imported & exposed in the WASM module.
     */
    getImports() {
        return {
            setStyle: (addr: number) => {
                // instantiate memory mapped StyleConfig
                const config = $StyleConfig(this.parent).instance(addr);
                const css = [
                    `background: ${config.bg.deref()}`,
                    `font-family: ${config.font.deref()}`,
                    `font-size: ${config.size}px`,
                ];
                document.body.style.cssText = css.join(";");
            },
        };
    }
}

// main app initialization

(async () => {
    // create WASM bridge
    const bridge = new WasmBridge<WasmApp>(
        // ...with extra API modules
        [new DummyModule(), new WasmDom(), new WasmSchedule()],
        // custom logger
        new ConsoleLogger("wasm", LogLevel.INFO)
        // (or uncomment below to disable all logging instead)
        // NULL_LOGGER
    );
    // instantiate WASM module & bindings
    await bridge.instantiate(fetch(WASM_URL));
    // call WASM main function to kick off
    bridge.exports.start();
})();
