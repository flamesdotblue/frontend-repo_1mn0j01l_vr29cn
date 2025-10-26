import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import ProblemList from './components/ProblemList.jsx';
import CodePlayground from './components/CodePlayground.jsx';
import AdminPanel from './components/AdminPanel.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('Practice');
  const [selectedProblem, setSelectedProblem] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar onSelectTab={setActiveTab} activeTab={activeTab} />

      <header className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-6">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-900">
            Master DSA with hands-on coding challenges
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-indigo-900/80">
            Practice like LeetCode or CodeChef with a clean editor, curated problem sets,
            and an admin panel to manage your own challenges. This is a front-end demo
            you can connect to a backend for login, submissions, and leaderboards.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16">
        {activeTab === 'Practice' && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ProblemList onSelect={(p) => setSelectedProblem(p)} />
            <CodePlayground selectedProblem={selectedProblem} />
          </div>
        )}

        {activeTab === 'Discuss' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
            Community discussions coming soon. Hook this up to your backend forum.
          </div>
        )}

        {activeTab === 'Admin' && <AdminPanel />}
      </main>

      <footer className="border-t border-slate-200 bg-white/60 py-6 text-center text-sm text-slate-500">
        Built for practice. Connect a backend to enable real login, register, judge, and admin features.
      </footer>
    </div>
  );
}
