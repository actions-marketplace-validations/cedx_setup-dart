import haxe.Json;
import sys.FileSystem;
import sys.io.File;

/** Runs the script. **/
function main() {
	if (FileSystem.exists("docs")) Tools.removeDirectory("docs");

	Sys.command("haxe --define doc-gen --no-output --xml var/api.xml build.hxml");
	Sys.command("lix", [
		"run", "dox",
		"--define", "description", "Set up your GitHub Actions workflow with a specific version of the Dart SDK.",
		"--define", "source-path", "https://github.com/cedx/setup-dart/blob/main/src",
		"--define", "themeColor", "0x0175c2",
		"--define", "version", Json.parse(File.getContent("haxelib.json")).version,
		"--define", "website", "https://github.com/cedx/setup-dart",
		"--input-path", "var",
		"--output-path", "docs",
		"--title", "Setup Dart Action",
		"--toplevel-package", "setup_dart"
	]);

	File.copy("www/favicon.ico", "docs/favicon.ico");
}
