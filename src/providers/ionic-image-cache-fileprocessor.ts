import { IonicImageCacheConfig } from './ionic-image-cache-config';
import { Platform, Events } from 'ionic-angular';
import { Injectable, NgZone } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry, RemoveResult, DirectoryEntry } from '@ionic-native/file';


@Injectable()
export class IonicImageCacheHelperProvider {

  constructor(public event: Events,
    private transfer: FileTransfer,
    private file: File,
    public ngZone: NgZone,
    public imageCacheConfig: IonicImageCacheConfig,
    ) {

  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createDir(localFolderPath: string, platform: Platform): Promise<DirectoryEntry> {
    return new Promise(resolver => {
      let targetPath: string = "";
      if (platform.is('ios')) {
        targetPath = this.file.documentsDirectory;
      }
      else if (platform.is('android')) {
        targetPath = this.file.externalDataDirectory;
      }
      this.file.createDir(targetPath, localFolderPath, false).then((directory: DirectoryEntry) => {
        resolver(directory);
      }).catch(err => {
        resolver(null);
        this.log("Create directory fail", err);
      });
    });
  }
  checkDir(localFolderPath: string, platform: Platform): Promise<boolean> {
    return new Promise(resolver => {
      let targetPath: string = "";
      if (platform.is('ios')) {
        targetPath = this.file.documentsDirectory;
      }
      else if (platform.is('android')) {
        targetPath = this.file.externalDataDirectory;
      }
      this.file.checkDir(targetPath, localFolderPath).then((yesNo: boolean) => {
        resolver(yesNo);
      }).catch(err => {
        resolver(false);
        this.log("Check directory", err);
        this.createDir(localFolderPath, platform);
      });
    });
  }

  resolveDirectoryUrl(localFolderPath: string, platform: Platform): Promise<DirectoryEntry> {
    return new Promise(resolver => {
      let targetPath: string = "";
      if (platform.is('ios')) {
        targetPath = this.file.documentsDirectory + localFolderPath;
      }
      else if (platform.is('android')) {
        targetPath = this.file.externalDataDirectory + localFolderPath;
      }

      // this.log(targetPath);
      this.file.resolveDirectoryUrl(targetPath).then((dEntry: DirectoryEntry) => {
        resolver(dEntry);
      }).catch(err => {
        resolver(null);
        this.log("resolveDirectoryUrl", err);
        this.createDir(localFolderPath, platform);
      });
    });
  }

  clearAllCache(localFolderPath: string, platform: Platform) {
    return new Promise(resolver => {
      let targetPath: string = "";
      if (platform.is('ios')) {
        targetPath = this.file.documentsDirectory;
      }
      else if (platform.is('android')) {
        targetPath = this.file.externalDataDirectory;
      }
      this.file.removeRecursively(targetPath, localFolderPath).then((removeResult: RemoveResult) => {
        resolver(removeResult);
      }).catch(err => {
        this.log("Clear directory", err);
      });
    });

  }

  getFilesInFolder(localFolderPath: string, platform: Platform) {
    return new Promise(resolver => {
      let targetPath: string = "";
      if (platform.is('ios')) {
        targetPath = this.file.documentsDirectory;
      }
      else if (platform.is('android')) {
        targetPath = this.file.externalDataDirectory;
      }
      this.file.listDir(targetPath, localFolderPath).then((entry: Array<FileEntry>) => {
        resolver(entry);
      }).catch(err => {
        this.log("Get all files in folder ", err);
      });
    });

  }

  checkFile(localFolderPath: string, platform: Platform, filename: string) {
    return new Promise(resolver => {
      let targetPath: string = "";
      if (platform.is('ios')) {
        targetPath = this.file.documentsDirectory + localFolderPath;
      }
      else if (platform.is('android')) {
        targetPath = this.file.externalDataDirectory + localFolderPath;
      }
      this.file.checkFile(targetPath, filename).then((result: boolean) => {
        // this.log("File exists");
        resolver({ yesNo: result, fileURL: targetPath + "/" + filename });
      }).catch(err => {
        resolver({ yesNo: false, fileURL: targetPath + "/" + filename });
        this.log("Get if file is availbale ", err);
      });
    });

  }

  getFile(DEntry: DirectoryEntry, fileName: string, url: string): Promise<FileEntry> {
    return new Promise(resolver => {
      this.file.getFile(DEntry, fileName, { create: false }).then((entry: FileEntry) => {
        this.log("File exists");
        resolver(entry);
      }).catch(err => {
        this.log("Get file failed ", fileName, err);
        this.file.getFile(DEntry, fileName + "." + this.getFileExtentions(url), { create: false }).then((entry: FileEntry) => {
          this.log("File exists 2");
          resolver(entry);
        }).catch(err => {
          resolver(null);
          this.log("Get file failed 2", fileName, err);
        });
      });
    });
  }

  extractPath(remoteURL: string, asFilename: boolean = true) {
    let path: string = (new URL(remoteURL)).pathname;
    if (asFilename) {
      path = path.replace(/[^a-zA-Z0-9]/g, "");
    }
    this.log('path -->', path);
    return path;
  }

  ValidURL(str: string): boolean {
    let result: boolean = str == undefined ? false : ((str.indexOf("http://") > -1 || str.indexOf("https://") > -1) && str.indexOf("data:image/") < 0);
    return result;
  }

  downloadImage(fileurl: string, platform: Platform, localFolderPath: string = "cache_assets", trustAll: boolean = true) {
    return new Promise((resolver, reject) => {
      const fileTransfer: FileTransferObject = this.transfer.create();

      let ext = this.getFileExtentions(fileurl);
      let prog: number = 0;
      let targetPath: string = "";

      let fpath = this.extractPath(fileurl) + "." + ext;
      
      if (platform.is('ios')) {
        targetPath = this.file.documentsDirectory + localFolderPath + "/" + fpath;
      }
      else if (platform.is('android')) {
        targetPath = this.file.externalDataDirectory + localFolderPath + "/" + fpath;
      }

      fileTransfer.download(fileurl, targetPath, trustAll).then((entry: FileEntry) => {
        resolver(entry);
      }, (error) => {
        this.log(error);
        reject(error);
      })
      fileTransfer.onProgress((listener) => {
        this.ngZone.run(() => {
          let tempprog = Math.round(((listener.loaded / listener.total) * 100));
          if (tempprog > prog) {

            this.event.publish('ionicImageCacheprogressCounter', tempprog);
            prog = tempprog;
          }

        })

      })
    });
  }

  safeiOSNativeURL(url: string): string {
    let finalURL = url.replace(/^file:\/\//, '');
    return finalURL;
  }
  
  getFileExtentions(url): string {
    return this.getValidExtension(url.split('.').pop());
  }

  getValidExtension(ext) {
    const validExtensions = ['png', 'jpg', 'jpeg'];
    return validExtensions.indexOf(ext) > -1 ? ext : 'jpg';
  }

  log(...args) {
    if(this.imageCacheConfig.enableDebugMode) {
      console.log(...args);
    }
  }
}
