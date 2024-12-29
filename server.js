const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Endpoint to generate QR Code
app.post('/generate-qr', async (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ message: "Text is required for QR code generation." });
    }

    try {
        // Generate QR code and send as base64
        const qrCodeDataUrl = await QRCode.toDataURL(text);
        res.status(200).json({ qrCodeDataUrl });
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).json({ message: "Error generating QR code." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`QR code generator backend running at http://localhost:${port}`);
});
