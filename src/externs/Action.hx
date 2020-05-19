package externs;

import haxe.extern.EitherType;
import js.lib.Error;

/** Functions for setting results, logging, registering secrets and exporting variables across actions. **/
@:jsRequire("@actions/core")
extern class Action {

	/** Prepends the given input `path` to the jobs `PATH`. **/
	static function addPath(path: String): Void;

	/** Gets the value of an input. **/
	static function getInput(name: String, ?options: InputOptions): String;

	/** Logs the specified `message` and sets the action status to failed. **/
	static function setFailed(message: EitherType<Error, String>): Void;
}

/** Defines the options of an action input. **/
typedef InputOptions = {

	/** Value indicating whether the input is required. **/
	var required: Bool;
}
