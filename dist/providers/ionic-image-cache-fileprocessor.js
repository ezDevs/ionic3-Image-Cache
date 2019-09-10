import { Events } from 'ionic-angular';
import { Injectable, NgZone } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
var IonicImageCacheHelperProvider = /** @class */ (function () {
    function IonicImageCacheHelperProvider(event, transfer, file, ngZone) {
        this.event = event;
        this.transfer = transfer;
        this.file = file;
        this.ngZone = ngZone;
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
                console.log("Create directory fail", err);
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
                console.log("Check directory", err);
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
            // console.log(targetPath);
            // console.log(targetPath);
            _this.file.resolveDirectoryUrl(targetPath).then(function (dEntry) {
                resolver(dEntry);
            }).catch(function (err) {
                resolver(null);
                console.log("resolveDirectoryUrl", err);
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
                console.log("Clear directory", err);
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
                console.log("Get all files in folder ", err);
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
                // console.log("File exists");
                resolver({ yesNo: result, fileURL: targetPath + "/" + filename });
            }).catch(function (err) {
                resolver({ yesNo: false, fileURL: targetPath + "/" + filename });
                console.log("Get if file is availbale ", err);
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.getFile = function (DEntry, fileName) {
        var _this = this;
        return new Promise(function (resolver) {
            _this.file.getFile(DEntry, fileName, { create: false }).then(function (entry) {
                // console.log("File exists");
                resolver(entry);
            }).catch(function (err) {
                resolver(null);
                console.log("Get file failed ", fileName, err);
            });
        });
    };
    IonicImageCacheHelperProvider.prototype.extractPath = function (remoteURL, asFilename) {
        if (asFilename === void 0) { asFilename = true; }
        var path = (new URL(remoteURL)).pathname;
        if (asFilename) {
            path = this.replace("/", "", path);
            path = this.replace(" ", "", path);
        }
        // console.log(path);
        return path;
    };
    IonicImageCacheHelperProvider.prototype.ValidURL = function (str) {
        var result = str == undefined ? false : ((str.indexOf("http://") > -1 || str.indexOf("https://") > -1) && str.indexOf("data:image/") < 0);
        // console.log(result, str);
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
                // console.log("saving to IOS");
                targetPath = _this.file.documentsDirectory + localFolderPath + "/" + fpath;
            }
            else if (platform.is('android')) {
                targetPath = _this.file.externalDataDirectory + localFolderPath + "/" + fpath;
            }
            fileTransfer.download(fileurl, targetPath, trustAll).then(function (entry) {
                resolver(entry);
            }, function (error) {
                // handle error
                console.log(error);
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
    IonicImageCacheHelperProvider.prototype.addHours = function (date, hours) {
        date.setHours(date.getHours() + hours);
        return date;
    };
    IonicImageCacheHelperProvider.prototype.addMinutes = function (date, minutes) {
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    };
    IonicImageCacheHelperProvider.prototype.safeiOSNativeURL = function (url) {
        var finalURL = url.replace(/^file:\/\//, '');
        return finalURL;
    };
    IonicImageCacheHelperProvider.prototype.escapeRegExp = function (str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    };
    IonicImageCacheHelperProvider.prototype.replace = function (find, replace, fullstr) {
        return fullstr.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    };
    IonicImageCacheHelperProvider.prototype.getFilename = function (url, withExt) {
        if (withExt === void 0) { withExt = true; }
        var fileName = url.substring(url.lastIndexOf('/') + 1);
        var ext = "." + this.getFileExtentions(url);
        return withExt ? fileName : "" + fileName.replace(ext, "");
    };
    IonicImageCacheHelperProvider.prototype.getFileExtentions = function (url) {
        return this.getValidExtension(url.split('.').pop());
    };
    IonicImageCacheHelperProvider.prototype.getValidExtension = function (ext) {
        var validExtensions = ['png', 'jpg', 'jpeg'];
        return validExtensions.indexOf(ext) > -1 ? ext : 'jpg';
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
    ]; };
    return IonicImageCacheHelperProvider;
}());
export { IonicImageCacheHelperProvider };
//# sourceMappingURL=ionic-image-cache-fileprocessor.js.map