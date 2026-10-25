# Wedding RSVP integration — preparation, not yet live

This site is based on the approved existing website. Only index.html, rsvp.css, and rsvp.js introduce RSVP. Existing styles, animations, photographs, venue schedule, and domain settings remain unchanged.

## Before publishing
1. Open your existing spreadsheet-bound Google Apps Script project.
2. Replace Code.gs with the code in APPS_SCRIPT_Code.gs.txt. Confirm that SHEET_NAME matches the exact response sheet tab, typically Form Responses 1.
3. From Deploy > Manage deployments, edit the deployed Web app and select **New version**, then Deploy (not just Save). Execute as Me; access Anyone. Keep the same /exec URL, if Google preserves it.
4. Verify that the Web app URL matches the endpoint in rsvp.js; if Google changed the URL, update rsvp.js accordingly.
5. Test a new submission through the website running at the actual origin https://crainsdhruvi.com, and independently confirm spreadsheet entry and notification email. Test failures too. Google Forms' own email notifications will not fire for Apps Script inserts; the script sends email itself.
6. Do not publish the RSVP website before step 3, or the UI will be unable to confirm success.

The public deployment URL is not a secret, but it is usable by anyone to submit RSVPs; anonymous endpoints cannot completely prevent unwanted submissions. There are no credentials, spreadsheet IDs, or private guest responses in website source code.

## Important
This package contains APPS_SCRIPT_Code.gs.txt as a private setup aid; REMOVE it before uploading site files to the public repository to minimize disclosure of backend implementation. Deploy only the site files (index.html, rsvp.css, rsvp.js; other existing website files can stay as-is).
