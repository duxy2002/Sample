package com.jd.mobile.stock.result;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jd.mobile.stock.converter.json.NullStringSerializer;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;


public class StockResult<T> implements Serializable {

    private static final long serialVersionUID = -5296547281614863590L;

    private Integer code = 200;
    private boolean success;
    @JsonSerialize(nullsUsing = NullStringSerializer.class)
    private String message = null;

    private T data;

    public StockResult() {
        super();
    }

    public StockResult(T data) {
        super();
        this.data = data;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    public Integer getCode() {
        return this.code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return this.data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public boolean isSuccess() {
        return this.success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
