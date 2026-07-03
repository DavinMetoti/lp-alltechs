import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Nama, email, dan pesan wajib diisi." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST || "mail.alltechs.co.id";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER || "info@alltechs.co.id";
    const pass = process.env.SMTP_PASS || "@all54321all!";
    const fromName = process.env.SMTP_FROM || "Alltechs Web";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"${fromName}" <${user}>`,
      to: user, // Kirim notifikasi pesan ke email info@alltechs.co.id
      replyTo: email,
      subject: `[Web Inquiry] Pesan Baru dari ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 8px;">Pesan Baru dari Website Alltechs</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 140px;">Nama:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">No. HP/WhatsApp:</td>
              <td style="padding: 8px;">${phone || "-"}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h3 style="margin-top: 0; color: #111827;">Isi Pesan:</h3>
            <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">Email ini dikirim otomatis melalui Formulir Kontak Website Alltechs Solusindo.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Pesan Anda berhasil dikirim!" });
  } catch (error: any) {
    console.error("Error sending email via Nodemailer:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengirim email. Silakan coba beberapa saat lagi." },
      { status: 500 }
    );
  }
}
