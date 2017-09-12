import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
    SampleSharedLibsModule,
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
        SampleSharedLibsModule
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
        SampleSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class SampleSharedCommonModule {}
