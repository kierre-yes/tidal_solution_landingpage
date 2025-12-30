"use server";

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://kierchrist10.app.n8n.cloud/webhook-test/contact-form";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Tidal-Solutions-App/1.0",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Form submission error:", error);
    return { success: false, error: "Failed to submit form" };
  }
}
