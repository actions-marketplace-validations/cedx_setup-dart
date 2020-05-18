package setup_dart;

/** Defines the processor architecture of the Dart SDK. **/
enum abstract Architecture(String) to String {

	/** Specifies a 32-bit ARM architecture. **/
	var arm;

	/** Specifies a 64-bit ARM architecture. **/
	var arm64;

	/** Specifies a 32-bit AMD/Intel architecture. **/
	var ia32;

	/** Specifies a 64-bit AMD/Intel architecture. **/
	var x64;
}
