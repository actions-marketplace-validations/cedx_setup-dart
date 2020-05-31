import mcover.coverage.MCoverage;
import mcover.coverage.client.LcovPrintClient;
import setup_dart.*;
import utest.Runner;
import utest.ui.Report;

/** Runs the test suite. **/
class TestAll {

	/** The test cases. **/
	static final tests = [
		new DartSdkTest()
	];

	/** Application entry point. **/
	static function main(): Void {
		final runner = new Runner();
		runner.onComplete.add(_ -> {
			final logger = MCoverage.getLogger();
			logger.addClient(new LcovPrintClient("setup_dart", "var/lcov.info"));
			logger.report();
		});

    Report.create(runner);
		for (test in tests) runner.addCase(test);
    runner.run();
	}
}