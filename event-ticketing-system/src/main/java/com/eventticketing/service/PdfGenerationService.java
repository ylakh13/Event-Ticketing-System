package com.eventticketing.service;

import com.eventticketing.entity.Ticket;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;


@Service
public class PdfGenerationService {

    public byte[] generateTicketPdf(Ticket ticket) {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(outputStream);

        PdfDocument pdfDocument = new PdfDocument(writer);

        Document document = new Document(pdfDocument);

        byte[] qrCodeBytes = generateQrCodeImage(
                ticket.getUniqueCode()
        );

        ImageData imageData =
                ImageDataFactory.create(qrCodeBytes);

        Image qrImage = new Image(imageData);

        qrImage.setWidth(150);
        qrImage.setHeight(150);

        document.add(new Paragraph("Event Ticket"));

        document.add(qrImage);

        document.add(new Paragraph(
                "Ticket Code: " + ticket.getUniqueCode()
        ));

        document.add(
                new Paragraph(
                        "Event: " + ticket.getEvent().getTitle()
                )
        );

        document.add(
                new Paragraph(
                        "Date & Time: " + ticket.getEvent().getDateTime()
                )
        );

        document.add(
                new Paragraph(
                        "Location: " + ticket.getEvent().getLocation()
                )
        );

        document.add(
                new Paragraph(
                        "Attendee Name: " + ticket.getOrder().getUser().getName()
                )
        );

        document.add(
                new Paragraph(
                        "Attendee Email: " + ticket.getOrder().getUser().getEmail()
                )
        );

        document.close();

        return outputStream.toByteArray();

    }

    private byte[] generateQrCodeImage(String text) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();

            BitMatrix bitMatrix = qrCodeWriter.encode(
                    text,
                    BarcodeFormat.QR_CODE,
                    250,
                    250
            );

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            MatrixToImageWriter.writeToStream(
                    bitMatrix,
                    "PNG",
                    outputStream
            );

            return outputStream.toByteArray();
        } catch (WriterException | IOException e) {
            throw new RuntimeException(
                    "Failed to generate QR code",
                    e
            );
        }
    }
}
