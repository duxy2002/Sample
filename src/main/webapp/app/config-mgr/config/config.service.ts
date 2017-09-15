import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ConfigDBModel } from './config.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseResult } from '../../shared/model/response-result';
import { TypeUtils } from '../../shared/utils/type-utils';
import * as moment from 'moment';

@Injectable()
export class ConfigService {

    private resourceUrl = 'api/configs';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private typeUtils: TypeUtils) { }

    // create(configMgrModel: ConfigMgrModel): Observable<ConfigMgrModel> {
    //     const copy = this.convert(configMgrModel);
    //     return this.http.post(this.resourceUrl, copy).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         this.convertItemFromServer(jsonResponse);
    //         return jsonResponse;
    //     });
    // }
    //
    update(configDBModel: ConfigDBModel): Observable<ResponseResult> {
        const copy = this.convert(configDBModel);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            if (jsonResponse.success) {
                let data = jsonResponse.data;
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        this.convertItemFromServer(data[i]);
                    }
                }
            }
            return jsonResponse;
        });
    }

    find(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse: ResponseResult = res.json();
        if (jsonResponse.success) {
            let data = jsonResponse.data;
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    this.convertItemFromServer(data[i]);
                }
            }
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: ConfigDBModel) {
        entity.updateTime = moment(entity.updateTime).toDate();
        entity.createTime = moment(entity.createTime).toDate();
        // entity.updateTime = this.dateUtils
        //     .convertDateTimeFromServer(entity.updateTime);
        // entity.createTime = this.dateUtils
        //     .convertDateTimeFromServer(entity.createTime);
    }

    private convert(entity: ConfigDBModel): ConfigDBModel {
        const copy: ConfigDBModel = Object.assign({}, entity);

        if (!this.typeUtils.typeEquals('Date', entity.updateTime)) {
            copy.updateTime = this.dateUtils.toDate(entity.updateTime);
        }

        if (!this.typeUtils.typeEquals('Date', entity.createTime)) {
            copy.createTime = this.dateUtils.toDate(entity.createTime);
        }
        return copy;
    }
}
