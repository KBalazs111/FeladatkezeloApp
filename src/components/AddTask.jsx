import React, { useState, useRef, useEffect } from 'react'
import { X, Zap, Minus, ArrowDown, Clock } from 'lucide-react'

export default function AddTask({ onAdd, onCancel }) {
    const [text, setText]= useState('')
    const [priority, setPriority] = useState('medium')
    const [deadline, setDeadline]= useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const inputRef= useRef(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSubmit= (e) => {
        e.preventDefault()
        if (!text.trim()) return
        onAdd({
            text: text.trim(),
            priority,
            deadline: deadline || null,
            startTime: startTime || null,
            endTime: endTime || null,
        })
        setText('')
        setDeadline('')
        setStartTime('')
        setEndTime('')
    }

    const priorities = [
        { value:'low', label: 'Alacsony', icon: ArrowDown, active: 'text-sky-700 bg-sky-100 border-sky-300', hover: 'hover:bg-sky-50' },
        { value: 'medium', label: 'Közepes', icon: Minus, active: 'text-ocean-700 bg-ocean-100 border-ocean-300', hover: 'hover:bg-ocean-50' },
        { value: 'high', label:'Magas', icon: Zap, active:'text-rose-700 bg-rose-100 border-rose-300', hover: 'hover:bg-rose-50' },
    ]

    return (
        <div className="glass-panel-solid rounded-2xl p-5 sm:p-6 shadow-card ">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-ink-900 text-base">Új feladat hozzáadása</h2>
                <button
                    onClick={onCancel}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-400
                        hover:text-ink-700 hover:bg-ocean-50 transition-colors">
                    <X size={18} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-ink-600 mb-1.5">Feladat megnevezése</label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Pl. Házifeladat megírása..."
                        className="w-full px-4 py-3 bg-white border border-ink-200 rounded-xl
                            text-ink-900 placeholder:text-ink-300 text-sm font-medium
                            focus:outline-none focus:ring-2 focus:ring-ocean-400/40 focus:border-ocean-400
                            transition-all duration-200"
                    />
                </div>


                <div>
                    <label className="block text-xs font-semibold text-ink-600 mb-1.5">Prioritás</label>
                    <div className="flex gap-2">
                        {priorities.map(p => {
                            const Icon = p.icon
                            const isActive = priority === p.value
                            return (
                                <button
                                    key={p.value}
                                    type="button"
                                    onClick={() => setPriority(p.value)}
                                    className={`flex-col w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl
                                        text-xs font-semibold border transition-all duration-200
                                        ${isActive ? p.active + ' ring-1 ring-current/15 shadow-sm' : 'bg-white border-ink-200 text-ink-400 ' + p.hover}`}>
                                    <Icon size={13} />
                                    {p.label}
                                </button>
                            )
                        })}
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                    <div>
                        <label className="block text-xs font-semibold text-ink-600 mb-1.5">Határidő</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-3 py-2.5 bg-white border border-ink-200 rounded-xl
                                text-ink-800 text-xs font-medium
                                focus:outline-none focus:ring-2 focus:ring-ocean-400/40 focus:border-ocean-400
                                transition-all duration-200"
                        />
                    </div>


                    <div>
                        <label className="block text-xs font-semibold text-ink-600 mb-1.5">Kezdés</label>
                        <div className="relative">
                            <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full pl-8 pr-3 py-2.5 bg-white border border-ink-200 rounded-xl
                                    text-ink-800 text-xs font-medium
                                    focus:outline-none focus:ring-2 focus:ring-ocean-400/40 focus:border-ocean-400
                                    transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-ink-600 mb-1.5">Befejezés</label>
                        <div className="relative">
                            <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full pl-8 pr-3 py-2.5 bg-white border border-ink-200 rounded-xl
                                    text-ink-800 text-xs font-medium
                                    focus:outline-none focus:ring-2 focus:ring-ocean-400/40 focus:border-ocean-400
                                    transition-all duration-200"/>
                        </div>
                    </div>
                </div>



                <div className="flex gap-2 pt-1">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2.5 text-sm font-semibold text-ink-500 hover:text-ink-700
                            hover:bg-ocean-50 rounded-xl transition-colors">
                        Mégse
                    </button>
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-ocean-600 to-ocean-700
                            text-white rounded-xl text-sm font-bold shadow-glow
                            hover:from-ocean-700 hover:to-ocean-800 hover:shadow-glow-lg
                            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-glow
                            transition-all duration-200 active:scale-[0.97]">
                        Hozzáadás
                    </button>
                </div>
            </form>
        </div>
    )
}
