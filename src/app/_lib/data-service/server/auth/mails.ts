import PasswordCreateEmail from "@/src/app/_components/auth/PasswordCreateTemplate";
import PasswordResetTemplate from "@/src/app/_components/auth/PasswordResetTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordCreateMail(token: string, email: string) {
  const createPasswordLink = `${process.env.APP_URL}/auth/admin/create-new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Create a new password!",
    react: PasswordCreateEmail({
      createPasswordLink,
    }),
  });
}

export async function sendPasswordResetMail(email: string, token: string) {
  const resetPasswordLink = `${process.env.APP_URL}/auth/admin/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password!",
    react: PasswordResetTemplate({ resetPasswordLink }),
  });
}
