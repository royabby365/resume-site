// CF Pages Function — resume-site contact form -> Brevo SMTP (direct)
// Credentials masked in source; Brevo endpoint: api.brevo.com/v3/smtp/email
export async function onRequestPost(context) {
  try {
    const form = await context.request.formData();
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const subject = String(form.get("subject") || "Resume Contact");
    const message = String(form.get("message") || "");
    const payload = {
      sender: { name: name || "Contact", email: "kuma@royabernathy.info" },
      to: [{ email: "roy.u.abernathy@gmail.com", name: "Roy Abernathy" }],
      replyTo: { email: email, name: name },
      subject: subject,
      htmlContent: `<p><b>From:</b> ${name} (${email})</p><p>${message.replace(/\n/g,"<br>")}</p>`
    };
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": context.env.BREVO_API_KEY
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) return new Response(`Brevo error: ${res.status}`, { status: 502 });
    return new Response("OK", { status: 200 });
  } catch (e) {
    return new Response("Error: "+String(e), { status: 500 });
  }
}
