package com.jd.mobile.stock.service.impl;

import com.jd.config.manager.export.ConfigExport;
import com.jd.mobile.stock.service.ConfigManagerService;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jd.config.manager.domain.ConfigDB;
import com.jd.config.manager.export.result.Result;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class ConfigManagerServiceImpl implements ConfigManagerService {

    private final Logger log = LoggerFactory.getLogger(ConfigManagerServiceImpl.class);

    @Resource(name = "configExport")
    private final ConfigExport configExportService = null;

    @Value("${jsf.consumer.configExport.token.authority}")
    private String token;

    @Value("${jsf.consumer.configExport.typeId}")
    private String typeIds;

    /**
     * 得到权限相对应typeId的集合
     * @return  typeId集合
     */
    public List<Integer> getAllTypeId() {
        List<Integer> results = new ArrayList<>();
        String[] items = StringUtils.split(this.typeIds,",");
        for (String item: items) {

            Integer result = NumberUtils.toInt(StringUtils.trim(item), Integer.MAX_VALUE);
            if (result != Integer.MAX_VALUE) {
                results.add(result);
            }
        }
        return results;
    }

    /**
     * 根据typeId获取配置列表,没有返回xml数据
     * @param typeId
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Result getConfigListByTypeId(Integer typeId) {
        Result result = configExportService.getConfigListByTypeId(typeId, token);
        return result;
    }

    /**
     * 根据typeId获取配置列表，返回数据中包含xml数据
     * @param typeId
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Result getConfigListByTypeIdWithXml(Integer typeId) {
        Result result = configExportService.getConfigListByTypeIdWithXml(typeId, token);
        return result;
    }

    /**
     * 根据typeId返回“所有”id列表
     * @param typeId
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Result getIdListByTypeId(Integer typeId) {
        Result result = configExportService.getIdListByTypeId(typeId, token);
        return result;
    }

    /**
     * 根据typeId和id返回配置
     * @param typeId
     * @param id
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Result getConfigDBByTypeIdAndId(Integer typeId, Integer id) {
        Result result = configExportService.getConfigDBByTypeIdAndId(typeId, id, token);
        return result;
    }

    /**
     * 生效配置，此处configDB参数对应属性必须传，typeId，id，operator
     * @param configDB
     * @return
     */
    @Override
    public Result updateConfigValid(ConfigDB configDB) {
        Result result = configExportService.updateConfigValid(configDB, token);
        return result;
    }

}
