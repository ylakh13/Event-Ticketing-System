package com.eventticketing.service;

import com.eventticketing.dto.CheckoutRequest;
import com.eventticketing.dto.CheckoutResponse;
import com.eventticketing.dto.TicketResponse;
import com.eventticketing.entity.*;
import com.eventticketing.repository.EventRepository;
import com.eventticketing.repository.OrderRepository;
import com.eventticketing.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final EventRepository eventRepository;

    private final UserRepository userRepository;

    private final OrderRepository orderRepository;

    private final PdfGenerationService pdfGenerationService;

    private final EmailService emailService;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Transactional
    public CheckoutResponse checkout (CheckoutRequest request)
                        throws StripeException {
        Event event = eventRepository.findByIdForUpdate(
                request.getEventId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Event not found with id: " + request.getEventId()
                ));

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        int remainingTickets = event.getTotalTicketsAvailable() - event.getTicketsSold();

        if (remainingTickets < request.getQuantity()) {
            throw new RuntimeException(
                    "Not enough tickets available.");
        }

        BigDecimal totalAmount = event.getTicketPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        Long amountInCents = totalAmount.multiply(BigDecimal.valueOf(100)).longValue();

        Stripe.apiKey = stripeSecretKey;

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String userEmail = authentication.getName();

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amountInCents)
                        .setCurrency("usd")

                        .putMetadata("eventId", String.valueOf(
                                event.getId()
                        ))

                        .putMetadata(
                                "quantity", String.valueOf(
                                        request.getQuantity()
                                )
                        )

                        .putMetadata(
                                "userEmail", userEmail
                        )

                        .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        return CheckoutResponse.builder()
                .clientSecret(
                    paymentIntent.getClientSecret()
                )
                .build();
    }

    @Transactional
    public void handleSuccessfulPayment(String eventId, String quantity, String userEmail) {
        Event event = eventRepository.findByIdForUpdate(
                Long.valueOf(eventId)
        ).orElseThrow(() ->
                new RuntimeException(
                        "Event not found"
                ));

        User user = userRepository.findByEmail(
                userEmail
        );

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        int ticketQuantity = Integer.parseInt(quantity);

        int remainingTickets = event.getTotalTicketsAvailable() - event.getTicketsSold();

        if (remainingTickets < ticketQuantity) {
            throw new RuntimeException(
                    "Not enough tickets available."
            );
        }

        BigDecimal totalAmount = event.getTicketPrice()
                .multiply(
                        BigDecimal.valueOf(
                                ticketQuantity
                        )
                );

        Order order = Order.builder()
                .user(user)
                .totalAmount(totalAmount)
                .status(OrderStatus.PAID)
                .createdAt(LocalDateTime.now())
                .tickets(new ArrayList<>())
                .build();

        List<Ticket> tickets = new ArrayList<>();

        for (int i=0; i<ticketQuantity; i++) {
            Ticket ticket = Ticket.builder()
                    .uniqueCode(UUID.randomUUID().toString())
                    .event(event)
                    .order(order)
                    .build();

            tickets.add(ticket);
        }

        order.setTickets(tickets);

        event.setTicketsSold(
                event.getTicketsSold() + ticketQuantity
        );

        orderRepository.save(order);

        for (Ticket ticket : tickets) {
            byte[] pdfBytes = pdfGenerationService.generateTicketPdf(ticket);

            emailService.sendTicketEmail(
                    user.getEmail(),
                    "Your Ticket for " + event.getTitle(),
                    "Your ticket is attached." + " Please present the QR code at the event entrance.",
                    pdfBytes,
                    "ticket-" + ticket.getUniqueCode() + ".pdf"
            );
        }
    }

    public List<TicketResponse> getMyTickets() {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail);

        if(user == null) {
            throw new RuntimeException("User not found");
        }

        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream()
                .flatMap(order -> order.getTickets().stream())
                .map(ticket -> TicketResponse.builder()
                        .ticketId(ticket.getId())
                        .uniqueCode(ticket.getUniqueCode())
                        .eventTitle(ticket.getEvent().getTitle())
                        .eventDateTime(ticket.getEvent().getDateTime())
                        .eventLocation(ticket.getEvent().getLocation())
                        .orderId(ticket.getOrder().getId())
                        .build())
                .collect(Collectors.toList());
    }
}
