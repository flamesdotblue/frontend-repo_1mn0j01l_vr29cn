import { useState } from 'react';
import { Code2, User, LogIn, LogOut } from 'lucide-react';

export default function Navbar({ onSelectTab, activeTab }) {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [authedUser, setAuthedUser] = useState(null);

  const closeModal = () => setShowAuth(false);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Demo-only: mock auth success
    const user = isLogin
      ? { name: 'Coder', email: form.email }
      : { name: form.name || 'New User', email: form.email };
    setAuthedUser(user);
    setShowAuth(false);
  };

  const logout = () => setAuthedUser(null);

  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Code2 className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold tracking-tight">DSA Arena</span>
          </div>

          <nav className="hidden gap-1 rounded-xl bg-slate-100 p-1 text-sm sm:flex">
            {['Practice', 'Discuss', 'Admin'].map((tab) => (
              <button
                key={tab}
                onClick={() => onSelectTab(tab)}
                className={`rounded-lg px-3 py-1.5 transition ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {authedUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <User className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700">
                    {authedUser.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-indigo-700"
              >
                <LogIn className="h-4 w-4" /> Login / Register
              </button>
            )}
          </div>
        </div>
      </div>

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h3>
              <button
                onClick={closeModal}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 flex rounded-lg bg-slate-100 p-1 text-sm">
              <button
                className={`flex-1 rounded-md px-3 py-1.5 ${
                  isLogin ? 'bg-white shadow' : ''
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 rounded-md px-3 py-1.5 ${
                  !isLogin ? 'bg-white shadow' : ''
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <form className="space-y-3" onSubmit={handleAuthSubmit}>
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-sm text-slate-600">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    placeholder="Ada Lovelace"
                    required
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-sm text-slate-600">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-slate-600">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700"
              >
                {isLogin ? 'Login' : 'Create account'}
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-slate-500">
              Demo only — no real authentication yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
