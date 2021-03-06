import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'stock-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
      title: '配置项管理',
      route: '/home/config',
      icon: 'settings_applications',
    },
    //   {
    //   title: 'Product Dashboard',
    //   route: '/product',
    //   icon: 'view_quilt',
    // }, {
    //   title: 'Product Logs',
    //   route: '/logs',
    //   icon: 'receipt',
    // }, {
    //   title: 'Manage Users',
    //   route: '/users',
    //   icon: 'people',
    // },
  ];

  constructor(private _router: Router) {}

  // logout(): void {
  //   this._router.navigate(['/user']);
  // }
}
