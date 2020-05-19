package setup_dart;

/** Defines the platform of the Dart SDK. **/
enum abstract Platform(String) from String to String {

	/** Specifies a Linux platform. **/
	var linux;

	/** Specifies a macOS platform. **/
	var macos;

	/** Specifies a Windows platform. **/
	var windows;
}
