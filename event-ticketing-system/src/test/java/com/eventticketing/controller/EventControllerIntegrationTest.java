package com.eventticketing.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(
        properties = {
                "STRIPE_SECRET_KEY=test_key",
                "STRIPE_WEBHOOK_SECRET=test_webhook_secret",
                "MAIL_USERNAME=test@gmail.com",
                "MAIL_PASSWORD=test_password"
        }
)
@AutoConfigureMockMvc
public class EventControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAllEvents_shouldReturn200() throws Exception {
        mockMvc.perform(
                get("/api/events")
        ).andExpect(status().isOk());
    }

}
