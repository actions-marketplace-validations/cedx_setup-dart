/**
 * Defines the processor architecture of the Dart SDK.
 * @enum {string}
 */
export const Architecture = Object.freeze({

	/** Specifies a 32-bit ARM architecture. */
	ARM: "arm",

	/** Specifies a 64-bit ARM architecture. */
	ARM64: "arm64",

	/** Specifies a 32-bit AMD/Intel architecture. */
	IA32: "ia32",

	/** Specifies a 64-bit AMD/Intel architecture. */
	X64: "x64"
});
