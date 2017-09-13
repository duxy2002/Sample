import { Headers } from '@angular/http';

export class ResponseResult {
    constructor(
        public code?: number,
        public success?: boolean,
        public message?: string,
        public data?: any,
    ) { }
}
