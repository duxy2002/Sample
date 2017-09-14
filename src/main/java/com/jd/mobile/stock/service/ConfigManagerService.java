package com.jd.mobile.stock.service;

import com.jd.config.manager.domain.ConfigDB;
import com.jd.config.manager.export.result.Result;

import java.util.List;

public interface ConfigManagerService {

    /**
     * 得到所有的typeId
     */
    List<Integer> getAllTypeId();

    /**
     * 根据typeId获取配置列表,没有返回xml数据
     * @param typeId
     * @return
     */
    Result getConfigListByTypeId(Integer typeId);

    /**
     * 根据typeId获取配置列表，返回数据中包含xml数据
     * @param typeId
     * @return
     */
    Result getConfigListByTypeIdWithXml(Integer typeId);

    /**
     * 根据typeId返回“所有”id列表
     * @param typeId
     * @return
     */
    Result getIdListByTypeId(Integer typeId);

    /**
     * 根据typeId和id返回配置
     * @param typeId
     * @param id
     * @return
     */
    Result getConfigDBByTypeIdAndId(Integer typeId, Integer id);

    /**
     * 生效配置，此处configDB参数对应属性必须传，typeId，id，operator
     * @param configDB
     * @return
     */
    Result updateConfigValid(ConfigDB configDB);
}
