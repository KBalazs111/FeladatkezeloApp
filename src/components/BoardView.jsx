import React, { useState } from 'react'
import { Circle, CheckCircle2, Inbox } from 'lucide-react'
import TaskCard from './TaskCard'

export default function BoardView({ pendingTasks, completedTasks, onToggle, onDelete, onMove }) {
    const [dragOverColumn, setDragOverColumn] = useState(null)

    const handleDragOver= (e, column) => {
        e.preventDefault()
        e.dataTransfer.dropEffect= 'move'
        setDragOverColumn(column)
    }

    const handleDragLeave = (e) => {
        const rect= e.currentTarget.getBoundingClientRect()
        const x= e.clientX
        const y= e.clientY
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            setDragOverColumn(null)
        }
    }

    const handleDrop= (e, completed) => {
        e.preventDefault()
        const taskId= e.dataTransfer.getData('text/plain')
        if (taskId) {
            onMove(taskId, completed)
        }
        setDragOverColumn(null)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Column
                title="Folyamatban"
                count={pendingTasks.length}
                icon={<Circle size={30} className="text-ocean-500" />}
                accentColor="ocean"
                tasks={pendingTasks}
                onToggle={onToggle}
                onDelete={onDelete}
                isDragOver={dragOverColumn === 'pending'}
                onDragOver={(e) => handleDragOver(e, 'pending')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, false)}
                emptyText="Nincs aktív feladat"
                emptySubtext="Adj hozzá egy új feladatot a kezdéshez"
            />

            <Column
                title="Teljesített"
                count={completedTasks.length}
                icon={<CheckCircle2 size={30} className="text-emerald-600" />}
                accentColor="emerald"
                tasks={completedTasks}
                onToggle={onToggle}
                onDelete={onDelete}
                isDragOver={dragOverColumn === 'completed'}
                onDragOver={(e) => handleDragOver(e, 'completed')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, true)}
                emptyText="Nincs kész feladat"
                emptySubtext="Húzd ide a feladatokat a befejezésükhöz"
            />
        </div>
    )
}

function Column({ title, count, icon, accentColor, tasks, onToggle, onDelete, isDragOver, onDragOver, onDragLeave, onDrop, emptyText, emptySubtext }) {
    return (
        <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`min-h-[320px] sm:min-h-[420px] rounded-2xl border-2 border-dashed p-1 transition-all duration-300
                ${isDragOver
                    ? 'border-ocean-400 bg-ocean-50/60 scale-[1.005]'
                    : 'border-transparent'
                }`}
        >

            <div className="flex items-center gap-2.5 mb-3 sm:mb-4 px-1">
                {icon}
                <h3 className="font-display font-bold text-2xl text-ink-800">{title}</h3>
                <span className={`ml-auto px-2.5 py-0.5 rounded-full text-[20px] font-mono font-bold
                    ${accentColor === 'emerald'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-ocean-100 text-ocean-700'
                    }`}>
                    {count}
                </span>
            </div>


            <div className="space-y-2.5">
                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-14 sm:py-20 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-ocean-50 flex items-center justify-center mb-3">
                            <Inbox size={20} className="text-ocean-400" />
                        </div>
                        <p className="text-sm font-semibold text-ink-500">{emptyText}</p>
                        <p className="text-xs text-ink-400 mt-1">{emptySubtext}</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
