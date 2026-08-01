import express from 'express';
import cors from 'cors';
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import QRCode from 'qrcode'; // Run 'npm install qrcode' in terminal

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Global variables to temporarily cache authentication assets
let currentQrData = null;
let activeSocket = null;

// Initialize WhatsApp connection state globally
async function initWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    
    activeSocket = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false
    });

    activeSocket.ev.on('creds.update', saveCreds);

    activeSocket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        // Cache the QR code data if emitted by Baileys
        if (qr) {
            try {
                currentQrData = await QRCode.toDataURL(qr);
            } catch (err) {
                console.error("QR Generation error", err);
            }
        }

        if (connection === 'close') {
            currentQrData = null;
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) initWhatsApp();
        } else if (connection === 'open') {
            currentQrData = null;
            console.log('✅ WhatsApp successfully connected!');
        }
    });
}

// Start WhatsApp loop on server spin up
initWhatsApp();

// API 1: Endpoint to fetch the live QR code
app.get('/api/get-qr', (req, res) => {
    if (activeSocket?.authState?.creds?.registered) {
        return res.json({ success: true, connected: true });
    }
    if (currentQrData) {
        return res.json({ success: true, connected: false, qr: currentQrData });
    }
    return res.json({ success: false, message: "Generating connection sequence... Refresh in 3s." });
});

// API 2: Endpoint to fetch a numeric pairing code
app.get('/api/get-pairing-code', async (req, res) => {
    const { number } = req.query;
    if (!number) return res.status(400).json({ error: "Phone number required" });

    if (activeSocket?.authState?.creds?.registered) {
        return res.json({ success: true, message: "Device already linked!" });
    }

    try {
        const code = await activeSocket.requestPairingCode(number);
        return res.json({ success: true, pairingCode: code });
    } catch (err) {
        return res.status(500).json({ error: "Failed to generate pairing code" });
    }
});

app.listen(PORT, () => console.log(`🚀 Live at http://localhost:${PORT}`));
                        
