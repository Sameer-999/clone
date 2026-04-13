import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity } from 'lucide-react';

export default function IVAnalysisChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <Card className="shadow-md border-0">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        IV Impact Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64 text-slate-500">
                    No IV data available (requires iv_entry and iv_exit on trades)
                </CardContent>
            </Card>
        );
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-semibold text-slate-800">{data.symbol}</p>
                    <p className="text-xs text-slate-600">IV Change: {data.ivChange > 0 ? '+' : ''}{data.ivChange.toFixed(1)}%</p>
                    <p className={`text-sm font-medium ${data.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        P/L: ${data.pnl.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="shadow-md border-0">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    IV Impact on P/L
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                            dataKey="ivChange" 
                            name="IV Change (%)" 
                            tick={{ fontSize: 12 }}
                            label={{ value: 'IV Change (%)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                            dataKey="pnl" 
                            name="P/L" 
                            tick={{ fontSize: 12 }}
                            label={{ value: 'P/L ($)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Scatter data={data} fill="#3b82f6">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}