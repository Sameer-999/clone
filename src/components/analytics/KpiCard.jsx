import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Info } from 'lucide-react';

const metricExplanations = {
    "Net P/L": {
        title: "Net Profit/Loss",
        description: "The total profit or loss across all your closed trades after accounting for all gains and losses. This is your bottom line - the cumulative sum of all individual trade outcomes."
    },
    "Total Trades": {
        title: "Total Trades",
        description: "The total number of trades you've executed during the selected time period. This includes both winning and losing trades, giving you a complete picture of your trading activity."
    },
    "Win Rate": {
        title: "Win Rate",
        description: "The percentage of trades that resulted in a profit. Calculated as (Winning Trades / Total Trades) × 100. A higher win rate indicates more consistent profitability, though it should be considered alongside other metrics like average R:R."
    },
    "Profit Factor": {
        title: "Profit Factor",
        description: "The ratio of gross profit to gross loss. Calculated as Total Gross Profit / Total Gross Loss. A profit factor above 1.0 means you're profitable overall. For example, a profit factor of 2.0 means you make $2 for every $1 you lose."
    },
    "Avg. R:R": {
        title: "Average Risk:Reward Ratio",
        description: "The average ratio between potential reward and risk across your trades. Calculated as (Take Profit - Entry) / (Entry - Stop Loss). A higher R:R means you're targeting more reward relative to the risk you're taking. Professional traders often aim for 2:1 or higher."
    },
    "Expectancy": {
        title: "Expectancy",
        description: "The average amount you can expect to win or lose per trade over time. Calculated as (Win Rate × Average Win) - (Loss Rate × Average Loss). A positive expectancy means your trading system is profitable in the long run. This is one of the most important metrics for system evaluation."
    },
    "Max Drawdown": {
        title: "Maximum Drawdown",
        description: "The largest peak-to-trough decline in your trading account during the selected period. This measures the worst-case loss you experienced from a high point. Lower drawdowns indicate better risk management and more stable performance."
    },
    "Avg. Duration": {
        title: "Average Trade Duration",
        description: "The average amount of time (in hours) that your trades remain open from entry to exit. This helps you understand your trading style - day traders have shorter durations, swing traders longer. Knowing your typical duration helps with planning and risk management."
    },
    "Options Trades": {
        title: "Options Trades Count",
        description: "The total number of options contracts traded during the selected period. This includes both single-leg and multi-leg strategies, helping you track your options trading activity separately from futures."
    },
    "Avg. IV Entry": {
        title: "Average Implied Volatility at Entry",
        description: "The average implied volatility percentage at which you entered your options trades. IV represents the market's expectation of future volatility. Higher IV generally means higher option premiums. Option sellers prefer high IV environments, while buyers prefer low IV."
    },
    "Max Profit (Open)": {
        title: "Maximum Profit Potential (Open Positions)",
        description: "The theoretical maximum profit you can achieve from all currently open options positions if they reach their maximum profit potential. This is particularly relevant for defined-risk strategies like credit spreads and iron condors."
    },
    "Max Loss (Open)": {
        title: "Maximum Loss Potential (Open Positions)",
        description: "The theoretical maximum loss you could incur from all currently open options positions if they reach their maximum loss potential. This represents your total risk exposure and is crucial for position sizing and risk management."
    }
};

export default function KpiCard({ title, value, isCurrency = false, valueSize = "text-xl" }) {
    const [showDialog, setShowDialog] = useState(false);
    const isPositive = isCurrency && parseFloat(value.replace(/[^0-9.-]+/g,"")) >= 0;
    const isNegative = isCurrency && parseFloat(value.replace(/[^0-9.-]+/g,"")) < 0;
    const hasExplanation = metricExplanations[title];

    return (
        <>
            <Card 
                className={`shadow-md border-0 transition-all hover:shadow-lg hover:-translate-y-1 ${hasExplanation ? 'cursor-pointer' : ''}`}
                onClick={() => hasExplanation && setShowDialog(true)}
            >
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-slate-500 font-medium truncate">{title}</p>
                        {hasExplanation && <Info className="w-3 h-3 text-slate-400" />}
                    </div>
                    <p className={`font-bold ${valueSize} ${isPositive ? 'text-green-600' : ''} ${isNegative ? 'text-red-600' : ''}`}>
                        {value}
                    </p>
                </CardContent>
            </Card>

            {hasExplanation && (
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-xl">{metricExplanations[title].title}</DialogTitle>
                            <DialogDescription className="text-base text-slate-700 mt-4 leading-relaxed">
                                {metricExplanations[title].description}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm font-semibold text-blue-900 mb-1">Your Current Value</p>
                            <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : ''} ${isNegative ? 'text-red-600' : 'text-slate-800'}`}>
                                {value}
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}