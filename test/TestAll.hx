import mcover.coverage.MCoverage;
import mcover.coverage.client.LcovPrintClient;
import setup_dart.*;
import utest.UTest;

/** Runs the test suites. **/
class TestAll {

	/** Application entry point. **/
	static function main(): Void {
		final tests = [
			new DartSdkTest()
		];

		UTest.run(tests, () -> {
			final logger = MCoverage.getLogger();
			logger.addClient(new LcovPrintClient("setup_dart", "var/lcov.info"));
			logger.report();
		});
	}
}
