import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ResponseWrapper } from './../shared';
import { ResponseResult } from '../shared/model/response-result';

@Injectable()
export class ConfigManagementService {

    private resourceUrl = 'api/configs';

    constructor(private http: Http) { }

    findAllTypeId(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl).map((res: Response) => {
            const jsonResponse: ResponseResult = res.json();
            return new ResponseWrapper(res.headers, jsonResponse, res.status);
        });
    }

}
