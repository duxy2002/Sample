import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ConfigMgrModel } from './config-mgr.model';
import { ResponseWrapper, createRequestOption } from './../shared';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseResult } from '../shared/model/response-result';

@Injectable()
export class ConfigManagementService {

    private resourceUrl = 'api/configs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    // create(configMgrModel: ConfigMgrModel): Observable<ConfigMgrModel> {
    //     const copy = this.convert(configMgrModel);
    //     return this.http.post(this.resourceUrl, copy).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         this.convertItemFromServer(jsonResponse);
    //         return jsonResponse;
    //     });
    // }
    //
    // update(configMgrModel: ConfigMgrModel): Observable<ConfigMgrModel> {
    //     const copy = this.convert(configMgrModel);
    //     return this.http.put(this.resourceUrl, copy).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         this.convertItemFromServer(jsonResponse);
    //         return jsonResponse;
    //     });
    // }

    find(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => this.convertResponse(res));
    }

    // delete(id: number): Observable<Response> {
    //     return this.http.delete(`${this.resourceUrl}/${id}`);
    // }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse: ResponseResult = res.json();
        if (jsonResponse.success) {
            let data = jsonResponse.data;
            for (let i = 0; i < data.length; i++) {
                this.convertItemFromServer(data[i]);
            }
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: ConfigMgrModel) {
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(entity.updateTime);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(entity.createTime);
    }

    private convert(entity: ConfigMgrModel): ConfigMgrModel {
        const copy: ConfigMgrModel = Object.assign({}, entity);

        copy.updateTime = this.dateUtils.toDate(entity.updateTime);

        copy.createTime = this.dateUtils.toDate(entity.createTime);
        return copy;
    }
}
