Set up the local Resend email server

1. Install server dependencies:

   npm install express resend cors body-parser

2. Set the RESEND_API_KEY environment variable. Do NOT commit your API key.

   - Windows (PowerShell):
     $env:RESEND_API_KEY = "re_your_key_here"
     npm run start:server

   - macOS / Linux:
     export RESEND_API_KEY="re_your_key_here"
     npm run start:server

3. The server listens on port 4000 by default. It exposes POST /api/send-email.

From the frontend the Contact form posts to http://localhost:4000/api/send-email.
