import instrument.coverage.Coverage;
import setup_dart.*;
import tink.testrunner.Runner;
import tink.unit.TestBatch;

/** Runs the test suite. **/
class TestAll {

	/** Application entry point. **/
	static function main() {
		final tests = TestBatch.make([
			new DartSdkTest()
		]);

		Runner.run(tests).handle(outcome -> {
			Coverage.endCoverage();
			Runner.exit(outcome);
		});
	}
}
