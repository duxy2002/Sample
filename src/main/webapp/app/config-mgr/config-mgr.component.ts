import { Component, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ConfigManagementService } from './config-mgr.service';
import { ResponseWrapper } from '../shared/model/response-wrapper.model';
import { ResponseResult } from '../shared/model/response-result';
import { Subscription } from 'rxjs/Rx';
import { TypeUtils } from '../shared/utils/type-utils';

@Component({
    selector: 'config-mgr',
    templateUrl: './config-mgr.component.html',
    styleUrls: ['./config-mgr.component.scss'],
})
export class ConfigManagementComponent implements AfterViewInit, OnInit, OnDestroy {

    subscriptions: Subscription[] = [];

    typeIds: number[] = [];

    constructor(private _titleService: Title,
                private route: ActivatedRoute,
                private _loadingService: TdLoadingService,
                private alertService: JhiAlertService,
                private _changeDetectorRef: ChangeDetectorRef,
                public media: TdMediaService,
                public configManagementService: ConfigManagementService,
                private typeUtils: TypeUtils) {
    }

    ngOnInit(): void {
        this._titleService.setTitle('配置项管理');
        // this.registerChangeInConfigItems();
    }

    ngAfterViewInit(): void {
        // broadcast to all listener observables when loading the ge
        this.media.broadcast();
        // force a new change detection cycle since change detections
        // have finished when `ngAfterViewInit` is executed
        this._changeDetectorRef.detectChanges();

        this.loadAll();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private unsubscribe(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subs: Subscription) => {
                subs.unsubscribe();
            });
            this.subscriptions = undefined;
        }
    }

    async loadAll(): Promise<void> {

        this._loadingService.register('configs.list');
            // this.users = await this._userService.query().toPromise();

        let routeData =  this.configManagementService.findAllTypeId().subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res)
            );
        this.subscriptions.push(routeData);
    }

    private onSuccess(responseResult: ResponseResult, headers) {
        if (responseResult.success) {
            let typeIds = responseResult.data;
            if ((typeIds) && (this.typeUtils.typeEquals('Array', typeIds)) && (typeIds.length > 0)) {
                this.typeIds = typeIds;
            }
        }
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
