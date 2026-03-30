import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Add to Resend audience
    await resend.contacts.create({
      email,
      audienceId,
    });

    // Send welcome email
    await resend.emails.send({
      from: "Jay <jay@lineage.community>",
      to: email,
      subject: "You're in — welcome to Lineage",
      text: `Thanks for signing up. Lineage is a community platform I'm building to help people map the timelines of their lives inside the communities they love — starting with snowboarding.

I'll keep you posted as we get closer to launch. In the meantime, you can check out the early prototype at https://lineage.wtf

— Jay`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
