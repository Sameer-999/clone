import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useNavigation } from 'react-day-picker';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfDay, endOfDay, addMonths, setMonth, setYear } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function CustomCaption({ displayMonth }) {
    const { goToMonth } = useNavigation();
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

    return (
        <div className="flex items-center justify-between px-2 py-1">
            <button onClick={() => goToMonth(addMonths(displayMonth, -1))} className="p-1 hover:bg-slate-100 rounded">
                <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <div className="flex items-center gap-2">
                {/* Month */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => { setShowMonthPicker(!showMonthPicker); setShowYearPicker(false); }}
                        className="text-sm font-semibold text-slate-800 border-b border-dashed border-slate-400 hover:border-blue-500 hover:text-blue-600 transition-colors pb-0.5 bg-transparent"
                    >
                        {format(displayMonth, 'MMMM')}
                    </button>
                    {showMonthPicker && (
                        <div className="absolute top-7 left-0 z-50 bg-white border border-slate-200 rounded-lg shadow-xl p-1 w-32">
                            <div className="h-40 overflow-y-auto">
                                {MONTHS.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-slate-100 ${displayMonth.getMonth() === i ? 'font-bold text-blue-600' : 'text-slate-700'}`}
                                        onClick={() => { goToMonth(setMonth(displayMonth, i)); setShowMonthPicker(false); }}
                                    >{m}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {/* Year */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => { setShowYearPicker(!showYearPicker); setShowMonthPicker(false); }}
                        className="text-sm font-semibold text-slate-800 border-b border-dashed border-slate-400 hover:border-blue-500 hover:text-blue-600 transition-colors pb-0.5 bg-transparent"
                    >
                        {format(displayMonth, 'yyyy')}
                    </button>
                    {showYearPicker && (
                        <div className="absolute top-7 left-0 z-50 bg-white border border-slate-200 rounded-lg shadow-xl p-1 w-20">
                            <div className="h-40 overflow-y-auto">
                                {years.map((y) => (
                                    <div
                                        key={y}
                                        className={`px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-slate-100 ${displayMonth.getFullYear() === y ? 'font-bold text-blue-600' : 'text-slate-700'}`}
                                        onClick={() => { goToMonth(setYear(displayMonth, y)); setShowYearPicker(false); }}
                                    >{y}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={() => goToMonth(addMonths(displayMonth, 1))} className="p-1 hover:bg-slate-100 rounded">
                <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
        </div>
    );
}

const ranges = [
    { label: 'Today', range: { from: startOfDay(new Date()), to: endOfDay(new Date()) } },
    { label: 'This Week', range: { from: startOfWeek(new Date()), to: endOfWeek(new Date()) } },
    { label: 'This Month', range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
    { label: 'This Year', range: { from: startOfYear(new Date()), to: endOfYear(new Date()) } },
    { label: 'Last 7 Days', range: { from: subDays(new Date(), 6), to: new Date() } },
    { label: 'Last 30 Days', range: { from: subDays(new Date(), 29), to: new Date() } },
];

export default function DateRangeSelector({ value, onValueChange }) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {ranges.map(r => (
                <Button
                    key={r.label}
                    variant={
                        value?.from && value?.to &&
                        format(value.from, 'yyyy-MM-dd') === format(r.range.from, 'yyyy-MM-dd') &&
                        format(value.to, 'yyyy-MM-dd') === format(r.range.to, 'yyyy-MM-dd')
                        ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => onValueChange(r.range)}
                >
                    {r.label}
                </Button>
            ))}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full md:w-auto justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value?.from && value?.to ? 
                            `${format(value.from, "LLL d")} - ${format(value.to, "LLL d, y")}` : 
                            "Custom Range"
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        selected={value}
                        onSelect={onValueChange}
                        initialFocus
                        components={{ Caption: CustomCaption }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}