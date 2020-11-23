package setup_dart;

#if nodejs
import js.node.Path;
#else
import haxe.io.Path;
using StringTools;
#end

/** Provides static methods for managing file paths. **/
@:allow(setup_dart)
@:noDoc
class PathTools {

	/** Normalizes the given `path`, resolving `"."` and `".."` segments. **/
	static function normalize(path: String): String {
		final normalizedPath = Path.normalize(path);
		return #if nodejs normalizedPath #else normalizedPath.replace("/", Sys.systemName() == "Windows" ? "\\" : "/") #end;
	}
}
