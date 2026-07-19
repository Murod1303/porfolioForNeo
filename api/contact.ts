import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Faqat POST so'rovlarga ruxsat
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body ?? {};

  // Server tomonda validatsiya
  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ error: "Barcha maydonlar to'ldirilishi kerak" });
  }
  if (typeof message !== "string" || message.length > 4000) {
    return res.status(400).json({ error: "Xabar juda uzun" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Email noto'g'ri" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram env o'zgaruvchilari sozlanmagan");
    return res.status(500).json({ error: "Server sozlanmagan" });
  }

  const escapeMd = (s: string) => s.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");

  const text = [
    "📬 Yangi xabar — Portfolio Contact Form",
    "",
    `👤 Ism: ${escapeMd(name)}`,
    `📧 Email: ${escapeMd(email)}`,
    `📌 Mavzu: ${escapeMd(subject)}`,
    "",
    `💬 Xabar:\n${escapeMd(message)}`,
  ].join("\n");

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "MarkdownV2",
        }),
      },
    );

    if (!tgRes.ok) {
      const err = await tgRes.json().catch(() => ({}));
      console.error("Telegram API xatosi:", err);
      return res.status(502).json({ error: "Xabar yuborilmadi" });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Fetch xatosi:", e);
    return res.status(500).json({ error: "Kutilmagan xatolik" });
  }
}
