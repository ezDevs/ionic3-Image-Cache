import { IonicImageCacheConfig } from './ionic-image-cache-config';
import { Platform, Events } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File, FileEntry, DirectoryEntry } from '@ionic-native/file';
export declare class IonicImageCacheHelperProvider {
    event: Events;
    private transfer;
    private file;
    ngZone: NgZone;
    imageCacheConfig: IonicImageCacheConfig;
    constructor(event: Events, transfer: FileTransfer, file: File, ngZone: NgZone, imageCacheConfig: IonicImageCacheConfig);
    randomIntFromInterval(min: any, max: any): number;
    createDir(localFolderPath: string, platform: Platform): Promise<DirectoryEntry>;
    checkDir(localFolderPath: string, platform: Platform): Promise<boolean>;
    resolveDirectoryUrl(localFolderPath: string, platform: Platform): Promise<DirectoryEntry>;
    clearAllCache(localFolderPath: string, platform: Platform): Promise<{}>;
    getFilesInFolder(localFolderPath: string, platform: Platform): Promise<{}>;
    checkFile(localFolderPath: string, platform: Platform, filename: string): Promise<{}>;
    getFile(DEntry: DirectoryEntry, fileName: string, url: string): Promise<FileEntry>;
    extractPath(remoteURL: string, asFilename?: boolean): string;
    ValidURL(str: string): boolean;
    downloadImage(fileurl: string, platform: Platform, localFolderPath?: string, trustAll?: boolean): Promise<{}>;
    safeiOSNativeURL(url: string): string;
    getFileExtentions(url: any): string;
    getValidExtension(ext: any): any;
    log(...args: any[]): void;
}
