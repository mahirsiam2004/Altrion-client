import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, Mail, Shield } from "lucide-react";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "ইউজার ম্যানেজ - Altrion";
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://altrion-server.vercel.app/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Admin users error:", err);
      toast.error("ইউজার লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] dark:bg-[var(--surface-dark)]"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--sand-accent)]"></div></div>;
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-12">
      <div className="container-sand">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2 flex items-center space-x-2">
            <Shield className="w-7 h-7 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
            <span>ইউজার ম্যানেজ</span>
          </h1>
          <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">নিবন্ধিত ব্যবহারকারীদের তালিকা</p>
        </div>

        {users.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sand-card p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center">
              <Users className="w-10 h-10 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">কোনো ইউজার নেই</h3>
          </motion.div>
        ) : (
          <div className="sand-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--line)] dark:border-[var(--line-dark)]">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">নাম</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">ইমেইল</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">রোল</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <motion.tr key={u._id || u.uid || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-[var(--line)] dark:border-[var(--line-dark)] hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors">
                      <td className="py-4 px-6 text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] font-medium flex items-center space-x-3">
                        {u.photoURL ? <img src={u.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" onError={(e)=>{e.target.src="https://via.placeholder.com/32?text=U";}} /> : <div className="w-8 h-8 rounded-full bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center"><UserCheck className="w-4 h-4 text-[var(--sand-accent-strong)]" /></div>}
                        <span>{u.displayName || u.name || "ব্যবহারকারী"}</span>
                      </td>
                      <td className="py-4 px-6 text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]"><div className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>{u.email}</span></div></td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${(u.role === "admin" || (u.email || "").includes("admin")) ? "bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" : "bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]"}`}>
                          {u.role === "admin" || (u.email || "").includes("admin") ? "অ্যাডমিন" : "ইউজার"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
