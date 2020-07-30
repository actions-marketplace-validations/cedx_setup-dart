import instrument.coverage.Coverage;
import setup_dart.*;
import utest.UTest;

/** Runs the test suite. **/
class TestAll {

	/** The test cases. **/
	static final tests = [
		new DartSdkTest()
	];

	/** Application entry point. **/
	static function main() UTest.run(tests, Coverage.endCoverage);
}
