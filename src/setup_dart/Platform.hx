package setup_dart;

/** Defines the platform of the Dart SDK. **/
enum abstract Platform(String) from String to String {

	/** Specifies a Linux platform. **/
	var Linux = "linux";

	/** Specifies a macOS platform. **/
	var MacOS = "macos";

	/** Specifies a Windows platform. **/
	var Windows = "windows";
}
