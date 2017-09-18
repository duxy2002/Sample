import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    MdSnackBarModule, MdIconModule, MdListModule, MdTooltipModule, MdCardModule, MdButtonModule,
    MdToolbarModule, MdInputModule, MdSlideToggleModule, MdMenuModule, MdChipsModule
} from '@angular/material';

import { CovalentLoadingModule, CovalentDialogsModule, CovalentMediaModule, CovalentLayoutModule,
    CovalentSearchModule, CovalentCommonModule } from '@covalent/core';

import { ConfigComponent } from './config.component';

import { ConfigService } from './config.service';
import { StockSharedModule } from '../../shared/shared.module';
import { ConfigManagementService } from '../config-mgr.service';

@NgModule({
    declarations: [
        ConfigComponent,
        // UsersFormComponent,
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        // angular modules
        CommonModule,
        FormsModule,
        RouterModule,
        // material modules
        MdSnackBarModule,
        MdIconModule,
        MdListModule,
        MdTooltipModule,
        MdCardModule,
        MdButtonModule,
        MdChipsModule,
        MdToolbarModule,
        MdInputModule,
        MdSlideToggleModule,
        MdMenuModule,
        // covalent modules
        CovalentLoadingModule,
        CovalentDialogsModule,
        CovalentMediaModule,
        CovalentLayoutModule,
        CovalentSearchModule,
        CovalentCommonModule,
        // extra
        StockSharedModule
    ], // modules needed to run this module
    providers: [
        ConfigService,
        ConfigManagementService
    ],
})
export class ConfigModule {}
