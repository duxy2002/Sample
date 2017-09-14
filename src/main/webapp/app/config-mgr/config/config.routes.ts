import { ConfigComponent } from './config.component';

export const CONFIG_ROUTES = [{
    path: '',
    children: [
        {
            path: '',
            component: ConfigComponent,
        },
        {
            path: ':id/edit',
            component: ConfigComponent,
        },
    ]}
];
