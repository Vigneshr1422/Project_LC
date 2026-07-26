import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

/**
 * CORE ENGINE: AUTOMATIC WHATSAPP NOTIFIER VIA META CLOUD API (v25.0)
 * (Using default hello_world template + separate PDF document trigger)
 * * @param {Object} orderData - பிரண்ட்-எண்டில் இருந்து மங்கோடிபி-யில் சேவ் ஆகி வரும் முழு ஆப்ஜெக்ட்
 * @param {String} adminMobile - அட்மினோட வாட்ஸ்அப் நம்பர் (Default: 916380792434)
 */
export const sendAutoWhatsAppInvoices = async (orderData, adminMobile = "916380792434") => {
    try {
        const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
        const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID;
        
        // டெம்ப்ளேட் அப்ரூவ் ஆக லேட் ஆவதால் 'hello_world' பயன்படுத்தப்படுகிறது
        const TEMPLATE_NAME = "hello_world"; 

        if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
            console.error("❌ [Meta API Error] Missing META_ACCESS_TOKEN or META_PHONE_NUMBER_ID in .env");
            return;
        }

        // ==========================================
        // 🎯 🛠️ SMART PHONE NUMBER FORMATTING FIX (91 ADDITION)
        // ==========================================
        // கஸ்டமர் நம்பர் 10 இலக்கமாக இருந்தால் '91' சேர்க்கும் பக்கா பாதுகாப்பு லாஜிக் மச்சான்!
        const rawPhone = orderData.phone ? orderData.phone.toString().trim() : "";
        const customerMobile = rawPhone.startsWith('91') && rawPhone.length > 10
            ? rawPhone 
            : `91${rawPhone}`;

        const formattedDate = orderData.eventDate ? orderData.eventDate.split("-").reverse().join("/") : "—";
        const customerNameClean = orderData.customerName ? orderData.customerName.trim() : "Customer";

        // ==========================================
        // 🎯 STEP 1: ADMIN ALERT MESSAGE (Direct Text)
        // ==========================================
        const adminAlertMessage = 
`🚨 *LAKSHMI CATERING - NEW ORDER ALERT!* 🚨

👤 *Customer Name:* ${customerNameClean}
📞 *Mobile No:* ${rawPhone}
📅 *Event Date:* ${formattedDate} (${orderData.session || "Lunch"})
🍱 *Package Selected:* ${orderData.packageName || "Custom Menu"}
👥 *Total Guests:* ${orderData.guests || 0} Persons
💰 *Total Invoice Value:* ₹${(orderData.grandTotal || 0).toLocaleString("en-IN")}.00
✅ *Advance Received:* ₹${(orderData.advancePaid || 0).toLocaleString("en-IN")}.00
⏳ *Pending Balance:* ₹${(orderData.balanceAmount || 0).toLocaleString("en-IN")}.00

💻 *Log in to Admin Panel / Files Dashboard to download complete kitchen setup sheet.*`;

        console.log(`🚀 Sending Meta WhatsApp Alert to Admin (${adminMobile})...`);
        await axios.post(
            `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: adminMobile,
                type: "text",
                text: { body: adminAlertMessage }
            },
            { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' } }
        );
        console.log(`✅ [Meta WhatsApp] Admin Alert Sent to ${adminMobile}`);

        // ==========================================
        // 🎯 STEP 2: SEND CUSTOMER HELLO_WORLD TEMPLATE
        // ==========================================
        console.log(`🚀 Sending Official Meta Template (hello_world) to Customer Mobile: ${customerMobile}...`);
        await axios.post(
            `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: customerMobile,
                type: "template",
                template: {
                    name: TEMPLATE_NAME,
                    language: { code: "en_US" }
                }
            },
            { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' } }
        );
        console.log(`✅ [Meta WhatsApp] Hello_World Template Sent to Customer!`);

        // ==========================================
        // 🎯 STEP 3: CONVERT BASE64 PDF, UPLOAD & SEND AS SEPARATE DOCUMENT
        // ==========================================
        let rawPdfData = orderData.invoicePdfDriveLink || "";

        if (rawPdfData.includes("base64,")) {
            console.log("🔄 Base64 PDF detected. Processing for separate document message...");
            
            // Base64-ஐ பிரித்து Buffer-ஆக மாற்றி RAM-ல் வைக்கிறோம்
            const base64Content = rawPdfData.split("base64,")[1];
            const pdfBuffer = Buffer.from(base64Content, 'base64');

            // Form Data தயார் செய்கிறோம்
            const form = new FormData();
            form.append('messaging_product', 'whatsapp');
            form.append('file', pdfBuffer, {
                filename: `Invoice_${customerNameClean.replace(/\s+/g, '_')}.pdf`,
                contentType: 'application/pdf',
            });

            // Meta Media API-க்கு அப்லோடு செய்கிறோம்
            const mediaResponse = await axios.post(
                `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/media`,
                form,
                { headers: { ...form.getHeaders(), Authorization: `Bearer ${ACCESS_TOKEN}` } }
            );

            const mediaId = mediaResponse.data.id;
            console.log(`✅ [Meta Media API] PDF Uploaded! Media ID: ${mediaId}`);

            // கஸ்டமருக்கு PDF-ஐ தனி மெசேஜாக (Direct Document Message) அனுப்புகிறோம்
            console.log(`🚀 Sending Invoice PDF Document to Customer Mobile: ${customerMobile}...`);
            await axios.post(
                `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`,
                {
                    messaging_product: "whatsapp",
                    recipient_type: "individual",
                    to: customerMobile,
                    type: "document",
                    document: {
                        id: mediaId,
                        filename: `Invoice_ORD_${rawPhone}.pdf`
                    }
                },
                { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' } }
            );
            console.log(`✅ [Meta WhatsApp] Real PDF Invoice Sent to Customer!`);

        } else {
            console.log("⚠️ [WhatsApp Warning] Base64 PDF string missing. Skipped PDF sending.");
        }

    } catch (error) {
        console.error("❌ [Meta WhatsApp Critical Error]:");
        if (error.response) {
            console.error(JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
    }
};