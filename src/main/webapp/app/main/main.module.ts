import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MdDatepickerModule } from '@angular/material';

import { SampleSharedModule } from '../shared';
import { TdLoadingService } from '@covalent/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
    MainComponent,
} from './';

@NgModule({
    imports: [
        SampleSharedModule,
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
