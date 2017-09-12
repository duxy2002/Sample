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

import { ConfigManagementComponent } from './config-mgr.component';

import { CONFIG_MANAGEMENT_ROUTES } from './config-mgr.routes';

@NgModule({
  declarations: [
    ConfigManagementComponent,
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
  ], // modules needed to run this module
  providers: [
  ],
})
export class ConfigManagementModule {}