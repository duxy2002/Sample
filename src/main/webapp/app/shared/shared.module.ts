import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    SampleSharedLibsModule,
    SampleSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    Principal,
    HasAnyAuthorityDirective,
    TypeUtils,
} from './';

@NgModule({
    imports: [
        SampleSharedLibsModule,
        SampleSharedCommonModule
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    providers: [
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe,
        TypeUtils
    ],
    exports: [
        SampleSharedCommonModule,
        HasAnyAuthorityDirective,
        DatePipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SampleSharedModule {}
