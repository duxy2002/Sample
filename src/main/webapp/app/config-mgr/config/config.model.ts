import { BaseEntity } from '../../shared';

export const enum ConfigDBStatus {
    IN_USING = 1,
    DELETED = 0
}

export class ConfigDBModel implements BaseEntity {
    constructor(
        public id?: number,
        public typeId?: number,
        public typeName?: string,
        public ynName?: string,
        public yn?: ConfigDBStatus,
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
