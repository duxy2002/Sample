package com.jd.mobile.stock.web.advice;


import javax.servlet.http.HttpServletRequest;

import com.jd.mobile.stock.result.StockResult;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



@RestController
@ControllerAdvice(basePackages = {"com.jd.mobile.stock.web.rest"})
public class RESTfulExceptionHandlerAdvice {

    @ExceptionHandler
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public StockResult<?> defaultExceptionHandler(Throwable ex, HttpServletRequest request) {

        return this.handleRESTfulAPIException(ex);
    }

    private StockResult<?> handleRESTfulAPIException(Throwable ex) {

        // String message = ex.getMessage() != null ? ex.getMessage() : "server internal error";
        StockResult<?> result = new StockResult<>();
        result.setSuccess(false);
        result.setCode(500);
        result.setMessage(ex.getMessage());
        return result;
    }

}
