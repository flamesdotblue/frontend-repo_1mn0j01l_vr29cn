import { useState } from 'react';
import { Shield, Users, FilePlus2, ListChecks } from 'lucide-react';

export default function AdminPanel() {
  const [form, setForm] = useState({ title: '', difficulty: 'Easy', tags: '' });
  const [created, setCreated] = useState([]);

  const addProblem = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      title: form.title.trim(),
      difficulty: form.difficulty,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    if (!item.title) return;
    setCreated([item, ...created]);
    setForm({ title: '', difficulty: 'Easy', tags: '' });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <Shield className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Admin Panel</h3>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <FilePlus2 className="h-4 w-4" /> Create Problem
          </div>
          <form className="space-y-3" onSubmit={addProblem}>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="e.g., Two Sum"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Tags (comma separated)</label>
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="Array, Hash Table"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Add Problem
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <Users className="h-4 w-4" /> Users (demo)
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Ada Lovelace — admin</li>
            <li>Alan Turing — moderator</li>
            <li>Grace Hopper — user</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <ListChecks className="h-4 w-4" /> Recently Created
          </div>
          {created.length === 0 ? (
            <p className="text-sm text-slate-500">No problems yet.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {created.map((p) => (
                <li key={p.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="font-medium text-slate-800">{p.title}</div>
                  <div className="text-xs text-slate-500">{p.difficulty} • {p.tags.join(', ')}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">Demo only — wire this panel to your backend and database to manage problems, users, and submissions.</p>
    </div>
  );
}
