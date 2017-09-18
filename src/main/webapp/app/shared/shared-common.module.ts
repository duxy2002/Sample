import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
    StockSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent,
} from './';

import {
    TdLoadingService,
    TdDialogService,
    TdDigitsPipe
} from '@covalent/core';
@NgModule({
    imports: [
        StockSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'zh-cn'
        },
        /** Covalent Service */
        TdLoadingService,
        TdDialogService,
        TdDigitsPipe
    ],
    exports: [
        StockSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class StockSharedCommonModule {}
