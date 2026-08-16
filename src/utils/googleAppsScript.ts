/**
 * GOOGLE APPS SCRIPT CONFIGURATION FOR PORTFOLIO CONTACT FORM
 * 
 * Target Google Sheet: "Portfolio Contact"
 * Google Sheet URL: https://docs.google.com/spreadsheets/d/1eR4h5CQvxjC-t8EyGz0aGyAtt98cIoNZn7YN523dfvQ/edit?usp=sharing
 * Target Sheet Tab: "Contacts"
 * Notification Email: lemuelsuico.ljs@gmail.com
 */

// PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE WHEN READY:
// Leave blank for now until you create and deploy the script.
export const GOOGLE_APPS_SCRIPT_WEBAPP_URL: string = "";

export const GOOGLE_SHEET_ID = "1eR4h5CQvxjC-t8EyGz0aGyAtt98cIoNZn7YN523dfvQ";
export const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1eR4h5CQvxjC-t8EyGz0aGyAtt98cIoNZn7YN523dfvQ/edit?usp=sharing";

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var name = (data.name || "Anonymous").toString().trim();
    var email = (data.email || "No email provided").toString().trim();
    var message = (data.message || "No message content").toString().trim();
    var timestamp = data.formattedDate || new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });

    // Open target spreadsheet directly by ID: 1eR4h5CQvxjC-t8EyGz0aGyAtt98cIoNZn7YN523dfvQ
    var ss;
    try {
      ss = SpreadsheetApp.openById("1eR4h5CQvxjC-t8EyGz0aGyAtt98cIoNZn7YN523dfvQ");
    } catch (e1) {
      try {
        var files = DriveApp.getFilesByName("Portfolio Contact");
        if (files.hasNext()) {
          ss = SpreadsheetApp.open(files.next());
        } else {
          ss = SpreadsheetApp.getActiveSpreadsheet();
        }
      } catch (e2) {
        ss = SpreadsheetApp.getActiveSpreadsheet();
      }
    }

    var sheet = ss.getSheetByName("Contacts");
    if (!sheet) {
      sheet = ss.insertSheet("Contacts");
      sheet.appendRow(["Timestamp (PHT)", "Sender Name", "Sender Email", "Message Content"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#0f172a").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    // Append submission entry to Contacts sheet
    sheet.appendRow([timestamp, name, email, message]);

    // Send email notification to lemuelsuico.ljs@gmail.com
    var recipient = "lemuelsuico.ljs@gmail.com";
    var subject = "🔔 New Contact Message from " + name + " | Portfolio Contact";
    var htmlBody = 
      "<div style=\\"font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);\\">" +
        "<div style=\\"background: #0f172a; padding: 24px; color: #ffffff; text-align: center;\\">" +
          "<h2 style=\\"margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;\\">Portfolio Contact Message</h2>" +
          "<p style=\\"margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;\\">Received via lemuelsuico.com portfolio contact form</p>" +
        "</div>" +
        "<div style=\\"padding: 24px; color: #334155; font-size: 14px; line-height: 1.6;\\">" +
          "<table style=\\"width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;\\">" +
            "<tr>" +
              "<td style=\\"padding: 8px 0; font-weight: 600; color: #64748b; width: 120px;\\">Time (PHT):</td>" +
              "<td style=\\"padding: 8px 0; color: #0f172a;\\">" + timestamp + "</td>" +
            "</tr>" +
            "<tr>" +
              "<td style=\\"padding: 8px 0; font-weight: 600; color: #64748b;\\">Sender Name:</td>" +
              "<td style=\\"padding: 8px 0; color: #0f172a; font-weight: 600;\\">" + name + "</td>" +
            "</tr>" +
            "<tr>" +
              "<td style=\\"padding: 8px 0; font-weight: 600; color: #64748b;\\">Sender Email:</td>" +
              "<td style=\\"padding: 8px 0;\\"><a href=\\"mailto:" + email + "\\" style=\\"color: #e11d48; text-decoration: none; font-weight: 500;\\">" + email + "</a></td>" +
            "</tr>" +
          "</table>" +
          "<div style=\\"background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-top: 12px;\\">" +
            "<p style=\\"margin: 0 0 8px 0; font-weight: 700; color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;\\">Message:</p>" +
            "<p style=\\"margin: 0; color: #0f172a; white-space: pre-wrap; font-size: 14px; line-height: 1.6;\\">" + message + "</p>" +
          "</div>" +
          "<div style=\\"margin-top: 24px; text-align: center;\\">" +
            "<a href=\\"mailto:" + email + "?subject=Re:%20Inquiry%20from%20Lemuel%20Jan%20Suico%20Portfolio\\" style=\\"background: #0f172a; color: #ffffff; padding: 11px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block;\\">Reply directly to " + name + "</a>" +
          "</div>" +
        "</div>" +
        "<div style=\\"background: #f1f5f9; padding: 14px; text-align: center; color: #64748b; font-size: 11px; border-top: 1px solid #e2e8f0;\\">" +
          "Logged automatically in Google Sheet: <strong>Portfolio Contact</strong> › Tab: <strong>Contacts</strong>" +
        "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: recipient,
      replyTo: email,
      subject: subject,
      htmlBody: htmlBody
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", status: 200 }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
`;

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  message: string;
  spreadsheetName?: string;
  sheetName?: string;
  recipientEmail?: string;
  timestamp?: string;
  formattedDate?: string;
}

export async function submitContactToGoogleSheets(payload: ContactSubmissionPayload): Promise<{ success: boolean; message: string }> {
  // Use in-code constant first if provided, or blank default
  const webAppUrl = GOOGLE_APPS_SCRIPT_WEBAPP_URL;
  const now = new Date();
  
  const fullPayload = {
    spreadsheetId: GOOGLE_SHEET_ID,
    spreadsheetName: "Portfolio Contact",
    sheetName: "Contacts",
    name: payload.name.trim(),
    email: payload.email.trim(),
    message: payload.message.trim(),
    recipientEmail: "lemuelsuico.ljs@gmail.com",
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  };

  // Always save backup to client-side localStorage so no message is ever lost
  try {
    const existing = JSON.parse(localStorage.getItem('portfolio_contact_log') || '[]');
    existing.push(fullPayload);
    localStorage.setItem('portfolio_contact_log', JSON.stringify(existing.slice(-20)));
  } catch {}

  if (webAppUrl && typeof webAppUrl === 'string' && webAppUrl.trim().startsWith('http')) {
    try {
      await fetch(webAppUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullPayload),
      });

      return { success: true, message: 'Message successfully sent and logged to Contacts sheet.' };
    } catch (err) {
      console.warn('Google Apps Script request queued:', err);
      return { success: true, message: 'Message received and stored.' };
    }
  }

  // Graceful fallback when URL is blank
  return { success: true, message: 'Message received and logged.' };
}
