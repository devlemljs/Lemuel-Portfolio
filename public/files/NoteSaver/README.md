#### **NoteSaver**



A quick workflow guide for logging AR follow-up documentation. Built as a plain HTML, CSS, and JavaScript app, no installation, no hosting, no build step. Just open the file in a browser.



What it does:

NoteSaver helps log claim follow-up notes in a consistent format and keeps a running history of invoices worked, all stored locally in the browser.



Main form:
Date of Service (DOS) — required date field
Group# — required dropdown, 137 or 138
Invoice Number — required, numbers only, sized for 11-12 digit invoice numbers
Problem / Action Taken / Resolution — required text area, with a short guide above it on what to enter

A running timer starts once you begin filling out the form, so you can track how long each entry takes.



Done:

Clicking Done validates that all required fields are filled, then shows a formatted output line:

GBC/CONIFER/TPF/DOS: (date)/INV: (group)x(invoice)/(problem/action taken/resolution text)

From that output screen you can:

Copy the formatted line to your clipboard
Reset to return to a blank form for the next entry



Work log:

A small number badge in the header counts how many entries you've completed. Click the number to open the invoice history page, which lists every invoice number logged so far (most recent on top). Clicking an invoice in that list copies it to your clipboard. There's a Clear History option to wipe the log and reset the counter back to 0.



Timely Filing Calculator:

A separate calculator page (opened from the icon in the header) checks whether a claim is within or past its timely filing window:



Enter the relevant dates (Date of Service, and Prv./Lat. Processed Dates if applicable)
Pick a filing limit (30, 45, 60, 90, 120, 180, 365 days) or enter a custom number of days
The result is color-coded:
Within Timely Filing — green
Past Timely Filing — red
Unable to Process (conflicting or incomplete dates) — pastel yellow, with an alert icon
Invalid Date Provided — gray



How to use it:
Download or extract the NoteSaver file(s) to any folder.
Double-click NoteSaber html file to open it in your browser.
No internet connection, installation, or server is required.

Data storage

All data (work-done count, invoice history) is saved locally in your browser's storage. It stays on your machine and does not sync or upload anywhere. Clearing your browser data will also clear this history.



Notes:
Color theme: burgundy (
#800020), cream (
#FFFDD0), white, and black.





#### HIPAA/PHI Data Handling \& Privacy Attestation



NoteSaver is a local documentation tool that does not transmit, upload, or share any data over a network. All information entered into this application — including but not limited to Date of Service, Group Number, Invoice Number, and Problem/Action Taken/Resolution notes — is stored exclusively within the user's own browser via local storage on the device running the application.



No data entered into NoteSaver is sent to any external server, third party, or cloud service. The application does not use APIs, databases, or network requests of any kind to store or retrieve information. All records remain solely on the end user's local machine and are accessible only to that user, unless the device itself is shared or compromised.



Because no Protected Health Information (PHI) leaves the local device or is transmitted externally, NoteSaver does not constitute a HIPAA-covered data transmission or storage system. Users remain responsible for safeguarding their own local device and browser environment in accordance with their organization's data security policies, as local storage is not encrypted by default and is only as secure as the device itself.



#### License Notice



Copyright © 2026 Lemuel Jan Suico. All rights reserved.



This software (NoteSaver) is provided free of charge for personal and professional use. However, no part of this software's source code, design, or functionality may be copied, reproduced, modified, redistributed, sublicensed, or sold, in whole or in part, without the prior express written permission of the copyright holder.



This software is provided "as is," without warranty of any kind, express or implied. Use of this software is at the user's own risk.


##### **Attestation**



This app was built by Lemuel Jan Suico, for team's internal use, with the sole intent of helping streamline our everyday AR follow-up documentation workflow. It contains no viruses, malware, or any code intended to cause harm, data loss, or financial loss to the business.



It's a plain HTML/CSS/JavaScript file with no installer, no background processes, and no external network calls. All data it collects (work-done count, invoice history) stays saved locally in the browser and is never sent anywhere.



As with any file received from a coworker, feel free to run it through your standard antivirus/endpoint scan before use — that's good practice regardless of the source.



I, Lemuel Jan Suico, take full personal responsibility and liability for this application and its contents. If it is found to contain any malicious code, cause any harm, data loss, or financial loss to the business, or otherwise misrepresent what is stated above, I accept full accountability for those consequences.



###### — Lemuel Jan Suico

