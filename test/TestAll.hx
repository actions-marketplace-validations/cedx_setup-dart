import setup_dart.*;
import utest.UTest;

/** Runs the test suites. **/
class TestAll {

	/** Application entry point. **/
	static function main(): Void {
		UTest.run([new DartSdkTest()]);
	}
}
