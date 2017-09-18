import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MdDatepickerModule } from '@angular/material';

import { StockSharedModule } from '../shared';
import { TdLoadingService } from '@covalent/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
    MainComponent,
} from './';

@NgModule({
    imports: [
        StockSharedModule,
        NgxChartsModule,
        MdDatepickerModule,
    ],
    declarations: [
        MainComponent,
    ],
    providers: [
        TdLoadingService,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MainModule {
}
