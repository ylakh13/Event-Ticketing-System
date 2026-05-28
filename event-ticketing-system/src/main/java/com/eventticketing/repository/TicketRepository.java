package com.eventticketing.repository;

import com.eventticketing.entity.Event;
import com.eventticketing.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByEvent(Event event);
}
