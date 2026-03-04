import React from 'react'
import { Trash2, GripVertical, Clock, Zap, Minus, ArrowDown, Timer } from 'lucide-react'
import { formatDateShort, formatTime, isOverdue, PRIORITY_COLORS, PRIORITY_LABELS } from '../utils/helpers'

export default function TaskCard({ task, onToggle, onDelete }) {
    const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
    const overdue = !task.completed && isOverdue(task.deadline)
    const hasTimeRange = task.startTime && task.endTime

    const PriorityIcon = task.priority === 'high' ? Zap : task.priority === 'low' ? ArrowDown : Minus

    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', task.id)
                e.dataTransfer.effectAllowed = 'move'
                e.currentTarget.classList.add('task-card-dragging')
            }}
            onDragEnd={(e) => {
                e.currentTarget.classList.remove('task-card-dragging')
            }}
            className={`group glass-panel-solid rounded-xl p-3.5 sm:p-4 shadow-card card-lift
                hover:shadow-card-hover cursor-grab active:cursor-grabbing
                transition-all duration-200 fade-in
                ${task.completed ? 'opacity-70' : ''}`}
        >
            <div className="flex items-start gap-3">

                <div className="mt-0.5 text-ink-300 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    <GripVertical size={16} />
                </div>

                <button
                    onClick={() => onToggle(task.id)}
                    className={`mt-0.5 w-[22px] h-[22px] rounded-lg border-2 flex-shrink-0 flex items-center justify-center
                        transition-all duration-200
                        ${task.completed
                            ? 'bg-ocean-600 border-ocean-600 shadow-sm'
                            : 'border-ink-300 hover:border-ocean-500 hover:bg-ocean-50'
                        }`}
                >
                    {task.completed && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </button>


                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-relaxed break-words ${
                        task.completed
                            ? 'line-through text-ink-400'
                            : 'text-ink-900'
                    }`}>
                        {task.text}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2">

                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.border}`}>
                            <PriorityIcon size={10} />
                            {PRIORITY_LABELS[task.priority]}
                        </span>


                        {task.deadline && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold
                                ${overdue
                                    ? 'bg-rose-100 text-rose-700 border border-rose-300'
                                    : 'bg-sky-50 text-sky-700 border border-sky-200'
                                }`}
                            >
                                <Clock size={10} />
                                {formatDateShort(task.deadline)}
                                {overdue && ' — lejárt!'}
                            </span>
                        )}


                        {hasTimeRange && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold
                                bg-ocean-50 text-ocean-700 border border-ocean-200">
                                <Timer size={10} />
                                {formatTime(task.startTime)} – {formatTime(task.endTime)}
                            </span>
                        )}
                    </div>
                </div>


                <button
                    onClick={() => onDelete(task.id)}
                    className="mt-0.5 w-7 h-7 flex items-center justify-center rounded-lg
                        text-ink-300 opacity-0 group-hover:opacity-100
                        hover:text-rose-600 hover:bg-rose-50
                        transition-all duration-200"
                    aria-label="Feladat törlése"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    )
}
