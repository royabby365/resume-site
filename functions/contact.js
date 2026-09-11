// CF Pages Function — resume-site contact form -> Telegram channel
// Required Pages production secrets: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "Resume Contact").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !subject || !message) {
      return json({ ok: false, error: "Missing required field" }, 400);
    }

    const text = [
      "New resume contact",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      message
    ].join("\\n");

    const res = await fetch(`https://api.telegram.org/bot${context.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: context.env.TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true
      })
    });

    const result = await res.json();
    if (!res.ok || !result.ok) {
      return json({ ok: false, error: "Telegram delivery failed" }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: "Invalid request" }, 400);
  }
}
