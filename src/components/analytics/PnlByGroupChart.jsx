import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Target } from 'lucide-react';

export default function PnlByGroupChart({ data, title }) {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border rounded-xl shadow-xl">
                    <p className="font-bold text-slate-800 mb-1">{payload[0].payload.name}</p>
                    <p className={`text-lg font-semibold ${payload[0].value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {payload[0].value >= 0 ? '+' : ''}${payload[0].value.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Sort data by pnl for better visualization
    const sortedData = [...data].sort((a, b) => b.pnl - a.pnl);

    return (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="profitGradientH" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0.8}/>
                            </linearGradient>
                            <linearGradient id="lossGradientH" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3}/>
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.8}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                        <XAxis 
                            type="number" 
                            tickFormatter={(value) => `$${value.toFixed(0)}`} 
                            fontSize={11}
                            stroke="#64748b"
                            tick={{ fill: '#64748b' }}
                        />
                        <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={90} 
                            fontSize={11}
                            stroke="#64748b"
                            tick={{ fill: '#64748b' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
                        <Bar dataKey="pnl" barSize={24} radius={[0, 8, 8, 0]}>
                            {sortedData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.pnl >= 0 ? 'url(#profitGradientH)' : 'url(#lossGradientH)'} 
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}