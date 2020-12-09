package setup_dart;

using StringTools;

/** Provides helper methods for handling file paths. **/
@:allow(setup_dart)
@:noDoc
class PathTools {

	/** Normalizes the segment separators of the given `path` using the platform-specific separator. **/
	static function normalizeSeparator(path: String)
		return path.replace("/", Sys.systemName() == "Windows" ? "\\" : "/");
}
