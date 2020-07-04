package setup_dart;

/** Defines the release channel of the Dark SDK. **/
enum abstract ReleaseChannel(String) from String to String {

	/** Specifies a development release of the Dart SDK. **/
	var Beta = "beta";

	/** Specifies a development release of the Dart SDK. **/
	var Development = "dev";

	/** Specifies a stable release of the Dart SDK. **/
	var Stable = "stable";
}
