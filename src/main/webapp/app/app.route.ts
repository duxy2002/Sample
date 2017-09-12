import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';

import { UserRouteAccessService } from './shared';
import {CONFIG_MANAGEMENT_ROUTES} from './config-mgr/config-mgr.routes';

const routes: Routes = [
    {
        path: 'home',
        component: MainComponent,
        children: [
            ...CONFIG_MANAGEMENT_ROUTES,
        ]
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    }
];

export const appRoutingProviders: any[] = [];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
