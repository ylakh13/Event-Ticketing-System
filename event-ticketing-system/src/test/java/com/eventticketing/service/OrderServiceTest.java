package com.eventticketing.service;

import com.eventticketing.entity.*;

import com.eventticketing.repository.*;

import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private PdfGenerationService pdfGenerationService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private OrderService orderService;

    @Test
    void handleSuccessfulPayment_shouldCreateOrderAndTickets() {
        Event event = Event.builder()
                .id(1L)
                .title("Music Concert")
                .ticketPrice(BigDecimal.valueOf(500))
                .totalTicketsAvailable(100)
                .ticketsSold(10)
                .build();

        User user = User.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .build();

        when(userRepository.findByEmail("john@example.com"))
                .thenReturn(user);

        when(pdfGenerationService.generateTicketPdf(any()))
                .thenReturn(new byte[0]);

        when(eventRepository.findByIdForUpdate(1L))
                .thenReturn(Optional.of(event));

        orderService.handleSuccessfulPayment(
                "1",
                "2",
                "john@example.com"
        );

        assertEquals(
                12,
                event.getTicketsSold()
        );

        verify(orderRepository, times(1))
                .save(any(Order.class));

        verify(emailService, times(2))
                .sendTicketEmail(
                        anyString(),
                        anyString(),
                        anyString(),
                        any(),
                        anyString()
                );
    }
}
