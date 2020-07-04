package setup_dart;

/** Defines the processor architecture of the Dart SDK. **/
enum abstract Architecture(String) from String to String {

	/** Specifies a 32-bit ARM architecture. **/
	var ARM ="arm";

	/** Specifies a 64-bit ARM architecture. **/
	var ARM64 = "arm64";

	/** Specifies a 32-bit AMD/Intel architecture. **/
	var IA32 = "ia32";

	/** Specifies a 64-bit AMD/Intel architecture. **/
	var X64 = "x64";
}
