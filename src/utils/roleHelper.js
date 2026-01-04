// Admin email list - In production, this should come from backend/database
const ADMIN_EMAILS = [
  "admin@altrion.com",
  "demo@altrion.com",
];

// Development mode: Allow flexible admin access
// In production, remove this and use only ADMIN_EMAILS
const DEVELOPMENT_MODE = true;

export const isAdmin = (user) => {
  if (!user || !user.email) return false;
  
  const email = user.email.toLowerCase();
  
  // Check exact match in admin list
  if (ADMIN_EMAILS.includes(email)) {
    return true;
  }
  
  // Development mode: Allow admin access if email contains "admin" or "demo"
  // This makes it easier to test admin features during development
  if (DEVELOPMENT_MODE) {
    if (email.includes("admin") || email.includes("demo")) {
      return true;
    }
  }
  
  return false;
};

export const getUserRole = (user) => {
  if (!user) return null;
  return isAdmin(user) ? "admin" : "user";
};

