import { useMemo, useState } from 'react';

const sampleProblems = [
  { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], acceptance: 47 },
  { id: 'lru-cache', title: 'LRU Cache', difficulty: 'Medium', tags: ['Design', 'Hash Table'], acceptance: 38 },
  { id: 'word-ladder', title: 'Word Ladder', difficulty: 'Hard', tags: ['BFS', 'Graph'], acceptance: 32 },
  { id: 'merge-k-lists', title: 'Merge k Sorted Lists', difficulty: 'Hard', tags: ['Heap', 'Linked List'], acceptance: 44 },
  { id: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', tags: ['Stack'], acceptance: 70 },
  { id: 'binary-search', title: 'Binary Search', difficulty: 'Easy', tags: ['Binary Search'], acceptance: 58 },
];

const diffColors = {
  Easy: 'text-emerald-700 bg-emerald-50 ring-emerald-200',
  Medium: 'text-amber-700 bg-amber-50 ring-amber-200',
  Hard: 'text-rose-700 bg-rose-50 ring-rose-200',
};

export default function ProblemList({ onSelect }) {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');

  const filtered = useMemo(() => {
    return sampleProblems.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchesDiff = difficulty === 'All' || p.difficulty === difficulty;
      return matchesQuery && matchesDiff;
    });
  }, [query, difficulty]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-lg font-semibold">Problems</div>
        <div className="flex flex-1 items-center gap-3 sm:justify-end">
          <div className="relative w-full sm:w-64">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 pl-9 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
          </div>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect?.(p)}
            className="group flex w-full items-center justify-between gap-4 py-3 text-left hover:bg-slate-50"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="truncate font-medium text-slate-800 group-hover:text-indigo-700">
                  {p.title}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ring-1 ${diffColors[p.difficulty]}`}>
                  {p.difficulty}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {p.tags.join(' • ')}
              </div>
            </div>
            <div className="text-right text-sm text-slate-500">
              {p.acceptance}%
              <div className="text-xs">Acceptance</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
