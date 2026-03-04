import React, { useState, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generateId } from './utils/helpers'
import Header from './components/Header'
import AddTask from './components/AddTask'
import BoardView from './components/BoardView'
import CalendarView from './components/CalendarView'
import WeeklyView from './components/WeeklyView'

export default function App() {
    const [tasks, setTasks] = useLocalStorage('todo-tasks-v2', [])
    const [activeView, setActiveView] = useState('board')
    const [showAddForm, setShowAddForm] = useState(false)

    const addTask = useCallback((taskData) => {
        const newTask = {
            id: generateId(),
            text: taskData.text,
            completed: false,
            priority: taskData.priority || 'medium',
            deadline: taskData.deadline || null,
            startTime: taskData.startTime || null,
            endTime: taskData.endTime || null,
            createdAt: new Date().toISOString(),
        }
        setTasks(prev => [newTask, ...prev])
        setShowAddForm(false)
    }, [setTasks])

    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(t => t.id !== id))
    }, [setTasks])

    const toggleTask = useCallback((id) => {
        setTasks(prev =>
            prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        )
    }, [setTasks])

    const moveTask = useCallback((taskId, completed) => {
        setTasks(prev =>
            prev.map(t => t.id === taskId ? { ...t, completed } : t)
        )
    }, [setTasks])

    const pendingTasks = tasks.filter(t => !t.completed)
    const completedTasks = tasks.filter(t => t.completed)
    const stats = {
        total: tasks.length,
        pending: pendingTasks.length,
        completed: completedTasks.length,
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-blob" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, #14a594, #0c97e6)', top: '-100px', right: '-100px' }} />
            <div className="bg-blob" style={{ width: '350px', height: '350px', background: 'radial-gradient(circle, #79cdfb, #56d6c2)', bottom: '10%', left: '-80px', animationDelay: '-7s' }} />
            <div className="bg-blob" style={{ width: '250px', height: '250px', background: 'radial-gradient(circle, #94ead9, #b8e3fd)', top: '40%', right: '10%', animationDelay: '-13s' }} />
            <Header
                activeView={activeView}
                setActiveView={setActiveView}
                stats={stats}
                onAddClick={() => setShowAddForm(true)}
            />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-8">
                {showAddForm && (
                    <div className="fade-in mb-6">
                        <AddTask
                            onAdd={addTask}
                            onCancel={() => setShowAddForm(false)}
                        />
                    </div>
                )}

                {activeView === 'board' && (
                    <BoardView
                        pendingTasks={pendingTasks}
                        completedTasks={completedTasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onMove={moveTask}
                    />
                )}
                {activeView === 'calendar' && (
                    <CalendarView
                        tasks={tasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                )}
                {activeView === 'weekly' && (
                    <WeeklyView
                        tasks={tasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                )}
            </main>

            {!showAddForm && (
                <button
                    onClick={() => setShowAddForm(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-ocean-500 to-sky-600
                        text-white rounded-2xl shadow-glow-lg hover:shadow-glow flex items-center justify-center
                        transition-all duration-300 hover:scale-105 active:scale-95 z-50 sm:hidden"
                    aria-label="Új feladat"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            )}
        </div>
    )
}
