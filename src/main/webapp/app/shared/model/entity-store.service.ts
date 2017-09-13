import { Injectable, EventEmitter } from '@angular/core';

import { LocalStorageService } from 'ng2-webstorage';

import { BaseEntity } from './base-entity';
import { STORAGE_KEY_CURRENT_ENTITY } from '../constants/storage.constants';

@Injectable()
export class EntityStoreService {

    constructor(private $storageService: LocalStorageService) { }

    setCurrentEntity(object: BaseEntity) {
        this.$storageService.store(STORAGE_KEY_CURRENT_ENTITY, object);
    }

    getCurrentEntity(): BaseEntity {
        return this.$storageService.retrieve(STORAGE_KEY_CURRENT_ENTITY);
    }

    observeCurrentEntity(): EventEmitter<BaseEntity> {
        return this.$storageService.observe(STORAGE_KEY_CURRENT_ENTITY);
    }

    removeCurrentEntity() {
        this.$storageService.clear(STORAGE_KEY_CURRENT_ENTITY);
    }
}
