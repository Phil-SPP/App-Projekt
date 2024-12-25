const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien aus dem Ordner "schenkliste/public" bereitstellen
app.use(express.static(path.join(__dirname, 'schenkliste', 'public')));

// Fallback für alle nicht gefundenen Routen
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'schenkliste', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});
