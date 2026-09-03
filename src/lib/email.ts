import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.EMAIL_HOST || "smtp.hostinger.com";
  const port = Number(process.env.EMAIL_PORT) || 465;
  const isSecure = process.env.EMAIL_USE_SSL === "true" || port === 465;
  const user = process.env.EMAIL_HOST_USER || "support@hilltopcargo.com";
  const pass = process.env.EMAIL_HOST_PASSWORD || "Aaasssaaa1@";

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
  });
}

export interface TourEmailData {
  inquiry: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    preferred_date?: string | null;
    message?: string | null;
  };
  property?: {
    id: string;
    title: string;
    address: string;
    city: string;
    state?: string;
    price: number;
    image_key?: string;
    agent_name?: string;
  } | null;
  baseUrl?: string;
}

export async function sendTourBookingEmails({ inquiry, property, baseUrl }: TourEmailData) {
  const fromEmail = process.env.DEFAULT_FROM_EMAIL || "support@hilltopcargo.com";
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.SERVER_EMAIL ||
    "support@hilltopcargo.com";

  const appBaseUrl =
    baseUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const paymentUrl = `${appBaseUrl}/payment?inquiryId=${inquiry.id}${property ? `&propertyId=${property.id}` : ""}`;
  const adminPortalUrl = `${appBaseUrl}/admin`;

  const transporter = getTransporter();

  const formattedPrice = property
    ? `$${property.price.toLocaleString("en-US")}`
    : "N/A";

  // 1. Email to Customer
  const customerHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
          .card { background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 16px; padding: 20px; margin: 20px 0; }
          .card-title { font-size: 17px; font-weight: 700; color: #0369a1; margin-bottom: 8px; }
          .detail-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed #e0f2fe; font-size: 14px; }
          .detail-label { color: #64748b; font-weight: 500; }
          .detail-value { font-weight: 600; color: #0f172a; }
          .cta-box { text-align: center; margin: 32px 0 20px; }
          .btn { display: inline-block; background: linear-gradient(135deg, #0284c7, #0ea5e9); color: #ffffff !important; text-decoration: none; padding: 14px 32px; font-size: 15px; font-weight: 600; border-radius: 14px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35); }
          .note { font-size: 13px; color: #64748b; line-height: 1.5; margin-top: 16px; }
          .footer { border-top: 1px solid #f1f5f9; padding: 20px 28px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #f8fafc; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AetherHomes Tour Request</h1>
            <p>Your property tour reservation request has been received</p>
          </div>
          <div class="content">
            <p class="greeting">Hello ${inquiry.name},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              Thank you for scheduling a private viewing with AetherHomes. We have registered your request and reserved your tentative tour window.
            </p>

            <div class="card">
              <div class="card-title">${property ? property.title : "Tour Booking"}</div>
              ${property ? `
              <div class="detail-row">
                <span class="detail-label">Location</span>
                <span class="detail-value">${property.address}, ${property.city}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Listing Price</span>
                <span class="detail-value">${formattedPrice}</span>
              </div>
              ` : ""}
              <div class="detail-row">
                <span class="detail-label">Preferred Date</span>
                <span class="detail-value">${inquiry.preferred_date || "To be arranged"}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Agent Representative</span>
                <span class="detail-value">${property?.agent_name || "AetherHomes Broker"}</span>
              </div>
            </div>

            <div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 14px; padding: 16px; margin-top: 20px;">
              <p style="margin: 0; font-size: 13px; color: #854d0e; line-height: 1.5;">
                <strong>Next Step:</strong> To lock in your viewing time slot and dispatch an assigned broker to the property, please proceed to the payment portal to view available payment methods.
              </p>
            </div>

            <div class="cta-box">
              <a href="${paymentUrl}" class="btn">Proceed to Payment Page</a>
            </div>

            <p class="note">
              If the button above does not work, copy and paste this link into your browser:<br>
              <a href="${paymentUrl}" style="color: #0284c7; word-break: break-all;">${paymentUrl}</a>
            </p>
          </div>
          <div class="footer">
            &copy; 2026 AetherHomes Inc. All rights reserved.<br>
            Have questions? Reply to this email or contact support@hilltopcargo.com
          </div>
        </div>
      </body>
    </html>
  `;

  // 2. Email to Admin
  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .header { background: #0f172a; padding: 28px; text-align: center; color: #ffffff; }
          .badge { display: inline-block; background-color: #38bdf8; color: #0f172a; font-weight: 700; font-size: 11px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
          .content { padding: 28px; }
          .section { margin-bottom: 24px; }
          .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
          .info-table { width: 100%; border-collapse: collapse; font-size: 14px; }
          .info-table td { padding: 8px 4px; border-bottom: 1px solid #f8fafc; }
          .info-table td.label { color: #64748b; font-weight: 500; width: 35%; }
          .info-table td.val { font-weight: 600; color: #0f172a; }
          .message-box { background: #f8fafc; border-left: 3px solid #0284c7; padding: 12px 16px; border-radius: 0 10px 10px 0; font-size: 13px; color: #334155; }
          .btn-row { margin-top: 24px; text-align: center; }
          .btn { display: inline-block; background: #0f172a; color: #ffffff !important; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 600; border-radius: 12px; }
          .footer { border-top: 1px solid #f1f5f9; padding: 16px 28px; text-align: center; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">New Lead Notification</span>
            <h1>Tour Request Received</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Client Information</div>
              <table class="info-table">
                <tr>
                  <td class="label">Client Name</td>
                  <td class="val">${inquiry.name}</td>
                </tr>
                <tr>
                  <td class="label">Client Email</td>
                  <td class="val"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone</td>
                  <td class="val">${inquiry.phone || "Not provided"}</td>
                </tr>
                <tr>
                  <td class="label">Requested Date</td>
                  <td class="val">${inquiry.preferred_date || "Flexible / Not set"}</td>
                </tr>
              </table>
            </div>

            ${property ? `
            <div class="section">
              <div class="section-title">Property Requested</div>
              <table class="info-table">
                <tr>
                  <td class="label">Property</td>
                  <td class="val">${property.title}</td>
                </tr>
                <tr>
                  <td class="label">Address</td>
                  <td class="val">${property.address}, ${property.city}</td>
                </tr>
                <tr>
                  <td class="label">Price</td>
                  <td class="val">${formattedPrice}</td>
                </tr>
                <tr>
                  <td class="label">Assigned Agent</td>
                  <td class="val">${property.agent_name || "AetherHomes Broker"}</td>
                </tr>
              </table>
            </div>
            ` : ""}

            <div class="section">
              <div class="section-title">Client Note / Message</div>
              <div class="message-box">
                ${inquiry.message || "No custom message provided."}
              </div>
            </div>

            <div class="btn-row">
              <a href="${adminPortalUrl}" class="btn">Open Admin Management Console</a>
            </div>
          </div>
          <div class="footer">
            AetherHomes Internal Dispatch System &bull; Inquiry ID: ${inquiry.id}
          </div>
        </div>
      </body>
    </html>
  `;

  // Send both emails in parallel
  const sendCustomerPromise = transporter.sendMail({
    from: `"AetherHomes" <${fromEmail}>`,
    to: inquiry.email,
    subject: `🏠 Tour Request Confirmed: ${property?.title || "Your Property Tour"} (Next: Complete Payment)`,
    html: customerHtml,
  });

  const sendAdminPromise = transporter.sendMail({
    from: `"AetherHomes Alerts" <${fromEmail}>`,
    to: adminEmail,
    subject: `🔔 [New Tour Booking] ${inquiry.name} - ${property?.title || "Property"}`,
    html: adminHtml,
  });

  const results = await Promise.allSettled([sendCustomerPromise, sendAdminPromise]);

  const customerSuccess = results[0].status === "fulfilled";
  const adminSuccess = results[1].status === "fulfilled";

  if (!customerSuccess) {
    console.error("Failed to send customer tour email:", (results[0] as PromiseRejectedResult).reason);
  }
  if (!adminSuccess) {
    console.error("Failed to send admin tour notification email:", (results[1] as PromiseRejectedResult).reason);
  }

  return { customerSuccess, adminSuccess };
}
