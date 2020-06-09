export declare class DartSdk {
	static readonly downloadUrlPattern: string;
	constructor(options?: Partial<DartSdkOptions>);
	architecture: string;
	releaseChannel: string;
	readonly releaseUrl: string;
	version: string;
	download(): Promise<string>;
	install(): Promise<string>;
}

export interface DartSdkOptions {
	architecture: string;
	releaseChannel: string;
	version: string;
}
