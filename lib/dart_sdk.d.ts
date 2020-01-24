/** Defines the architecture of the Dart SDK. */
export declare enum Architecture {
    /** Specifies a 32-bit Dart SDK. */
    ia32 = "ia32",
    /** Specifies a 64-bit Dart SDK. */
    x64 = "x64"
}
/** Represents a release of the Dark SDK. */
export declare class DartSdk {
    /** The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK. */
    static readonly downloadUrlPattern: string;
    /**
     * Creates a new Dart SDK.
     * @param options An object specifying values used to initialize this instance.
     */
    constructor(options?: Partial<DartSdkOptions>);
    /** The architecture of this Dart SDK. */
    readonly architecture: Architecture;
    /** Gets the URL of the ZIP archive corresponding to this Dart SDK. */
    get downloadUrl(): string;
    /** The release channel of this Dart SDK. */
    readonly releaseChannel: ReleaseChannel;
    /** The version of this Dart SDK. */
    readonly version: string;
    /** Installs this Dart SDK. */
    setup(): Promise<void>;
}
/** Defines the options of a [[DartSdk]] instance. */
interface DartSdkOptions {
    /** The architecture of this Dart SDK. */
    architecture: Architecture;
    /** The release channel of this Dart SDK. */
    releaseChannel: ReleaseChannel;
    /** The version of this Dart SDK. */
    version: string;
}
/** Defines the release channel of the Dark SDK. */
export declare enum ReleaseChannel {
    /** Specifies a development Dart SDK. */
    dev = "dev",
    /** Specifies a stable Dart SDK. */
    stable = "stable"
}
export {};
