export declare class IonicImageCacheConfig {
    debugMode: boolean;
    showPreview: boolean;
    spinnerEnabled: boolean;
    fallbackAsPlaceholder: boolean;
    fallbackUrl: string;
    alt: string;
    maxCacheSize: number;
    maxCacheAge: number;
    spinnerName: string;
    spinnerColor: string;
    trustAllHosts: boolean;
    private _cacheDirectoryName;
    cacheDirectoryName: string;
    AltData: string;
    /**
     * Enables debug mode to receive console logs, errors, warnings
     */
    enableDebugMode(): void;
    /**
     * Enable/Disable the spinner by default. Defaults to true.
     * @param enable {boolean} set to true to enable
     */
    enableSpinner(enable: boolean): void;
    /**
     * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
     * @param enable {boolean} set to true to enable
     */
    enableFallbackAsPlaceholder(enable: boolean): void;
    /**
     * Sets the cache directory name. Defaults to 'image-loader-cache'
     * @param name {string} name of directory
     */
    setCacheDirectoryName(name: string): void;
    /**
     * Set fallback URL to use when image src is undefined or did not resolve.
     * This image will not be cached. This should ideally be a locally saved image.
     * @param fallbackUrl {string} The remote or local URL of the image
     */
    setFallbackUrl(fallbackUrl: string): void;
    /**
     * Sets the maximum allowed cache size
     * @param cacheSize {number} Cache size in bytes
     */
    setMaximumCacheSize(cacheSize: number): void;
    /**
     * Sets the maximum allowed cache age
     * @param cacheAge {number} Maximum cache age in milliseconds
     */
    setMaximumCacheAge(cacheAge: number): void;
    /**
     * Set the default spinnern ame
     * @param name
     */
    setSpinnerName(name: string): void;
    /**
     * Set the default spinner color
     * @param color
     */
    setSpinnerColor(color: string): void;
    /**
     * Set options for the FileTransfer plugin
     * @param options
     */
    setTrustAllHosts(yesNo?: boolean): void;
    constructor();
}
