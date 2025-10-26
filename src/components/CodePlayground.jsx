import { useEffect, useMemo, useState } from 'react';

const defaultCodes = {
  javascript: `// Write your solution here\n// Example: Two Sum\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\nconsole.log(twoSum([2,7,11,15], 9)); // [0,1]\n`,
  python: `# Write your solution here\n# Example: Two Sum\nfrom typing import List\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, x in enumerate(nums):\n            if target - x in seen:\n                return [seen[target - x], i]\n            seen[x] = i\n        return []\n\nprint(Solution().twoSum([2,7,11,15], 9))  # [0,1]\n`,
  cpp: `// Write your solution here\n// Example: Two Sum\n#include <bits/stdc++.h>\nusing namespace std;\nvector<int> twoSum(vector<int>& nums, int target){\n  unordered_map<int,int> m;\n  for(int i=0;i<nums.size();++i){\n    int c = target - nums[i];\n    if(m.count(c)) return {m[c], i};\n    m[nums[i]] = i;\n  }\n  return {};\n}\nint main(){\n  vector<int> v={2,7,11,15};\n  auto ans = twoSum(v,9);\n  cout<<"["<<ans[0]<<","<<ans[1]<<"]";\n}\n`,
};

export default function CodePlayground({ selectedProblem }) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(defaultCodes.javascript);
  const [output, setOutput] = useState('Ready');

  useEffect(() => {
    setCode(defaultCodes[language]);
  }, [language]);

  useEffect(() => {
    if (!selectedProblem) return;
    setOutput(`Opened problem: ${selectedProblem.title}`);
  }, [selectedProblem]);

  const canRunInBrowser = useMemo(() => language === 'javascript', [language]);

  const runCode = () => {
    if (!canRunInBrowser) {
      setOutput('Local run is only supported for JavaScript in this demo.');
      return;
    }
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(String(result ?? 'Executed. Check console for logs.'));
    } catch (e) {
      setOutput('Error: ' + e.message);
    }
  };

  const submitCode = () => {
    setOutput('Submission queued (demo). Connect backend to judge code.');
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Run
          </button>
          <button
            onClick={submitCode}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-2">
        <div className="flex min-h-[320px] flex-col">
          <div className="mb-2 text-sm font-medium text-slate-700">Editor</div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[280px] flex-1 rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex min-h-[320px] flex-col">
          <div className="mb-2 text-sm font-medium text-slate-700">Output</div>
          <pre className="min-h-[280px] flex-1 whitespace-pre-wrap rounded-lg border border-slate-300 bg-slate-900 p-3 font-mono text-sm text-slate-100">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
