import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Get __filename and __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFile = path.join(__dirname, 'inquiries.xlsx');
const sheetName = 'Inquiries';

//✅ Create Excel file if not exists
function initializeExcelFile() {
    if (!fs.existsSync(excelFile)) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, excelFile);
    }
}

initializeExcelFile();
/**
 * This section is used to save or modify inquiry data in the respective Excel file.
 */
app.post('/inquiry', (req, res) => {
    const { name, email, message } = req.body;

    // Load existing workbook
    try {
        const workbook = XLSX.readFile(excelFile);
        const sheet = workbook.Sheets['Inquiries'];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Add new record (you can check if it exists and modify instead)
        const newEntry = { name, email, message, date: new Date().toLocaleString() };
        data.push(newEntry);

        // Write back to Excel
        const newSheet = XLSX.utils.json_to_sheet(data);
        workbook.Sheets['Inquiries'] = newSheet;
        XLSX.writeFile(workbook, excelFile);

        res.json({ success: true, message: 'Inquiry saved to Excel' });
    } catch (error) {
        console.error('Error saving to Excel:', error.code);
        // res.status(500).json({ success: false, message: 'Failed to save inquiry' });
        if (error.code === 'EBUSY') {
            return res.status(423).json({
                success: false,
                message: 'Excel file is currently open. Please close it before trying again.',
            });
        } else {
            res.status(500).json({ success: false, message: 'Failed to save inquiry' });
        }
    }
});

app.get('/', (req, res) => {
    res.json(`Hi, Your Server running on http://localhost:${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})