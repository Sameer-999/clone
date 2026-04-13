import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import RMultipleChart from './RMultipleChart';
import PerformanceHeatmap from './PerformanceHeatmap';
import PnlByGroupChart from './PnlByGroupChart';

export default function AdvancedAnalytics({ data }) {
    return (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    <CardTitle className="text-xl">Advanced Analytics</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
                 <div className="grid lg:grid-cols-2 gap-6">
                    <RMultipleChart data={data.rMultipleDistribution} />
                    <PnlByGroupChart data={data.pnlByStrategy} title="P/L by Strategy" />
                 </div>
                 <div className="bg-white rounded-xl p-6 shadow-md border">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                        Time-based Performance (P/L)
                    </h3>
                    <PerformanceHeatmap data={data.heatmapData} />
                 </div>
            </CardContent>
        </Card>
    );
}