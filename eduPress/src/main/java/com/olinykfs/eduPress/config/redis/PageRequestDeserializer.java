package com.olinykfs.eduPress.config.redis;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.data.domain.PageRequest;

import java.io.IOException;

public class PageRequestDeserializer extends StdDeserializer<PageRequest> {

    public PageRequestDeserializer() {
        super(PageRequest.class);
    }

    @Override
    public PageRequest deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        JsonNode node = p.getCodec().readTree(p);
        int pageNumber = node.has("pageNumber") ? node.get("pageNumber").asInt() : 0;
        int pageSize = node.has("pageSize") ? node.get("pageSize").asInt() : 0;
        return PageRequest.of(pageNumber, pageSize);
    }
}
