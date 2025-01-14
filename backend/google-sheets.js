const { google } = require('googleapis');
const fs = require('fs');

// Load credentials
const KEY_PATH = process.env.GOOGLE_SHEET_KEY_PATH;
const credentials = JSON.parse(fs.readFileSync(KEY_PATH));

// Authorize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function getGoogleSheetData(spreadsheetId, range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
}

module.exports = getGoogleSheetData;
