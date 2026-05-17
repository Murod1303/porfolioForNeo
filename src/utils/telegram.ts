/** Telegram Bot orqali contact form xabarini yuboradi */
export async function sendTelegramMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === "your_bot_token_here") {
    console.warn("Telegram bot sozlanmagan. .env faylini to'ldiring.");
    return;
  }

  const text = `
📬 *Yangi xabar — Portfolio Contact Form*

👤 *Ism:* ${data.name}
📧 *Email:* ${data.email}
📌 *Mavzu:* ${data.subject}

💬 *Xabar:*
${data.message}
  `.trim();

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.description ?? "Telegram API xatosi");
  }
}
