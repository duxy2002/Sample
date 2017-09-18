import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { AppComponent } from './app.component';
import { appRoutes, appRoutingProviders } from './app.route';

import { StockSharedModule } from './shared/shared.module';
import { Ng2Webstorage } from 'ng2-webstorage';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { ConfigManagementModule } from './config-mgr/config-mgr.module';
import { MainComponent } from './main/main.component';
import { RequestInterceptor } from './config/interceptors/request.interceptor';
import { MOCK_API } from './config/api.config';
import { MainModule } from './main/main.module';

const httpInterceptorProviders: Type<any>[] = [
    RequestInterceptor,
];
export function getAPI(): string {
    return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
      appRoutes,
    BrowserModule,
    BrowserAnimationsModule,
      Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
      StockSharedModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
      ConfigManagementModule,
      MainModule
  ], // modules needed to run this module
  providers: [
      customHttpProvider(),
      appRoutingProviders,
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
