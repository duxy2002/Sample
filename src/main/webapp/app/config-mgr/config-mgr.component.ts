import {Component, AfterViewInit, OnInit, ChangeDetectorRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';

import {TdLoadingService, TdDialogService, TdMediaService} from '@covalent/core';

import 'rxjs/add/operator/toPromise';
import { SNACK_BAR_SHOW_DURATION } from '../shared/index';
import { JhiEventManager } from 'ng-jhipster';
import {EVENT_ACTIVATE_CONFIG_ITEM} from "../shared/constants/event.constants";

@Component({
    selector: 'qs-users',
    templateUrl: './config-mgr.component.html',
    styleUrls: ['./config-mgr.component.scss'],
})
export class ConfigManagementComponent implements AfterViewInit, OnInit {

    data: any[];
    filteredData: any[];

    constructor(private _titleService: Title,
                private _loadingService: TdLoadingService,
                private eventManager: JhiEventManager,
                private _dialogService: TdDialogService,
                private _snackBarService: MdSnackBar,
                private _changeDetectorRef: ChangeDetectorRef,
                public media: TdMediaService) {
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

    filterConfigs(displayName = ''): void {
        this.filteredData = this.data.filter((config: any) => {
            return config.displayName.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
        });
    }

    async load(): Promise<void> {
            this._loadingService.register('configs.list');
            // this.users = await this._userService.query().toPromise();
            this.data = [
                {
                    'id': 52254,
                    'typeId': '999',
                    'displayName': '库房属性缩容配置',
                    'memo': '2017-07-17 打开笛卡尔积',
                    'user': 'liwanyang',
                    'created': '09/04/2017 15:51:16',
                    'lastAccess': '09/04/2017 15:51:28',
                    'status': 'normal'
                },
                {
                    'id': 52255,
                    'typeId': '999',
                    'displayName': '库房属性缩容配置',
                    'memo': '2017-06-22 父单取消操作数量',
                    'user': 'liwanyang',
                    'created': '09/04/2017 15:48:04',
                    'lastAccess': '09/04/2017 15:48:04',
                    'status': 'deleted'
                },
                {
                    'id': 52256,
                    'typeId': '999',
                    'displayName': '库房属性缩容配置',
                    'memo': '2017-06-22 largeApplianceNotUseZt=0,使用在途，关闭笛卡尔积，pop服务获取订单通过库存',
                    'user': 'liwanyang',
                    'created': '07/17/2017 16:01:09',
                    'lastAccess': '08/24/2017 16:03:36',
                    'status': 'deleted'
                },
                {
                    'id': 52257,
                    'typeId': '999',
                    'displayName': '库房属性缩容配置',
                    'memo': '2017-06-22 父单取消操作数量',
                    'user': 'liwanyang',
                    'created': '07/17/2017 16:01:09',
                    'lastAccess': '08/24/2017 16:03:36',
                    'status': 'deleted'
                },
                {
                    'id': 52258,
                    'typeId': '999',
                    'displayName': '库房属性缩容配置',
                    'memo': '2017-06-22 父单取消操作数量',
                    'user': 'liwanyang',
                    'created': '07/17/2017 16:01:09',
                    'lastAccess': '08/24/2017 16:03:36',
                    'status': 'deleted'
                }
            ];

            this.filteredData = [];
            this.data.forEach((config: any) => {
                this.filteredData.push(Object.assign({}, config));
            });
            this._loadingService.resolve('configs.list');
    }

    activate(id: number, name: string): void {
        this._dialogService
            .openConfirm({
                message: '您想使用该配置项: '  + name + '吗?',
                title: '基础服务组平台',
                acceptButton: '确认',
                cancelButton: '取消'
            })
            .afterClosed().toPromise().then((confirm: boolean) => {
            if (confirm) {
                this._activate(id, name);
            }
        });
    }

    private async _activate(id: number, name: string): Promise<void> {
        try {

            // await this._userService.delete(id).toPromise();

            this.data.map((config: any) => {
                if (config.id === id) {
                    config.status = 'normal';
                } else if (config.status === 'normal') {
                    config.status = 'deleted';
                }
            });
            this.filteredData.map((config: any) => {
                if (config.id === id) {
                    config.status = 'normal';
                } else if (config.status === 'normal') {
                    config.status = 'deleted';
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
