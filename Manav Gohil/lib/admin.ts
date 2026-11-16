import { getAuthUser, createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function checkAdmin() {
  const user = await getAuthUser()
  if (!user) {
    redirect('/admin/login')
  }

  const supabase = await createClient()
  if (!supabase) {
    redirect('/admin/login')
  }

  const { data: isAdmin, error } = await supabase.rpc('is_admin')

  if (error || !isAdmin) {
    // If not admin, sign them out immediately to show generic message on login screen.
    // We can redirect to /admin/login?error=true
    redirect('/admin/login?error=true')
  }

  return { user, supabase }
}
