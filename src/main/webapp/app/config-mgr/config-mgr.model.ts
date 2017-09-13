import { BaseEntity } from './../shared';

export const enum ConfigStatus {
    IN_USING = 1,
    DELETED = 0
}

export class ConfigMgrModel implements BaseEntity {
    constructor(
        public id?: number,
        public typeId?: number,
        public typeName?: string,
        public ynName?: string,
        public yn?: ConfigStatus,
        public serializeInfo?: string,
        // Date型
        public updateTime?: any,
        // Date型
        public createTime?: any,
        public cacheSecond?: number,
        public operator?: string,
        public remark?: string,
    ) {
    }
}
