package com.eventticketing.controller;

import com.eventticketing.service.OrderService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stripe.model.Event;
import com.google.gson.Gson;

import java.util.Map;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class StripeWebhookController {

    private final OrderService orderService;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader(value = "Stripe-Signature", required = false) String sigHeader
    ) {
        Event event;

        if (webhookSecret != null && !webhookSecret.equals("test_webhook_secret")) {
            try {
                event = Webhook.constructEvent(
                        payload,
                        sigHeader,
                        webhookSecret
                );
            } catch (SignatureVerificationException e) {
                return ResponseEntity.badRequest()
                        .body("Invalid signature");
            }
        } else {
            Gson gson = new Gson();
            event = gson.fromJson(payload, Event.class);
        }

        if ("payment_intent.succeeded".equals(event.getType())) {
            PaymentIntent paymentIntent =
                    (PaymentIntent) event.getDataObjectDeserializer()
                            .getObject()
                            .orElse(null);

            if (paymentIntent != null) {
                Map<String, String> metadata = paymentIntent.getMetadata();
                String eventId = metadata.get("eventId");
                String quantity = metadata.get("quantity");
                String userEmail = metadata.get("userEmail");

                orderService.handleSuccessfulPayment(
                        eventId,
                        quantity,
                        userEmail
                );
            }
        }

        return ResponseEntity.ok("Webhook received");
    }
}