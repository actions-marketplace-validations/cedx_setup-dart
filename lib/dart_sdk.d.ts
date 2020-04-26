/** Defines the processor architecture of the Dart SDK. */
export declare enum Architecture {
    /** Specifies a 32-bit ARM architecture. */
    arm = "arm",
    /** Specifies a 64-bit ARM architecture. */
    arm64 = "arm64",
    /** Specifies a 32-bit AMD/Intel architecture. */
    ia32 = "ia32",
    /** Specifies a 64-bit AMD/Intel architecture. */
    x64 = "x64"
}
/** Defines the platform of the Dart SDK. */
export declare enum Platform {
    /** Specifies a Linux platform. */
    linux = "linux",
    /** Specifies a macOS platform. */
    macos = "macos",
    /** Specifies a Windows platform. */
    windows = "windows"
}
/** Defines the release channel of the Dark SDK. */
export declare enum ReleaseChannel {
    /** Specifies a development release of the Dart SDK. */
    beta = "beta",
    /** Specifies a development release of the Dart SDK. */
    dev = "dev",
    /** Specifies a stable release of the Dart SDK. */
    stable = "stable"
}
/** Represents a release of the Dark SDK. */
export declare class DartSdk {
    /** The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK. */
    static readonly downloadUrlPattern: string;
    /** The architecture of this Dart SDK. */
    architecture: Architecture;
    /** The release channel of this Dart SDK. */
    releaseChannel: ReleaseChannel;
    /** The version of this Dart SDK. */
    version: string;
    /**
     * Creates a new Dart SDK.
     * @param options An object specifying values used to initialize this instance.
     */
    constructor(options?: Partial<DartSdkOptions>);
    /** Gets the URL of the ZIP archive corresponding to this Dart SDK. */
    get releaseUrl(): string;
    /**
     * Downloads and extracts the ZIP archive corresponding to this Dart SDK release.
     * @return The path to the extracted directory.
     */
    download(): Promise<string>;
    /** Installs this Dart SDK, after downloading it if required. */
    install(): Promise<void>;
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
export {};
