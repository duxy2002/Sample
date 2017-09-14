import {Component, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';
import {Router, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import {TdLoadingService, TdDialogService, TdMediaService} from '@covalent/core';

import {SNACK_BAR_SHOW_DURATION} from '../../shared/index';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';
import {ConfigService} from './config.service';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {ResponseResult} from '../../shared/model/response-result';
import {ConfigDBModel, ConfigDBStatus} from './config.model';
import {Subscription} from 'rxjs/Rx';
import {TypeUtils} from '../../shared/utils/type-utils';
import {Observable} from 'rxjs/Observable';
import {ConfigManagementService} from '../config-mgr.service';

@Component({
    selector: 'config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements AfterViewInit, OnInit, OnDestroy {

    data: ConfigDBModel[];
    filteredData: ConfigDBModel[];
    subscriptions: Subscription[] = [];

    alertErrorMessages: String[] = [];
    isSaving: boolean;
    // SEARCH WORD
    searchTerm = '';

    constructor(private _titleService: Title,
                private route: ActivatedRoute,
                private router: Router,
                private _loadingService: TdLoadingService,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private _dialogService: TdDialogService,
                private _snackBarService: MdSnackBar,
                private _changeDetectorRef: ChangeDetectorRef,
                private media: TdMediaService,
                private configService: ConfigService,
                private configManagementService: ConfigManagementService,
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

        let routeSub = this.route.params.subscribe((params) => {
            let typeId = params['id'];
            if (typeId) {
                this.loadAll(typeId);
            } else {
                let routeData = this.configManagementService.findAllTypeId().subscribe(
                    (res: ResponseWrapper) => {
                        let responseResult: ResponseResult = res.json;
                        if (responseResult.success) {
                            let typeIds = responseResult.data;
                            if ((typeIds) && (this.typeUtils.typeEquals('Array', typeIds)) && (typeIds.length > 0)) {
                                this.router.navigate(['/home/config/' + typeIds[0] + '/edit']);
                            } else {
                                this.alertErrorMessages = [];
                                let message = '权限不足，没有相对应的配置ID。请申请权限。';
                                this.alertErrorMessages.push(message);
                            }
                        } else {
                            this.alertErrorMessages = [];
                            let message = '不能取得相对应的配置项ID。请稍等重试。';
                            this.alertErrorMessages.push(message);
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res)
                );
                this.subscriptions.push(routeData);
            }
        });
        this.subscriptions.push(routeSub);
    }

    filterConfigs(typeName = ''): void {
        this.searchTerm = typeName;
        this.filteredData = this.data.filter((config: ConfigDBModel) => {
            return config.typeName.toLowerCase().indexOf(typeName.toLowerCase()) > -1;
        });
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

    async loadAll(typeId?: number): Promise<void> {

        // this._loadingService.register('configs.list');
        // this.users = await this._userService.query().toPromise();

        let routeData = this.configService.find(typeId).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.subscriptions.push(routeData);
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
        // this._loadingService.resolve('configs.list');
    }

    private onError(error) {
        if (error) {
            this.alertErrorMessages = [];
            this.alertErrorMessages.push(error);
        }
        this._loadingService.resolve('configs.list');
        // this.alertService.error(error.message, null, null);
    }

    activate(config: ConfigDBModel): void {
        this._dialogService
            .openConfirm({
                message: '您想使用该配置项: ' + config.typeName + '吗?',
                title: '基础服务组平台',
                acceptButton: '确认',
                cancelButton: '取消'
            })
            .afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this._activate(config);
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    public isInUsing(status: number): boolean {
        return (status === ConfigDBStatus.IN_USING);
    }

    private async _activate(config: ConfigDBModel) {
        this.isSaving = true;
        // await this._userService.delete(id).toPromise();
        let routeData = this.configService.update(config).subscribe(
            (res: ResponseResult) => this.onSaveSuccess(res, config),
            (res: Response) => this.onSaveError(res));
        this.subscriptions.push(routeData);
    }

    private onSaveSuccess(result: ResponseResult, config: ConfigDBModel) {
        if (result.success) {
            this.isSaving = false;
            this.data.map((item: ConfigDBModel) => {
                if (item.id === config.id) {
                    item.yn = ConfigDBStatus.IN_USING;
                } else if (item.yn === ConfigDBStatus.IN_USING) {
                    item.yn = ConfigDBStatus.DELETED;
                }
            });
            this.filteredData.map((item: ConfigDBModel) => {
                if (item.id === config.id) {
                    item.yn = ConfigDBStatus.IN_USING;
                } else if (item.yn === ConfigDBStatus.IN_USING) {
                    item.yn = ConfigDBStatus.DELETED;
                }
            });

            this._snackBarService.open('成功启用了配置项：' + config.typeName + ' !', null, {
                duration: SNACK_BAR_SHOW_DURATION,
            });
        } else {
            this.alertErrorMessages = [];
            let message = result.code + ' ' + result.message;
            this.alertErrorMessages.push(message);
        }
    }

    private onSaveError(error): void {
        this.isSaving = false;
    }
}
