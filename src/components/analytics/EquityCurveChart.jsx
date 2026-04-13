import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function EquityCurveChart({ data }) {
    return (
        <Card className="shadow-md border-0 h-full">
            <CardHeader>
                <CardTitle>Equity Curve</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => format(new Date(date), "MMM d")} 
                            fontSize={12} 
                        />
                        <YAxis 
                            tickFormatter={(value) => `$${value.toFixed(0)}`}
                            fontSize={12}
                        />
                        <Tooltip 
                            formatter={(value) => [`$${value.toFixed(2)}`, "Equity"]}
                            labelFormatter={(label, payload) => payload[0] && format(new Date(payload[0].payload.date), 'MMM d, yyyy')}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="equity" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}