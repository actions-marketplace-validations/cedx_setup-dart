import {cp, readFile, writeFile} from "node:fs/promises";
import {EOL} from "node:os";
import {deleteAsync} from "del";
import {execa} from "execa";
import gulp from "gulp";
import replace from "gulp-replace";
import config from "./jsconfig.json" assert {type: "json"};
import pkg from "./package.json" assert {type: "json"};

/** Builds the project. */
export async function build() {
	await exec("ncc", ["build", "src/main.js", "--minify", "--out=var", "--target=es2022"]);
	await writeFile("bin/setup_dart.mjs", `#!/usr/bin/env node${EOL}${await readFile("var/index.js", "utf8")}`);
	return exec("tsc", ["--project", "src/jsconfig.json"]);
}

/** Deletes all generated files and reset any saved state. */
export function clean() {
	return deleteAsync(["lib", "var/**/*"]);
}

/** Builds the documentation. */
export async function doc() {
	await exec("typedoc", ["--options", "etc/typedoc.json"]);
	return cp("www/favicon.ico", "docs/favicon.ico");
}

/** Performs the static analysis of source code. */
export async function lint() {
	await exec("eslint", ["--config=etc/eslint.json", ...config.include]);
	return exec("tsc", ["--project", "jsconfig.json"]);
}

/** Publishes the package in the registry. */
export async function publish() {
	for (const command of [["tag"], ["push", "origin"]]) await exec("git", [...command, `v${pkg.version}`]);
}

/** Runs the test suite. */
export function test() {
	return exec("c8", ["--all", "--include=src/**/*.js", "--report-dir=var", "--reporter=lcovonly", "node", "--test"]);
}

/** Updates the version number in the sources. */
export function version() {
	return gulp.src("README.md").pipe(replace(/action\/v\d+(\.\d+){2}/, `action/v${pkg.version}`)).pipe(gulp.dest("."));
}

/** Runs the default task. */
export default gulp.series(
	clean,
	build,
	version
);

/**
 * Runs the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {import("execa").Options} [options] The child process options.
 * @returns {import("execa").ExecaChildProcess} Resolves when the command is finally terminated.
 */
function exec(command, args = [], options = {}) {
	return execa(command, args, {preferLocal: true, stdio: "inherit", ...options});
}
