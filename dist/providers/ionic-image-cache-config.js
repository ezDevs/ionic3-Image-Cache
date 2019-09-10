import { Injectable } from '@angular/core';
var IonicImageCacheConfig = /** @class */ (function () {
    function IonicImageCacheConfig() {
        this.debugMode = false;
        this.showPreview = true;
        this.spinnerEnabled = true;
        this.fallbackAsPlaceholder = false;
        this.fallbackUrl = "data:image/png;base64,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";
        this.maxCacheSize = -1;
        this.maxCacheAge = -1;
        //imageReturnType: 'base64' | 'uri' = 'uri';
        this.spinnerName = "dots";
        this.trustAllHosts = true;
        this._cacheDirectoryName = 'cache_assets';
    }
    Object.defineProperty(IonicImageCacheConfig.prototype, "cacheDirectoryName", {
        get: function () {
            return this._cacheDirectoryName;
        },
        set: function (name) {
            name.replace(/\W/g, '');
            this._cacheDirectoryName = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheConfig.prototype, "AltData", {
        get: function () {
            return this.alt;
        },
        set: function (name) {
            this.alt = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enables debug mode to receive console logs, errors, warnings
     */
    /**
       * Enables debug mode to receive console logs, errors, warnings
       */
    IonicImageCacheConfig.prototype.enableDebugMode = /**
       * Enables debug mode to receive console logs, errors, warnings
       */
    function () {
        this.debugMode = true;
    };
    /**
     * Enable/Disable the spinner by default. Defaults to true.
     * @param enable {boolean} set to true to enable
     */
    /**
       * Enable/Disable the spinner by default. Defaults to true.
       * @param enable {boolean} set to true to enable
       */
    IonicImageCacheConfig.prototype.enableSpinner = /**
       * Enable/Disable the spinner by default. Defaults to true.
       * @param enable {boolean} set to true to enable
       */
    function (enable) {
        this.spinnerEnabled = enable;
    };
    /**
     * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
     * @param enable {boolean} set to true to enable
     */
    /**
       * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
       * @param enable {boolean} set to true to enable
       */
    IonicImageCacheConfig.prototype.enableFallbackAsPlaceholder = /**
       * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
       * @param enable {boolean} set to true to enable
       */
    function (enable) {
        this.fallbackAsPlaceholder = enable;
    };
    /**
     * Sets the cache directory name. Defaults to 'image-loader-cache'
     * @param name {string} name of directory
     */
    /**
       * Sets the cache directory name. Defaults to 'image-loader-cache'
       * @param name {string} name of directory
       */
    IonicImageCacheConfig.prototype.setCacheDirectoryName = /**
       * Sets the cache directory name. Defaults to 'image-loader-cache'
       * @param name {string} name of directory
       */
    function (name) {
        this.cacheDirectoryName = name;
    };
    /**
     * Set fallback URL to use when image src is undefined or did not resolve.
     * This image will not be cached. This should ideally be a locally saved image.
     * @param fallbackUrl {string} The remote or local URL of the image
     */
    /**
       * Set fallback URL to use when image src is undefined or did not resolve.
       * This image will not be cached. This should ideally be a locally saved image.
       * @param fallbackUrl {string} The remote or local URL of the image
       */
    IonicImageCacheConfig.prototype.setFallbackUrl = /**
       * Set fallback URL to use when image src is undefined or did not resolve.
       * This image will not be cached. This should ideally be a locally saved image.
       * @param fallbackUrl {string} The remote or local URL of the image
       */
    function (fallbackUrl) {
        this.fallbackUrl = fallbackUrl;
    };
    /**
     * Sets the maximum allowed cache size
     * @param cacheSize {number} Cache size in bytes
     */
    /**
       * Sets the maximum allowed cache size
       * @param cacheSize {number} Cache size in bytes
       */
    IonicImageCacheConfig.prototype.setMaximumCacheSize = /**
       * Sets the maximum allowed cache size
       * @param cacheSize {number} Cache size in bytes
       */
    function (cacheSize) {
        this.maxCacheSize = cacheSize;
    };
    /**
     * Sets the maximum allowed cache age
     * @param cacheAge {number} Maximum cache age in milliseconds
     */
    /**
       * Sets the maximum allowed cache age
       * @param cacheAge {number} Maximum cache age in milliseconds
       */
    IonicImageCacheConfig.prototype.setMaximumCacheAge = /**
       * Sets the maximum allowed cache age
       * @param cacheAge {number} Maximum cache age in milliseconds
       */
    function (cacheAge) {
        this.maxCacheAge = cacheAge;
    };
    /**
     * Set the default spinnern ame
     * @param name
     */
    /**
       * Set the default spinnern ame
       * @param name
       */
    IonicImageCacheConfig.prototype.setSpinnerName = /**
       * Set the default spinnern ame
       * @param name
       */
    function (name) {
        this.spinnerName = name;
    };
    /**
     * Set the default spinner color
     * @param color
     */
    /**
       * Set the default spinner color
       * @param color
       */
    IonicImageCacheConfig.prototype.setSpinnerColor = /**
       * Set the default spinner color
       * @param color
       */
    function (color) {
        this.spinnerColor = color;
    };
    /**
     * Set options for the FileTransfer plugin
     * @param options
     */
    /**
       * Set options for the FileTransfer plugin
       * @param options
       */
    IonicImageCacheConfig.prototype.setTrustAllHosts = /**
       * Set options for the FileTransfer plugin
       * @param options
       */
    function (yesNo) {
        if (yesNo === void 0) { yesNo = true; }
        this.trustAllHosts = yesNo;
    };
    IonicImageCacheConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    IonicImageCacheConfig.ctorParameters = function () { return []; };
    return IonicImageCacheConfig;
}());
export { IonicImageCacheConfig };
//# sourceMappingURL=ionic-image-cache-config.js.map