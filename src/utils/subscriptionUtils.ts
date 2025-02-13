
import { supabase } from "@/integrations/supabase/client";

export async function createSubscription(userId: string, plan: 'free' | 'premium') {
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + (plan === 'premium' ? 30 : 365)); // Premium: 30 days, Free: 365 days

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      plan,
      status: 'active',
      valid_until: validUntil.toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getCurrentSubscription(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}
