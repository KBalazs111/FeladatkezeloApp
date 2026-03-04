import React, { useState, useMemo, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Clock, Timer, Trash2, Zap, ArrowDown, Minus } from 'lucide-react'
import { getWeekDates, getDateKey, isSameDay, timeToHour, formatTime, HOURS, PRIORITY_COLORS, PRIORITY_LABELS, DAY_NAMES, MONTH_NAMES } from '../utils/helpers'

const HOUR_HEIGHT = 64
const MIN_BLOCK_HEIGHT = 28

export default function WeeklyView({ tasks, onToggle, onDelete }) {
    const today = new Date()
    const [baseDate, setBaseDate] = useState(today)
    const scrollRef = useRef(null)

    const weekDates = useMemo(() => getWeekDates(baseDate), [baseDate])

    const weekStart = weekDates[0]
    const weekEnd = weekDates[6]

    //  dateKey -> tasks[]
    const tasksByDate = useMemo(() => {
        const map = {}
        tasks.forEach(task => {
            if (task.deadline) {
                const key = task.deadline
                if (!map[key]) map[key] = []
                map[key].push(task)
            }
        })
        return map
    }, [tasks])

    const prevWeek = () => {
        const d = new Date(baseDate)
        d.setDate(d.getDate() - 7)
        setBaseDate(d)
    }

    const nextWeek = () => {
        const d = new Date(baseDate)
        d.setDate(d.getDate() + 7)
        setBaseDate(d)
    }

    const goToday = () => setBaseDate(new Date())


    useEffect(() => {
        if (scrollRef.current) {
            const now = new Date()
            const currentHour = now.getHours()
            const scrollTo = Math.max(0, (currentHour - 1) * HOUR_HEIGHT)
            scrollRef.current.scrollTop = scrollTo
        }
    }, [])


    const rangeLabel = useMemo(() => {
        const s = weekStart
        const e = weekEnd
        if (s.getMonth() === e.getMonth()) {
            return `${MONTH_NAMES[s.getMonth()]} ${s.getDate()} – ${e.getDate()}, ${s.getFullYear()}`
        }
        return `${MONTH_NAMES[s.getMonth()]} ${s.getDate()} – ${MONTH_NAMES[e.getMonth()]} ${e.getDate()}, ${s.getFullYear()}`
    }, [weekStart, weekEnd])


    const nowIndicator = useMemo(() => {
        const now = new Date()
        const h = now.getHours() + now.getMinutes() / 60
        return h * HOUR_HEIGHT
    }, [])

    const isCurrentWeek = weekDates.some(d => isSameDay(d, today))

    return (
        <div className="glass-panel-solid rounded-2xl shadow-card overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-ink-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="font-display font-bold text-base sm:text-lg text-ink-950">{rangeLabel}</h2>
                    <button
                        onClick={goToday}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors
                            ${isCurrentWeek
                                ? 'bg-ocean-600 text-white'
                                : 'text-ocean-700 bg-ocean-100 hover:bg-ocean-200'
                            }`}
                    >
                        Ma
                    </button>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={prevWeek} className="w-9 h-9 flex items-center justify-center rounded-xl text-ink-600 hover:bg-ocean-50 transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={nextWeek} className="w-9 h-9 flex items-center justify-center rounded-xl text-ink-600 hover:bg-ocean-50 transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="grid border-b border-ink-100" style={{ gridTemplateColumns: '56px repeat(7, 1fr)' }}>
                <div className="border-r border-ink-100/50" />
                {weekDates.map((date, i) => {
                    const isToday = isSameDay(date, today)
                    const dateKey = getDateKey(date)
                    const dayTaskCount = (tasksByDate[dateKey] || []).length
                    return (
                        <div
                            key={i}
                            className={`text-center py-3 border-r border-ink-100/50 last:border-r-0
                                ${isToday ? 'bg-ocean-50/60' : ''}`}
                        >
                            <div className={`text-[10px] font-bold uppercase tracking-widest ${isToday ? 'text-ocean-700' : 'text-ink-400'}`}>
                                {DAY_NAMES[i].slice(0, 3)}
                            </div>
                            <div className={`text-lg font-bold mt-0.5 ${isToday ? 'text-ocean-700' : 'text-ink-800'}`}>
                                {date.getDate()}
                            </div>
                            {dayTaskCount > 0 && (
                                <div className={`text-[10px] font-bold mt-0.5 ${isToday ? 'text-ocean-600' : 'text-ink-400'}`}>
                                    {dayTaskCount} feladat
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div ref={scrollRef} className="overflow-y-auto overflow-x-auto" style={{ maxHeight: '65vh' }}>
                <div className="relative grid" style={{ gridTemplateColumns: '56px repeat(7, 1fr)' }}>

                    <div className="border-r border-ink-100/50">
                        {HOURS.map(hour => (
                            <div key={hour} className="h-[64px] flex items-start justify-end pr-2 pt-0">
                                <span className="text-[10px] font-mono font-bold text-ink-400 -mt-1.5 select-none">
                                    {String(hour).padStart(2, '0')}:00
                                </span>
                            </div>
                        ))}
                    </div>

                    {weekDates.map((date, colIdx) => {
                        const isToday = isSameDay(date, today)
                        const dateKey = getDateKey(date)
                        const dayTasks = tasksByDate[dateKey] || []
                        const timedTasks = dayTasks.filter(t => t.startTime && t.endTime)
                        const untimedTasks = dayTasks.filter(t => !t.startTime || !t.endTime)

                        return (
                            <div
                                key={colIdx}
                                className={`relative border-r border-ink-100/50 last:border-r-0
                                    ${isToday ? 'bg-ocean-50/30' : ''}`}
                            >

                                {HOURS.map(hour => (
                                    <div key={hour} className="h-[64px] border-b border-ink-100/40" />
                                ))}


                                {isToday && isCurrentWeek && nowIndicator !== null && (
                                    <div
                                        className="absolute left-0 right-0 z-20 pointer-events-none"
                                        style={{ top: `${nowIndicator}px` }}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 -ml-1 shadow-sm pulse-ring" />
                                            <div className="flex-1 h-[2px] bg-rose-500/70" />
                                        </div>
                                    </div>
                                )}


                                {untimedTasks.length > 0 && (
                                    <div className="absolute top-1 left-1 right-1 z-10 space-y-0.5">
                                        {untimedTasks.slice(0, 2).map(task => (
                                            <UntimedTaskPill key={task.id} task={task} onToggle={onToggle} />
                                        ))}
                                        {untimedTasks.length > 2 && (
                                            <div className="text-[9px] font-bold text-ink-400 pl-1">+{untimedTasks.length - 2} további</div>
                                        )}
                                    </div>
                                )}


                                {timedTasks.map(task => (
                                    <TimeBlock key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>



        </div>
    )
}

function TimeBlock({ task, onToggle, onDelete }) {
    const startHour = timeToHour(task.startTime)
    const endHour = timeToHour(task.endTime)
    const firstHour = HOURS[0]

    const top = Math.max(0, (startHour - firstHour) * HOUR_HEIGHT)
    const height = Math.max(MIN_BLOCK_HEIGHT, (endHour - startHour) * HOUR_HEIGHT - 2)

    const pStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
    const isSmall = height < 48
    const PIcon = task.priority === 'high' ? Zap : task.priority === 'low' ? ArrowDown : Minus

    return (
        <div
            className={`time-block absolute left-1 right-1 z-10 rounded-lg border-l-[3px] px-2 overflow-hidden cursor-pointer
                ${task.completed ? 'opacity-60' : ''}
                ${pStyle.block}`}
            style={{ top: `${top}px`, height: `${height}px` }}
            onClick={() => onToggle(task.id)}
            title={`${task.text}\n${formatTime(task.startTime)} – ${formatTime(task.endTime)}`}
        >
            <div className={`flex flex-col justify-center h-full ${isSmall ? 'gap-0' : 'gap-0.5'}`}>
                <div className="flex items-center gap-1">
                    {task.completed ? (
                        <CheckCircle2 size={11} className="text-emerald-600 flex-shrink-0" />
                    ) : (
                        <PIcon size={10} className="flex-shrink-0" />
                    )}
                    <span className={`text-[11px] font-bold truncate leading-tight ${task.completed ? 'line-through opacity-70' : ''}`}>
                        {task.text}
                    </span>
                </div>
                {!isSmall && (
                    <span className="text-[10px] font-semibold opacity-70">
                        {formatTime(task.startTime)} – {formatTime(task.endTime)}
                    </span>
                )}
            </div>
        </div>
    )
}

function UntimedTaskPill({ task, onToggle }) {
    const pStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
    return (
        <div
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold truncate cursor-pointer
                border ${task.completed ? 'opacity-50 line-through' : ''}
                ${pStyle.bg} ${pStyle.text} ${pStyle.border}`}
            onClick={() => onToggle(task.id)}
            title={task.text}
        >
            {task.completed
                ? <CheckCircle2 size={9} className="flex-shrink-0 text-emerald-600" />
                : <Circle size={9} className="flex-shrink-0" />
            }
            <span className="truncate">{task.text}</span>
        </div>
    )
}
