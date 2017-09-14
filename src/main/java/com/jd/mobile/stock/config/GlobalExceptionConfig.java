package com.jd.mobile.stock.config;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jd.mobile.stock.result.StockResult;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;


@Component
public class GlobalExceptionConfig implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception e) {

        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

        ModelAndView modelAndView = new ModelAndView();

        modelAndView.setView(new MappingJackson2JsonView());
        StockResult<?> result = new StockResult<>();
        result.setSuccess(false);
        result.setCode(500);
        result.setMessage(e.getMessage());
        modelAndView.addObject(result);


        return modelAndView;
    }
}
