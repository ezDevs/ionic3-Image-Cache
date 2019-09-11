var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { IonicImageCacheConfig } from '../providers/ionic-image-cache-config';
import { Component, Input, Output, NgZone, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { IonicImageCacheHelperProvider } from '../providers/ionic-image-cache-fileprocessor';
import { Platform } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
var IonicImageCacheComponent = /** @class */ (function () {
    function IonicImageCacheComponent(imageViewerCtrl, ngZone, platform, imageCacheConfig, helpers) {
        this.ngZone = ngZone;
        this.platform = platform;
        this.imageCacheConfig = imageCacheConfig;
        this.helpers = helpers;
        this.avatarbase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABMdJREFUaAXlm1toHFUcxneSZY2NKBUv2OKLVHNZk0AEhXjBENSCRUUflEKV+qDWK1RFii+rL4r4YBBaCiKCYCR5EEEMpangW9CASZbcEBUpZBeUrKA13d1k19+BLoRx53q+2abpwDKZc/7n+3+/OWfuJ87Kyko9dRktbReR9Sy5v63Vau/zO7ixsXF7qVS6hrJckp7SSYq7tP9i++t6vX56c3PzTDabLbrqU8vLy29RlnOXK7cTBwbwFIZPADkJZCXAfDag3ro6MWBAzziOc6y7u/vHsC7L5fKRjo6O3cQfCNsmalwSx/A6Jl4G9IGurq7QsMb4wMDAubm5ucfYWcejgoSNd5RnaYwW6dX9gM6FNeAVt7S09EZbW9sH1DteMXHKZT0M7Bpn2/sUsAakp6fnQzSf5M/zccC82iiBD/b29v7slShOOYfFBDtxP23Lcdo3ayMBpicm6RFzNpYv6H6P6OsqYQkwZk6qDDXTWV1dPWnOD83qopZJgBl2P0RNHCV+eHh4g/ipKG28YhXANY7dglcCYfnvCi0FcNDdk8JniiH9r0LokgFWwBoNa2D2fEt6eNsAc2e1qTLTCh1FD9daYVSVwxoYI5fUGxNrYIb05QXcwh6W7FjrHm4hsOQwtgZW3RAE0aiuBlbAwP7NffSxILOKevL8RL6qrZYVMMlPcR/9la2JMO3JcxrgXJhYvxhb4IyfuLqOYW39uscWeK8aKkBvT0B9YLUt8ABvGTsDs4gC6OCbbKWsgDGQzmQyd9uaiND+4gIbo7xKvd+sk17Gx8fbyXGLbR6rHr6QfMTWRJj2/f39zxB3Q5hYvxgF8J2Li4u3+iVR1HH4vK3QUQCbYf2UwoyXxsLCwl3UWQ9noy8BRucRI5bU0t7e/rhKWwLMcLsjn8/fqDLl1kH/YXdZ3G0JMMmddDptPonIF4ZzFlHzkywq4BS9cEjiyCXCjjzsKrLaVAKP8OlVCj07O7uXB4YjVoSuxjJgo4u5j7jVtL5WNjwyG+AdRs6uxrZiLQXG3LXcar6oMGY00HtQpdXQkQI3RBXr6enpq9G5WaG1VSMJ4NWtCeL+3dnZeWXctn7tti0wd2/WD/vNwOXAnLgkPQxwtZlh2zIpMLAVphD+ZmvKtC8Wi+fQMx/CpYsMGHN5zqr38BhXUjjkq/959J5VQ8uAeY16NOpEtKAdg97nxIwHxUWplwDTCwXeSHwXJXGEWAMtWyTAuJnI5XKJfDYtFApT7NA/VcQSYAx9qTLk1rkwg2fCXR53WwE8xeSx6bgGQrYbJe6PkLG+YXGB6dT6JHOgD4yNjT1EBsmnTC+nTEFcYbb8PnK+RsyiV1yY8kizaUlY4lLxaaVSOdHX1/dLmARJxPBS4F5e+7yAlyfQvyJKjlDAgOYRHV1bW/tiaGjIzIfeFgvP39fh7TDgz2FoXxhTfsA1xL5BZJQhldQlJ4zHMDEOr4pH6HXzaPooP89D9X/AQP5Dg08Yth9z1/RrmGzbKYaJ5bfR42/i6WnWGbe3rcBl7paOr6+vvzc4OCg5I7qTtXKb/5DZA/BROvB51lc1cjtUmKeSz6rV6ruciM42KnbKen5+fjdvYV4C+lWYrk+ZIbBT4Pw4ZmZmdsH6il/Mjqz7D9RWlBEQGS2+AAAAAElFTkSuQmCC";
        this.cache_directory_name = this.imageCacheConfig.cacheDirectoryName;
        this.fallback = this.imageCacheConfig.fallbackUrl;
        this.altString = this.imageCacheConfig.alt;
        this.spinnerNameString = this.imageCacheConfig.spinnerName;
        this.spinnerColorString = this.imageCacheConfig.spinnerColor;
        this.showPrev = true;
        this.loaded = new EventEmitter();
        this.clicked = new EventEmitter();
        this._imageViewerCtrl = imageViewerCtrl;
    }
    Object.defineProperty(IonicImageCacheComponent.prototype, "src", {
        get: function () {
            return this.srcUrl;
        },
        set: function (value) {
            if (!this.platform.is('cordova')) {
                this.setImageSrc(value);
                // we are running on a browser, or using livereload
                // plugin will not function in this case
                this.log('You are running on a browser or using livereload.');
            }
            else {
                if (this.helpers.ValidURL(value)) {
                    this.initialise(value);
                }
                else {
                    this.setImageSrc(value);
                    this.log(value + ' is not a remote URL');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheComponent.prototype, "highResSrc", {
        get: function () {
            return this.imageViewerBigSrcUrl;
        },
        set: function (value) {
            this.imageViewerBigSrcUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheComponent.prototype, "fallbackUrl", {
        get: function () {
            return this.imageCacheConfig.fallbackUrl;
        },
        set: function (src) {
            this.fallback = src;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheComponent.prototype, "spinnerName", {
        get: function () {
            return this.imageCacheConfig.spinnerName;
        },
        set: 
        //spinnerNameString
        function (text) {
            this.spinnerNameString = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheComponent.prototype, "spinnerColor", {
        get: function () {
            return this.imageCacheConfig.spinnerColor;
        },
        set: function (text) {
            this.spinnerColorString = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheComponent.prototype, "alt", {
        get: function () {
            return this.imageCacheConfig.alt;
        },
        set: function (text) {
            this.altString = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheComponent.prototype, "showPreview", {
        get: function () {
            return this.showPrev;
        },
        set: function (bool) {
            this.showPrev = (bool == "true" || bool == true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheComponent.prototype, "enableSpinner", {
        get: function () {
            return this.imageCacheConfig.spinnerEnabled;
        },
        set: function (bool) {
            this.imageCacheConfig.spinnerEnabled = (bool == "true" || bool == true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageCacheComponent.prototype, "isAvatar", {
        set: function (bool) {
            this.fallback = ((bool == "true" || bool == true) ? this.avatarbase64 : this.fallback);
        },
        enumerable: true,
        configurable: true
    });
    IonicImageCacheComponent.prototype.presentImage = function (event, realImage) {
        var _this = this;
        if (this.showPrev == true || this.showPrev == "true") {
            //Change this to add high res image
            var config = { fullResImage: (this.imageViewerBigSrcUrl || this.srcUrl), onCloseCallback: null, enableBackdropDismiss: null };
            var imageViewer = this._imageViewerCtrl.create(realImage, config);
            imageViewer.present();
            imageViewer.onDidDismiss(function (e) {
                _this.log(e, "Image viewer closed");
            });
        }
        this.clicked.emit({ clickReturnObj: this.clickReturnObj });
    };
    IonicImageCacheComponent.prototype.setImageSrc = function (nativeURL, entry) {
        var _this = this;
        if (nativeURL === void 0) { nativeURL = null; }
        if (entry === void 0) { entry = null; }
        var url = entry == null ? nativeURL : entry.nativeURL;
        if (this.platform.is("cordova")) {
            if (this.platform.is("ios")) {
                url = this.helpers.safeiOSNativeURL(url);
            }
        }
        this.ngZone.run(function () {
            _this.srcUrl = url;
            setTimeout(function () {
                _this.loaded.emit(_this.srcUrl);
            }, _this.helpers.randomIntFromInterval(300, 700));
        });
    };
    IonicImageCacheComponent.prototype.imageOnLoad = function () {
        var _this = this;
        setTimeout(function () {
            var realImg = _this.realImage.nativeElement;
            realImg.addEventListener('loaded', function (e) {
                //this.log("image loaddd");
                //this.log("image loaddd");
                _this.loaded.emit(_this.srcUrl);
            }, false);
        }, 500);
    };
    IonicImageCacheComponent.prototype.saveImageToFilesystem = function (src) {
        var _this = this;
        this.log("Fetch from server.......", src);
        this.helpers.downloadImage(src, this.platform, this.cache_directory_name, this.imageCacheConfig.trustAllHosts).then(function (entry) {
            _this.setImageSrc(entry.nativeURL, entry);
            _this.log("File saved", entry);
        }).catch(function (err) {
            _this.log("Failed to saved file to directory", err);
            _this.setImageSrc(src);
        });
    };
    IonicImageCacheComponent.prototype.clearAllCache = function () {
        var _this = this;
        if (this.activeDirectory) {
            this.helpers.clearAllCache(this.cache_directory_name, this.platform).then(function (removeResult) {
                _this.log(removeResult);
            });
        }
    };
    IonicImageCacheComponent.prototype.verifyFileAvailability = function (src, dEntry) {
        var _this = this;
        this.helpers.getFile(dEntry, this.helpers.extractPath(src), src).then(function (entry) {
            if (entry != null) {
                _this.setImageSrc(null, entry);
            }
            else {
                _this.saveImageToFilesystem(src);
            }
        });
    };
    IonicImageCacheComponent.prototype.initialise = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.helpers.resolveDirectoryUrl(this.cache_directory_name, this.platform).then(function (dEntry) {
                            if (dEntry != null) {
                                _this.activeDirectory = dEntry;
                                _this.log(dEntry);
                                _this.verifyFileAvailability(src, dEntry);
                            }
                            else {
                                _this.saveImageToFilesystem(src);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IonicImageCacheComponent.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.imageCacheConfig.enableDebugMode) {
            console.log.apply(console, args);
        }
    };
    IonicImageCacheComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ionic-image-cache',
                    template: "\n  <div class=\"ionic-image-cache-prelative ionic-image-cache-container\">\n    <div *ngIf=\"((!srcUrl) && this.imageCacheConfig.spinnerEnabled)\" text-center class=\"ionic-image-cache-absolute-center ionic-image-cache-progress-div\">\n      <ion-spinner [color]=\"spinnerColorString\" [name]=\"spinnerNameString\"></ion-spinner>\n    </div>\n    <img #realImage *ngIf=\"srcUrl\" [src]=\"srcUrl\" [alt]=\"altString\" class=\"{{imgCssClass}}\" (click)=\"presentImage($event, realImage)\" />\n    <img *ngIf=\"!srcUrl\" [src]=\"fallback\">\n  </div>\n",
                    styles: [
                        "\n  ionic-image-cache .ionic-image-cache-container {\n    min-height: 20px;\n  }\n  ionic-image-cache.img-circle img {\n    border-radius: 50%;\n  }\n  ionic-image-cache.img-thumbnail img {\n    border-radius: 6px;\n  }\n  ionic-image-cache .ionic-image-cache-progress-div {\n    height: 30px;\n  }\n  ionic-image-cache img {\n    max-width: 100%;\n    max-height: 100%;\n    width: 100%;\n  }\n  ionic-image-cache img .width100percent {\n    width: 100%;\n  }\n  ionic-image-cache .ionic-image-cache-prelative {\n    position: relative;\n  }\n  ionic-image-cache .ionic-image-cache-absolute-center {\n    margin: auto;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n  }\n  ionic-image-cache .ionic-image-cache-display-flex {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  ionic-image-cache .ionic-image-cache-display-flex.flex-valign-center {\n    align-items: center;\n  }\n  ionic-image-cache .ionic-image-cache-display-flex.flex-valign-start {\n    align-items: flex-start;\n  }\n  ionic-image-cache .ionic-image-cache-display-flex.flex-valign-end {\n    align-items: flex-end;\n  }\n  ionic-image-cache .ionic-image-cache-display-flex.flex-halign-center {\n    justify-content: center;\n  }\n  ionic-image-cache .ionic-image-cache-display-flex.flex-halign-start {\n    justify-content: flex-start;\n  }\n  ionic-image-cache .ionic-image-cache-display-flex.flex-halign-end {\n    justify-content: flex-end;\n  }\n  ionic-image-cache .ionic-image-cache-display-flex.no-wrap {\n    flex-wrap: nowrap;\n  }\n"
                    ],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    IonicImageCacheComponent.ctorParameters = function () { return [
        { type: ImageViewerController, },
        { type: NgZone, },
        { type: Platform, },
        { type: IonicImageCacheConfig, },
        { type: IonicImageCacheHelperProvider, },
    ]; };
    IonicImageCacheComponent.propDecorators = {
        "imgCssClass": [{ type: Input, args: ["imgCssClass",] },],
        "realImage": [{ type: ViewChild, args: ["realImage",] },],
        "src": [{ type: Input },],
        "clickReturnObj": [{ type: Input, args: ["clickReturnObj",] },],
        "highResSrc": [{ type: Input },],
        "fallbackUrl": [{ type: Input },],
        "spinnerName": [{ type: Input },],
        "spinnerColor": [{ type: Input },],
        "alt": [{ type: Input },],
        "showPreview": [{ type: Input },],
        "enableSpinner": [{ type: Input },],
        "isAvatar": [{ type: Input },],
        "loaded": [{ type: Output },],
        "clicked": [{ type: Output },],
    };
    return IonicImageCacheComponent;
}());
export { IonicImageCacheComponent };
//# sourceMappingURL=ionic-image-cache.js.map