import React from 'react'
import { LayoutGrid, CalendarDays, CalendarClock, Plus, ListTodo } from 'lucide-react'

const NAV_ITEMS = [
    { key: 'board', label: 'Tábla', icon: LayoutGrid },
    { key: 'weekly', label: 'Heti', icon: CalendarClock },
    { key: 'calendar', label: 'Havi', icon: CalendarDays },
]

export default function Header({ activeView, setActiveView, stats, onAddClick }) {
    return (
        <header className="glass-panel-solid sticky top-0 z-40 border-b border-ocean-100/40 shadow-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-[72px]">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-sky-600
                            flex items-center justify-center shadow-glow">
                            <ListTodo size={20} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg sm:text-2xl text-ink-950 tracking-tight">
                                Feladatkezelő
                            </h1>
                            <p className="text-[11px] sm:text-xs text-ink-500 font-medium hidden sm:block">
                                {stats.pending} aktív - {stats.completed} kész
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center gap-2 sm:gap-3">
                        <nav className="flex bg-ocean-50/80 rounded-xl p-1 gap-0.5">
                            {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveView(key)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                                        activeView === key
                                            ? 'bg-white text-ocean-800 shadow-card'
                                            : 'text-ink-400 hover:text-ink-700'
                                    }`}
                                >
                                    <Icon size={15} />
                                    <span className="hidden sm:inline">{label}</span>
                                </button>
                            ))}
                        </nav>

                        <button
                            onClick={onAddClick}
                            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-ocean-600 to-ocean-700
                                text-white rounded-xl text-sm font-semibold shadow-glow hover:shadow-glow-lg
                                transition-all duration-200 hover:from-ocean-700 hover:to-ocean-800 active:scale-[0.97]"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            Új feladat
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
