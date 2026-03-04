import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, Circle, Timer, Zap, ArrowDown, Minus } from 'lucide-react'
import { getDaysInMonth, getFirstDayOfMonth, isSameDay, formatTime, PRIORITY_COLORS, PRIORITY_LABELS, DAY_NAMES_SHORT, MONTH_NAMES } from '../utils/helpers'

export default function CalendarView({ tasks, onToggle, onDelete }) {
    const today = new Date()
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [selectedDate, setSelectedDate] = useState(null)

    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

    const tasksByDate = useMemo(() => {
        const map = {}
        tasks.forEach(task => {
            if (task.deadline) {
                if (!map[task.deadline]) map[task.deadline] = []
                map[task.deadline].push(task)
            }
        })
        return map
    }, [tasks])

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(y => y - 1)
        } else {
            setCurrentMonth(m => m - 1)
        }
        setSelectedDate(null)
    }

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(y => y + 1)
        } else {
            setCurrentMonth(m => m + 1)
        }
        setSelectedDate(null)
    }

    const goToday = () => {
        setCurrentYear(today.getFullYear())
        setCurrentMonth(today.getMonth())
        setSelectedDate(null)
    }

    const cells = []
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)

    const getDateKey = (day) => {
        const m = String(currentMonth + 1).padStart(2, '0')
        const d = String(day).padStart(2, '0')
        return `${currentYear}-${m}-${d}`
    }

    const isToday = (day) => isSameDay(new Date(currentYear, currentMonth, day), today)

    const selectedDateKey = selectedDate ? getDateKey(selectedDate) : null
    const selectedTasks = selectedDateKey ? (tasksByDate[selectedDateKey] || []) : []

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            <div className="lg:col-span-2 glass-panel-solid rounded-2xl p-4 sm:p-6 shadow-card">

                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <h2 className="font-display font-bold text-lg sm:text-xl text-ink-950">
                            {MONTH_NAMES[currentMonth]} {currentYear}
                        </h2>
                        <button
                            onClick={goToday}
                            className="px-2.5 py-1 text-[11px] font-bold text-ocean-700 bg-ocean-100
                                hover:bg-ocean-200 rounded-lg transition-colors"
                        >
                            Ma
                        </button>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={prevMonth} className="w-9 h-9 flex items-center justify-center rounded-xl text-ink-600 hover:bg-ocean-50 transition-colors">
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={nextMonth} className="w-9 h-9 flex items-center justify-center rounded-xl text-ink-600 hover:bg-ocean-50 transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-1">
                    {DAY_NAMES_SHORT.map(day => (
                        <div key={day} className="text-center text-[11px] font-bold text-ink-500 py-2 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {cells.map((day, i) => {
                        if (day === null) return <div key={`e-${i}`} className="min-h-[72px] sm:min-h-[88px]" />

                        const dateKey = getDateKey(day)
                        const dayTasks = tasksByDate[dateKey] || []
                        const hasTasks = dayTasks.length > 0
                        const pendingCount = dayTasks.filter(t => !t.completed).length
                        const doneCount = dayTasks.filter(t => t.completed).length
                        const isSelected = selectedDate === day
                        const todayMark = isToday(day)

                        return (
                            <button
                                key={day}
                                onClick={() => setSelectedDate(day === selectedDate ? null : day)}
                                className={`min-h-[72px] sm:min-h-[88px] rounded-xl flex flex-col items-center justify-start pt-1.5 sm:pt-2 gap-0.5
                                    transition-all duration-200 relative overflow-hidden
                                    ${isSelected
                                        ? 'bg-ocean-600 text-white shadow-glow ring-2 ring-ocean-400/30'
                                        : todayMark
                                            ? 'bg-ocean-100/70 text-ocean-900 font-bold ring-1 ring-ocean-300/40'
                                            : 'hover:bg-ocean-50/60 text-ink-700'
                                    }`}
                            >
                                <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'font-bold' : ''}`}>
                                    {day}
                                </span>


                                {hasTasks && (
                                    <div className="flex flex-col items-center gap-0.5 mt-0.5 w-full px-0.5">
                                        <div className="hidden sm:flex flex-col gap-0.5 w-full">
                                            {dayTasks.slice(0, 2).map((t, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-full px-1 py-0 rounded text-[8px] font-bold leading-tight truncate text-left
                                                        ${isSelected
                                                            ? (t.completed ? 'bg-white/20 text-white/60 line-through' : 'bg-white/30 text-white')
                                                            : (t.completed
                                                                ? 'bg-emerald-100 text-emerald-600 line-through'
                                                                : (t.priority === 'high'
                                                                    ? 'bg-rose-100 text-rose-700'
                                                                    : t.priority === 'low'
                                                                        ? 'bg-sky-100 text-sky-700'
                                                                        : 'bg-ocean-100 text-ocean-700'))
                                                        }`}
                                                    title={t.text}
                                                >
                                                    {t.text.length > 10 ? t.text.slice(0, 9) + '\u2026' : t.text}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex sm:hidden gap-0.5">
                                            {dayTasks.slice(0, 3).map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        isSelected ? 'bg-white/70' : (t.completed ? 'bg-emerald-400' : (PRIORITY_COLORS[t.priority]?.dot || 'bg-ocean-400'))
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        {/* Counter */}
                                        {dayTasks.length > 2 && (
                                            <span className={`text-[8px] font-mono font-bold leading-none ${isSelected ? 'text-white/60' : 'text-ink-400'}`}>
                                                +{dayTasks.length - 2}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>


            <div className="glass-panel-solid rounded-2xl p-4 sm:p-5 shadow-card flex flex-col">
                {selectedDate ? (
                    <>
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ink-100">
                            <div className="w-8 h-8 rounded-lg bg-ocean-100 flex items-center justify-center">
                                <span className="text-sm font-bold text-ocean-700">{selectedDate}</span>
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-sm text-ink-900">
                                    {MONTH_NAMES[currentMonth]} {selectedDate}.
                                </h3>
                                <p className="text-[11px] text-ink-500 font-medium">
                                    {selectedTasks.filter(t => !t.completed).length} aktív, {selectedTasks.filter(t => t.completed).length} kész
                                </p>
                            </div>
                        </div>

                        {selectedTasks.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-sm text-ink-500 font-medium">Nincs feladat erre a napra</p>
                            </div>
                        ) : (
                            <div className="space-y-2 flex-1 overflow-y-auto">
                                {selectedTasks.map(task => (
                                    <CalendarTaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-14 text-center flex-1">
                        <div className="w-14 h-14 rounded-2xl bg-ocean-50 flex items-center justify-center mb-3">
                            <Clock size={22} className="text-ocean-400" />
                        </div>
                        <p className="text-sm font-bold text-ink-600">Válassz egy napot</p>
                        <p className="text-xs text-ink-400 mt-1.5 max-w-[200px]">Kattints egy napra a naptárban a feladatok részleteinek megtekintéséhez</p>
                    </div>
                )}

                <UpcomingTasks tasks={tasks} />
            </div>
        </div>
    )
}

function CalendarTaskItem({ task, onToggle, onDelete }) {
    const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
    const hasTime = task.startTime && task.endTime
    const PIcon = task.priority === 'high' ? Zap : task.priority === 'low' ? ArrowDown : Minus

    return (
        <div className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all duration-200 fade-in
            ${task.completed
                ? 'bg-emerald-50/60 border-emerald-200/60'
                : 'bg-white border-ink-200/60 hover:border-ocean-300 hover:shadow-sm'
            }`}
        >
            <button onClick={() => onToggle(task.id)} className="mt-0.5 flex-shrink-0">
                {task.completed ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                ) : (
                    <Circle size={18} className="text-ink-300 hover:text-ocean-600 transition-colors" />
                )}
            </button>
            <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium block ${task.completed ? 'line-through text-ink-400' : 'text-ink-900'}`}>
                    {task.text}
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${priorityStyle.bg} ${priorityStyle.text}`}>
                        <PIcon size={9} />
                        {PRIORITY_LABELS[task.priority]}
                    </span>
                    {hasTime && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-ocean-50 text-ocean-700">
                            <Timer size={9} />
                            {formatTime(task.startTime)} – {formatTime(task.endTime)}
                        </span>
                    )}
                </div>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="text-[11px] text-ink-300 hover:text-rose-600 transition-colors mt-0.5 font-bold"
            >
                ✕
            </button>
        </div>
    )
}

function UpcomingTasks({ tasks }) {
    const upcoming = useMemo(() => {
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        return tasks
            .filter(t => !t.completed && t.deadline && new Date(t.deadline) >= now)
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .slice(0, 5)
    }, [tasks])

    if (upcoming.length === 0) return null

    return (
        <div className="mt-5 pt-4 border-t border-ink-100">
            <h4 className="text-[11px] font-bold text-ink-600 uppercase tracking-widest mb-3">
                Közelgő határidők
            </h4>
            <div className="space-y-1.5">
                {upcoming.map(task => {
                    const d = new Date(task.deadline)
                    const now = new Date()
                    now.setHours(0, 0, 0, 0)
                    const diffDays = Math.ceil((d - now) / (1000 * 60 * 60 * 24))
                    return (
                        <div key={task.id} className="flex items-center gap-2 text-xs">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${PRIORITY_COLORS[task.priority]?.dot || 'bg-ocean-400'}`} />
                            <span className="text-ink-700 font-medium truncate flex-1">{task.text}</span>
                            <span className={`font-mono font-bold flex-shrink-0 ${diffDays <= 1 ? 'text-rose-600' : diffDays <= 3 ? 'text-amber-600' : 'text-ink-500'}`}>
                                {diffDays === 0 ? 'ma' : diffDays === 1 ? 'holnap' : `${diffDays} nap`}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
