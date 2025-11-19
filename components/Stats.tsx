import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Signature, ClassRoom } from '../types';

interface StatsProps {
  signatures: Signature[];
}

const Stats: React.FC<StatsProps> = ({ signatures }) => {
  // Goal adjusted for a single class (approx 30-40 students)
  const totalGoal = 35;
  const current = signatures.length;
  const percentage = Math.min((current / totalGoal) * 100, 100);

  // Group by class (Single class now)
  const data = Object.values(ClassRoom).map((cls) => ({
    name: "9º U", // Short name for chart
    fullName: cls,
    votes: signatures.filter((s) => s.classRoom === cls).length,
  }));

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-red-500">■</span> Adesão da Turma
      </h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>{current} Assinaturas</span>
          <span>Meta estimada: {totalGoal} alunos</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-red-600 h-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2 text-right">
           {percentage.toFixed(1)}% da meta atingida
        </p>
      </div>

      {/* Chart */}
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={50}
              stroke="#94a3b8" 
              tick={{ fill: '#94a3b8', fontWeight: 'bold' }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: '#334155', opacity: 0.4 }}
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
              labelFormatter={(label, payload) => {
                 if (payload && payload.length > 0) {
                     return payload[0].payload.fullName;
                 }
                 return label;
              }}
            />
            <Bar dataKey="votes" barSize={40} radius={[0, 4, 4, 0]}>
              <Cell fill="#dc2626" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;