export async function register() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const Sentry = await import("@sentry/nextjs");
    
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      
      enabled: process.env.NODE_ENV === "production",
      
      tracesSampleRate: 1.0,
      
      environment: process.env.NODE_ENV,
      
      beforeSend(event) {
        if (process.env.NODE_ENV === "development") {
          console.log("Sentry event:", event);
        }
        return event;
      },
    });
  }
}
