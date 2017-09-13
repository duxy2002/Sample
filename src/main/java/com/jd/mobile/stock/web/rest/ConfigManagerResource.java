package com.jd.mobile.stock.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jd.config.manager.domain.ConfigDB;
import com.jd.config.manager.export.result.Result;
import com.jd.mobile.stock.result.StockResult;
import com.jd.mobile.stock.service.ConfigManagerService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/configs")
public class ConfigManagerResource {
    private final Logger log = LoggerFactory.getLogger(ConfigManagerResource.class);

    private final ConfigManagerService configManagerService;

    public ConfigManagerResource(ConfigManagerService configManagerService) {
        this.configManagerService = configManagerService;
    }

    /**
     * 根据typeId获取配置列表,没有返回xml数据
     * @param typeId
     * @return
     */
    @GetMapping("/{typeId}")
    @Timed
    public ResponseEntity<StockResult<List<ConfigDB>>> getConfigListByTypeId(@PathVariable Integer typeId) {
        StockResult<List<ConfigDB>> stockResult = new StockResult<>();
        Result result = configManagerService.getConfigListByTypeId(typeId);
        stockResult.setCode(result.getCode());
        stockResult.setSuccess(result.isSuccess());
        stockResult.setMessage(result.getMessage());
        stockResult.setData(result.getConfigDBList());
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stockResult));
    }

//    /**
//     * 根据typeId获取配置列表，返回数据中包含xml数据
//     * @param typeId
//     * @return
//     */
//    @GetMapping("/xml/{typeId}")
//    @Timed
//    public Result getConfigListByTypeIdWithXml(@PathVariable Integer typeId) {
//        Result result = configManagerService.getConfigListByTypeIdWithXml(typeId);
//        return result;
//    }
//
//    /**
//     * 根据typeId返回“所有”id列表
//     * @param typeId
//     * @return
//     */
//    @GetMapping("/ids/{typeId}")
//    @Timed
//    public Result getIdListByTypeId(@PathVariable Integer typeId) {
//        Result result = configManagerService.getIdListByTypeId(typeId);
//        return result;
//    }
//
//    /**
//     * 根据typeId和id返回配置
//     * @param typeId
//     * @param id
//     * @return
//     */
//    @GetMapping("/{typeId}/{id}")
//    @Timed
//    public Result getConfigDBByTypeIdAndId(@PathVariable Integer typeId, @PathVariable Integer id) {
//        Result result = configManagerService.getConfigDBByTypeIdAndId(typeId, id);
//        return result;
//    }
//
//    /**
//     * 生效配置，此处configDB参数对应属性必须传，typeId，id，operator
//     * @param configDB
//     * @return
//     */
//    @PutMapping("/configs")
//    @Timed
//    public Result updateConfigValid(@PathVariable ConfigDB configDB) {
//        Result result = configManagerService.updateConfigValid(configDB);
//        return result;
//    }
}
