import mcover.coverage.MCoverage;
import mcover.coverage.client.LcovPrintClient;
import setup_dart.*;
import utest.UTest;

/** Runs the test suite. **/
class TestAll {

	/** The test cases. **/
	static final tests = [
		new DartSdkTest()
	];

	/** Application entry point. **/
	static function main() UTest.run(tests, () -> {
		final logger = MCoverage.getLogger();
		logger.addClient(new LcovPrintClient("which", "var/lcov.info"));
		logger.report();
	});
}
