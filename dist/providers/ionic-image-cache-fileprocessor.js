import { IonicImageCacheConfig } from './ionic-image-cache-config';
import { Events } from 'ionic-angular';
import { Injectable, NgZone } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
var IonicImageCacheHelperProvider = /** @class */ (function () {
    function IonicImageCacheHelperProvider(event, transfer, file, ngZone, imageCacheConfig) {
        this.event = event;
        this.transfer = transfer;
        this.file = file;
        this.ngZone = ngZone;
        this.imageCacheConfig = imageCacheConfig;
    }
    IonicImageCacheHelperProvider.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    IonicImageCacheHelperProvider.prototype.createDir = function (localFolderPath, platform) {
        var _this = this;
        return new Promise(function (resolver) {
            var targetPath = "";
            if (platform.is('ios')) {
                targetPath = _this.file.documentsDirectory;
            }
            else if (platform.is('android')) {
                targetPath = _this.file.externalDataDirectory;
            }
            _this.file.createDir(targetPath, localFolderPath, false).then(function (directory) {
                resolver(directory);
            }).catch(function (err) {
                resolver(null);
                _this.log("Create directory fail", err);
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.checkDir = function (localFolderPath, platform) {
        var _this = this;
        return new Promise(function (resolver) {
            var targetPath = "";
            if (platform.is('ios')) {
                targetPath = _this.file.documentsDirectory;
            }
            else if (platform.is('android')) {
                targetPath = _this.file.externalDataDirectory;
            }
            _this.file.checkDir(targetPath, localFolderPath).then(function (yesNo) {
                resolver(yesNo);
            }).catch(function (err) {
                resolver(false);
                _this.log("Check directory", err);
                _this.createDir(localFolderPath, platform);
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.resolveDirectoryUrl = function (localFolderPath, platform) {
        var _this = this;
        return new Promise(function (resolver) {
            var targetPath = "";
            if (platform.is('ios')) {
                targetPath = _this.file.documentsDirectory + localFolderPath;
            }
            else if (platform.is('android')) {
                targetPath = _this.file.externalDataDirectory + localFolderPath;
            }
            // this.log(targetPath);
            // this.log(targetPath);
            _this.file.resolveDirectoryUrl(targetPath).then(function (dEntry) {
                resolver(dEntry);
            }).catch(function (err) {
                resolver(null);
                _this.log("resolveDirectoryUrl", err);
                _this.createDir(localFolderPath, platform);
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.clearAllCache = function (localFolderPath, platform) {
        var _this = this;
        return new Promise(function (resolver) {
            var targetPath = "";
            if (platform.is('ios')) {
                targetPath = _this.file.documentsDirectory;
            }
            else if (platform.is('android')) {
                targetPath = _this.file.externalDataDirectory;
            }
            _this.file.removeRecursively(targetPath, localFolderPath).then(function (removeResult) {
                resolver(removeResult);
            }).catch(function (err) {
                _this.log("Clear directory", err);
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.getFilesInFolder = function (localFolderPath, platform) {
        var _this = this;
        return new Promise(function (resolver) {
            var targetPath = "";
            if (platform.is('ios')) {
                targetPath = _this.file.documentsDirectory;
            }
            else if (platform.is('android')) {
                targetPath = _this.file.externalDataDirectory;
            }
            _this.file.listDir(targetPath, localFolderPath).then(function (entry) {
                resolver(entry);
            }).catch(function (err) {
                _this.log("Get all files in folder ", err);
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.checkFile = function (localFolderPath, platform, filename) {
        var _this = this;
        return new Promise(function (resolver) {
            var targetPath = "";
            if (platform.is('ios')) {
                targetPath = _this.file.documentsDirectory + localFolderPath;
            }
            else if (platform.is('android')) {
                targetPath = _this.file.externalDataDirectory + localFolderPath;
            }
            _this.file.checkFile(targetPath, filename).then(function (result) {
                // this.log("File exists");
                resolver({ yesNo: result, fileURL: targetPath + "/" + filename });
            }).catch(function (err) {
                resolver({ yesNo: false, fileURL: targetPath + "/" + filename });
                _this.log("Get if file is availbale ", err);
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.getFile = function (DEntry, fileName, url) {
        var _this = this;
        return new Promise(function (resolver) {
            _this.file.getFile(DEntry, fileName, { create: false }).then(function (entry) {
                _this.log("File exists");
                resolver(entry);
            }).catch(function (err) {
                _this.log("Get file failed ", fileName, err);
                _this.file.getFile(DEntry, fileName + "." + _this.getFileExtentions(url), { create: false }).then(function (entry) {
                    _this.log("File exists 2");
                    resolver(entry);
                }).catch(function (err) {
                    resolver(null);
                    _this.log("Get file failed 2", fileName, err);
                });
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.extractPath = function (remoteURL, asFilename) {
        if (asFilename === void 0) { asFilename = true; }
        var path = (new URL(remoteURL)).pathname;
        if (asFilename) {
            path = path.replace(/[^a-zA-Z0-9]/g, "");
        }
        this.log('path -->', path);
        return path;
    };
    IonicImageCacheHelperProvider.prototype.ValidURL = function (str) {
        var result = str == undefined ? false : ((str.indexOf("http://") > -1 || str.indexOf("https://") > -1) && str.indexOf("data:image/") < 0);
        return result;
    };
    IonicImageCacheHelperProvider.prototype.downloadImage = function (fileurl, platform, localFolderPath, trustAll) {
        var _this = this;
        if (localFolderPath === void 0) { localFolderPath = "cache_assets"; }
        if (trustAll === void 0) { trustAll = true; }
        return new Promise(function (resolver, reject) {
            var fileTransfer = _this.transfer.create();
            var ext = _this.getFileExtentions(fileurl);
            var prog = 0;
            var targetPath = "";
            var fpath = _this.extractPath(fileurl) + "." + ext;
            if (platform.is('ios')) {
                targetPath = _this.file.documentsDirectory + localFolderPath + "/" + fpath;
            }
            else if (platform.is('android')) {
                targetPath = _this.file.externalDataDirectory + localFolderPath + "/" + fpath;
            }
            fileTransfer.download(fileurl, targetPath, trustAll).then(function (entry) {
                resolver(entry);
            }, function (error) {
                _this.log(error);
                reject(error);
            });
            fileTransfer.onProgress(function (listener) {
                _this.ngZone.run(function () {
                    var tempprog = Math.round(((listener.loaded / listener.total) * 100));
                    if (tempprog > prog) {
                        _this.event.publish('ionicImageCacheprogressCounter', tempprog);
                        prog = tempprog;
                    }
                });
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.safeiOSNativeURL = function (url) {
        var finalURL = url.replace(/^file:\/\//, '');
        return finalURL;
    };
    IonicImageCacheHelperProvider.prototype.getFileExtentions = function (url) {
        return this.getValidExtension(url.split('.').pop());
    };
    IonicImageCacheHelperProvider.prototype.getValidExtension = function (ext) {
        var validExtensions = ['png', 'jpg', 'jpeg'];
        return validExtensions.indexOf(ext) > -1 ? ext : 'jpg';
    };
    IonicImageCacheHelperProvider.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.imageCacheConfig.enableDebugMode) {
            console.log.apply(console, args);
        }
    };
    IonicImageCacheHelperProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    IonicImageCacheHelperProvider.ctorParameters = function () { return [
        { type: Events, },
        { type: FileTransfer, },
        { type: File, },
        { type: NgZone, },
        { type: IonicImageCacheConfig, },
    ]; };
    return IonicImageCacheHelperProvider;
}());
export { IonicImageCacheHelperProvider };
//# sourceMappingURL=ionic-image-cache-fileprocessor.js.map