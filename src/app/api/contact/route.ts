import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  projectScope: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          full_name: validatedData.fullName,
          email: validatedData.email,
          project_scope: validatedData.projectScope || 'General Inquiry',
          message: validatedData.message,
        },
      ]);

    if (error) {
      console.error('Supabase insert error [REDACTED PII]:', error?.message || error?.code);
      return NextResponse.json({ error: 'Failed to record message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.errors ? err.errors[0].message : 'Validation error.' },
      { status: 400 }
    );
  }
}
