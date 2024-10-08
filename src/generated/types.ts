/**
 * Generated by @thi.ng/wasm-api-bindgen at 2024-08-20T13:56:12.617Z
 * DO NOT EDIT!
 */

// @ts-ignore possibly includes unused imports
import { Pointer, WasmStringPtr, type IWasmMemoryAccess, type MemorySlice, type MemoryView, type WasmType, type WasmTypeBase, type WasmTypeConstructor } from "@thi.ng/wasm-api";
// @ts-ignore
import { __array, __instanceArray, __slice32, __primslice32 } from "@thi.ng/wasm-api/memory";

/**
 * Style configuration settings
 */
export interface StyleConfig extends WasmTypeBase {
	/**
	 * CSS background color
	 */
	readonly bg: WasmStringPtr;
	/**
	 * Font family
	 */
	readonly font: WasmStringPtr;
	/**
	 * Font size enum
	 */
	size: FontSize;
}

export const $StyleConfig: WasmTypeConstructor<StyleConfig> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 12;
	},
	instanceArray(base, num) {
		return __instanceArray<StyleConfig>(this, base, num);
	},
	instance: (base) => {
		let $bg: WasmStringPtr | null = null;
		let $font: WasmStringPtr | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 12);
			},
			get bg(): WasmStringPtr {
				return $bg || ($bg = new WasmStringPtr(mem, base, true));
			},
			get font(): WasmStringPtr {
				return $font || ($font = new WasmStringPtr(mem, (base + 4), true));
			},
			get size(): FontSize {
				return mem.u8[(base + 8)];
			},
			set size(x: FontSize) {
				mem.u8[(base + 8)] = x;
			},
		};
	}
});

export enum FontSize {
	SMALL = 14,
	MEDIUM = 18,
	LARGE = 24,
}
