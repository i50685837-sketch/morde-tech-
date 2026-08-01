import express from 'express';
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Main endpoint to request a pairing code
app.get('/get-pairing-code', async (req, res) => {
    const { number } = req.query; // Expects /get-pairing-code?number=254XXXXXXXXX

    if (!number) {
        return res.status(400).json({ error: "Missing 'number' query parameter." });
    }

    try {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
        
        const sock = makeWASocket({
            auth: state,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false
        });

        // Save credentials when updated
        sock.ev.on('creds.update', saveCreds);

        // Track connection changes
        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log(`Connection closed. Reconnecting: ${shouldReconnect}`);
            } else if (connection === 'open') {
                console.log('✅ Connected successfully!');
            }
        });

        // Wait brief moment for socket to stabilize, then request code
        setTimeout(async () => {
            if (!sock.authState.creds.registered) {
                try {
                    const code = await sock.requestPairingCode(number);
                    return res.json({ success: true, pairingCode: code });
                } catch (err) {
                    return res.status(500).json({ error: "Failed to generate pairing code", details: err.message });
                }
            } else {
                return res.json({ success: true, message: "Device is already registered and connected!" });
            }
        }, 3000);

    } catch (error) {
        res.status(500).json({ error: "Server initialization error", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔗 Get pairing code via: http://localhost:${PORT}/get-pairing-code?number=YOUR_PHONE_NUMBER`);
});
