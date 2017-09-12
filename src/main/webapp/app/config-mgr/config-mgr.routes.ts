import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigManagementComponent } from './config-mgr.component';

export const CONFIG_MANAGEMENT_ROUTES: Routes = [{
    path: '',
    children: [{
      path: '',
      component: ConfigManagementComponent,
    },
    //     {
    //   path: 'add',
    //   component: UsersFormComponent,
    // }, {
    //   path: ':id/edit',
    //   component: UsersFormComponent,
    // }
    ],
}];
