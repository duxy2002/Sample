package com.jd.mobile.stock.converter.json;


import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;


/**
 * nullのStringをJSONに変換するクラス
 *
 * @see https://dzone.com/articles/how-serialize-javautildate
 * @JsonSerialize(nullusing=NullStringSerializer.class)
 *
 */
public class NullStringSerializer extends JsonSerializer<String> {

    @Override
    public void serialize(String value, JsonGenerator gen, SerializerProvider serializers)
            throws IOException, JsonProcessingException {
        if (null == value) {
            gen.writeString("");
        } else {
            gen.writeString(value);
        }

    }

}
