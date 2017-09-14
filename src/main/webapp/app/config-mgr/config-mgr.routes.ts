import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigManagementComponent } from './config-mgr.component';
import { CONFIG_ROUTES } from './config/config.routes';

export const CONFIG_MANAGEMENT_ROUTES: Routes = [{
    path: 'config',
    component: ConfigManagementComponent,
    children: [
        ...CONFIG_ROUTES
    ]
}];
