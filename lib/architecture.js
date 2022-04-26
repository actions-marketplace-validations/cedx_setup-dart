/**
 * Defines the processor architecture of the Dart SDK.
 * @enum {string}
 */
export const Architecture = Object.freeze({

	/** Specifies a 32-bit ARM architecture. */
	arm: "arm",

	/** Specifies a 64-bit ARM architecture. */
	arm64: "arm64",

	/** Specifies a 32-bit AMD/Intel architecture. */
	ia32: "ia32",

	/** Specifies a 64-bit AMD/Intel architecture. */
	x64: "x64"
});
