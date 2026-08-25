export const isAdmin = (user) => {
  if (!user || !user.email) return false;
  return user.email.toLowerCase().includes("admin");
};
