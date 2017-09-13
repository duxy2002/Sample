import { Component, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import { SNACK_BAR_SHOW_DURATION } from '../shared/index';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { EVENT_ACTIVATE_CONFIG_ITEM } from '../shared/constants/event.constants';
import { ConfigManagementService } from './config-mgr.service';
import { ResponseWrapper } from '../shared/model/response-wrapper.model';
import { ResponseResult } from '../shared/model/response-result';
import { ConfigMgrModel, ConfigStatus } from './config-mgr.model';

@Component({
    selector: 'qs-users',
    templateUrl: './config-mgr.component.html',
    styleUrls: ['./config-mgr.component.scss'],
})
export class ConfigManagementComponent implements AfterViewInit, OnInit, OnDestroy {

    data: ConfigMgrModel[];
    filteredData: ConfigMgrModel[];
    routeData: any;
    alertErrorMessages: String[] = [];

    constructor(private _titleService: Title,
                private _loadingService: TdLoadingService,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private _dialogService: TdDialogService,
                private _snackBarService: MdSnackBar,
                private _changeDetectorRef: ChangeDetectorRef,
                public media: TdMediaService,
                public configManagementService: ConfigManagementService) {
    }

    ngOnInit(): void {
        this._titleService.setTitle('配置项管理');
        // this.registerChangeInConfigItems();
        this.load();
    }

    // private registerChangeInConfigItems() {
    //     this.eventManager.subscribe(EVENT_ACTIVATE_CONFIG_ITEM, (response) => {
    //         this._snackBarService.open(response.content, null, {
    //             duration: SNACK_BAR_SHOW_DURATION,
    //         });
    //     });
    // }

    ngAfterViewInit(): void {
        // broadcast to all listener observables when loading the ge
        this.media.broadcast();
        // force a new change detection cycle since change detections
        // have finished when `ngAfterViewInit` is executed
        this._changeDetectorRef.detectChanges();
    }

    filterConfigs(typeName = ''): void {
        this.filteredData = this.data.filter((config: ConfigMgrModel) => {
            return config.typeName.toLowerCase().indexOf(typeName.toLowerCase()) > -1;
        });
    }

    ngOnDestroy() {
        if (this.routeData) {
            this.routeData.unsubscribe();
        }
    }

    async load(): Promise<void> {
            this._loadingService.register('configs.list');
            // this.users = await this._userService.query().toPromise();

        this.routeData = this.configManagementService.find(999).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(result: ResponseResult, headers) {
        if (result.success) {
            this.data = result.data;
            this.filteredData = [];
            this.data.forEach((config: any) => {
                this.filteredData.push(Object.assign({}, config));
            });
        } else {
            this.alertErrorMessages = [];
            let message = result.code + ' ' + result.message;
            this.alertErrorMessages.push(message);
        }
        this._loadingService.resolve('configs.list');
    }

    private onError(error) {
        this._loadingService.resolve('configs.list');
        this.alertService.error(error.message, null, null);
    }

    activate(id: number, name: string): void {
        this._dialogService
            .openConfirm({
                message: '您想使用该配置项: '  + name + '吗?',
                title: '基础服务组平台',
                acceptButton: '确认',
                cancelButton: '取消'
            })
            .afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this._activate(id, name);
            } else {
                // DO SOMETHING ELSE
            }
        });
    }
    public isInUsing(status: number): boolean {
        return (status === ConfigStatus.IN_USING);
    }
    private async _activate(id: number, name: string): Promise<void> {
        try {

            // await this._userService.delete(id).toPromise();

            this.data.map((config: ConfigMgrModel) => {
                if (config.id === id) {
                    config.yn = ConfigStatus.IN_USING;
                } else if (config.yn === ConfigStatus.IN_USING) {
                    config.yn = ConfigStatus.DELETED;
                }
            });
            this.filteredData.map((config: ConfigMgrModel) => {
                if (config.id === id) {
                    config.yn = ConfigStatus.IN_USING;
                } else if (config.yn === ConfigStatus.IN_USING) {
                    config.yn = ConfigStatus.DELETED;
                }
            });
            // this._snackBarService.open('成功启用了配置项：' + name + ' !', null);

            this._snackBarService.open('成功启用了配置项：' + name + ' !', null, {
                duration: SNACK_BAR_SHOW_DURATION,
            });

        } catch (error) {
            this._dialogService.openAlert({message: '在启用配置项：' + name + ' 时发生了错误!' });
        } finally {
            //
        }
    }

}
