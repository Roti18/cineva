import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import { PUBLIC_CONTACT_EMAIL } from '$env/static/public';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const topic = data.get('topic') as string;
        const message = data.get('message') as string;

        const errors: Record<string, string> = {};

        if (!name || name.length < 2) {
            errors.name = 'Nama kepanjangan atau kependekan, Bang!';
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Format emailnya salah tuh.';
        }

        if (!message || message.length < 10) {
            errors.message = 'Pesan minimal 10 karakter ya.';
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { errors, name, email, topic, message });
        }

        const resend = new Resend(RESEND_API_KEY);

        try {
            const { error } = await resend.emails.send({
                from: 'Cineva <onboarding@resend.dev>',
                to: PUBLIC_CONTACT_EMAIL,
                subject: `[CINEVA CONTACT] ${topic} from ${name}`,
                replyTo: email,
                html: `
					<div style="font-family: sans-serif; padding: 30px; border: 1px solid #f0f0f0; border-radius: 20px; max-width: 600px; color: #1a1a1a;">
						<h2 style="color: #e57c73; font-size: 24px; font-weight: 900; margin-bottom: 20px; font-style: italic;">CINEVA</h2>
						<p style="font-size: 16px; margin-bottom: 30px; color: #666;">Ada pesan baru masuk nih dari form kontak:</p>
						
						<div style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
							<p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
							<p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
							<p style="margin: 0 0 0 0;"><strong>Topic:</strong> ${topic}</p>
						</div>

						<p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
						<div style="line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</div>
						
						<hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px 0;" />
						<p style="font-size: 12px; color: #999; text-align: center;">Sent via Cineva System</p>
					</div>
				`
            });

            if (error) {
                console.error('Resend API Error:', error);
                return fail(500, { message: 'Gagal kirim via Resend. Coba cek API Key.', error: true });
            }

            return { success: true };
        } catch (err) {
            console.error('Fatal submission error:', err);
            return fail(500, { message: 'Ada masalah teknis ghaib. Coba lagi nanti.', error: true });
        }
    }
};
