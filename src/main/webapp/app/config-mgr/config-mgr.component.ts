import {Component, AfterViewInit, OnInit, ChangeDetectorRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';

import {TdLoadingService, TdDialogService, TdMediaService} from '@covalent/core';

import 'rxjs/add/operator/toPromise';

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
                private _dialogService: TdDialogService,
                private _snackBarService: MdSnackBar,
                private _changeDetectorRef: ChangeDetectorRef,
                public media: TdMediaService) {
    }

    ngOnInit(): void {
        this._titleService.setTitle('配置项管理');
        this.load();
    }

    ngAfterViewInit(): void {
        // broadcast to all listener observables when loading the ge
        this.media.broadcast();
        // force a new change detection cycle since change detections
        // have finished when `ngAfterViewInit` is executed
        this._changeDetectorRef.detectChanges();
    }

    filterUsers(displayName = ''): void {
        this.filteredData = this.data.filter((user: any) => {
            return user.displayName.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
        });
    }

    async load(): Promise<void> {
            this._loadingService.register('users.list');
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
                    'status': 'normal'
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
            this.filteredData = Object.assign([], this.data);
            this._loadingService.resolve('users.list');
    }

    delete(id: string): void {
        this._dialogService
            .openConfirm({message: 'Are you sure you want to delete this config?'})
            .afterClosed().toPromise().then((confirm: boolean) => {
            if (confirm) {
                this._delete(id);
            }
        });
    }

    private async _delete(id: string): Promise<void> {
        try {
            this._loadingService.register('users.list');
            // await this._userService.delete(id).toPromise();
            this.data = this.data.filter((config: any) => {
                return config.id !== id;
            });
            this.filteredData = this.filteredData.filter((config: any) => {
                return config.id !== id;
            });
            this._snackBarService.open('Config Deleted', 'Ok');
        } catch (error) {
            this._dialogService.openAlert({message: 'There was an error trying to delete the config'});
        } finally {
            this._loadingService.resolve('users.list');
        }
    }

}
