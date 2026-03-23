import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/messages(.*)',
  '/list(.*)',
  '/book(.*)',
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

async function getUserRole(userId: string): Promise<string | null> {
  try {
    const { data } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    return data?.role || null;
  } catch {
    return null;
  }
}

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isAdminRoute(req)) {
    if (!userId) {
      const signInUrl = new URL('/signin', req.url);
      return Response.redirect(signInUrl);
    }
    
    const role = await getUserRole(userId);
    if (role !== 'admin') {
      const dashboardUrl = new URL('/dashboard', req.url);
      return Response.redirect(dashboardUrl);
    }
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};