import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, eventType, date, location, guests, budget, message } = await req.json();

    // Validate inputs
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const toEmail = process.env.EMAIL_TO || "yohaan16.mohadawoo@gmail.com";

    // Build styled HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Event Enquiry</title>
        <style>
          body {
            font-family: 'Playfair Display', Georgia, serif;
            background-color: #FFFDFB;
            color: #2D2D2D;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #FFFFFF;
            border: 1px solid #EAE0D5;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(201, 168, 76, 0.05);
          }
          .header {
            background-color: #1A1A1A;
            padding: 30px 40px;
            text-align: center;
            border-bottom: 3px solid #C9A84C;
          }
          .header h1 {
            color: #C9A84C;
            font-size: 26px;
            margin: 0;
            letter-spacing: 0.1em;
            font-weight: bold;
            text-transform: uppercase;
          }
          .header p {
            color: #A99260;
            margin: 5px 0 0 0;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }
          .content {
            padding: 40px;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          }
          .greeting {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 25px;
            color: #1A1A1A;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .details-table th, .details-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #F4EAE1;
            font-size: 14px;
          }
          .details-table th {
            color: #A99260;
            font-weight: 600;
            width: 35%;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.1em;
          }
          .details-table td {
            color: #2D2D2D;
          }
          .message-box {
            background-color: #FFF9F5;
            border-left: 3px solid #C9A84C;
            padding: 20px;
            border-radius: 4px;
            font-size: 14px;
            line-height: 1.6;
            color: #4A4A4A;
            margin-top: 10px;
          }
          .footer {
            background-color: #1A1A1A;
            padding: 20px;
            text-align: center;
            font-size: 11px;
            color: rgba(255,255,255,0.4);
            border-top: 1px solid #2D2D2D;
          }
          .footer a {
            color: #C9A84C;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Priya Jacober Events</h1>
            <p>New Event Enquiry</p>
          </div>
          <div class="content">
            <div class="greeting">Enquiry Details</div>
            <table class="details-table">
              <tr>
                <th>Client Name</th>
                <td><strong>${name}</strong></td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${email}" style="color: #C9A84C; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>${phone ? phone : "<em>Not provided</em>"}</td>
              </tr>
              <tr>
                <th>Event Type</th>
                <td>${eventType ? eventType : "<em>Not provided</em>"}</td>
              </tr>
              <tr>
                <th>Proposed Date</th>
                <td>${date ? date : "<em>Not provided</em>"}</td>
              </tr>
              <tr>
                <th>Event Location</th>
                <td>${location ? location : "<em>Not provided</em>"}</td>
              </tr>
              <tr>
                <th>Number of Guests</th>
                <td>${guests ? guests : "<em>Not provided</em>"}</td>
              </tr>
              <tr>
                <th>Budget Range</th>
                <td>${budget ? budget : "<em>Not provided</em>"}</td>
              </tr>
            </table>

            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #A99260; font-weight: 600; margin-bottom: 10px;">Message / Additional Details</div>
            <div class="message-box">
              ${message ? message.replace(/\n/g, "<br />") : "<em>No message provided.</em>"}
            </div>
          </div>
          <div class="footer">
            &copy; 2026 Priya Jacober Events. All rights reserved. <br/>
            Visit <a href="https://jacoberevents.ch">jacoberevents.ch</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Event Enquiry from ${name} - ${eventType || "General"}`,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Server API error:", err);
    return NextResponse.json({ error: err.message || "Failed to process request." }, { status: 500 });
  }
}
