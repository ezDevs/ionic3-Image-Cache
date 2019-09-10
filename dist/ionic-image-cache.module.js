import { IonicImageCacheHelperProvider } from './providers/ionic-image-cache-fileprocessor';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicImageCacheComponent } from './components/ionic-image-cache';
import { IonicImageCacheConfig } from './providers/ionic-image-cache-config';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
var IonicImageCacheModule = /** @class */ (function () {
    function IonicImageCacheModule() {
    }
    IonicImageCacheModule.forRoot = function () {
        return {
            ngModule: IonicImageCacheModule,
            providers: [IonicImageCacheHelperProvider, IonicImageCacheConfig, File, FileTransfer]
        };
    };
    IonicImageCacheModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        IonicModule, IonicImageViewerModule
                    ],
                    declarations: [
                        IonicImageCacheComponent
                    ],
                    exports: [
                        IonicImageCacheComponent
                    ]
                },] },
    ];
    return IonicImageCacheModule;
}());
export { IonicImageCacheModule };
//# sourceMappingURL=ionic-image-cache.module.js.map