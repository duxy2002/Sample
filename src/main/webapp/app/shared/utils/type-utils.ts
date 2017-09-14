import { Injectable } from '@angular/core';

@Injectable()
export class TypeUtils {
    // compare the obj's type is equals to the type
    // params: type: object's type. (String,Number,Boolean,Date,Null,Array,Object,Error,RegExp,Undefined....)
    // params: obj : compared object
    // return : ture if the obj's type is equals to  type
    public typeEquals(type: string, obj: any): boolean {
        let clas = Object.prototype.toString.call(obj).slice(8, -1);
        return clas === type;
    }
}
