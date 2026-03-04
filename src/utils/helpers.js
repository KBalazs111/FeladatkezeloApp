export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export function formatDateShort(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('hu-HU', {
        month: 'short',
        day: 'numeric'
    })
}

export function formatTime(timeStr) {
    if (!timeStr) return ''
    return timeStr.slice(0, 5)
}

export function isOverdue(dateStr) {
    if (!dateStr) return false
    const deadline = new Date(dateStr)
    deadline.setHours(23, 59, 59, 999)
    return deadline < new Date()
}

export function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
}

export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year, month) {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1
}

export function getWeekDates(baseDate) {
    const date = new Date(baseDate)
    const day = date.getDay()
    const monday = new Date(date)
    monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1))

    const dates = []
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday)
        d.setDate(monday.getDate() + i)
        dates.push(d)
    }
    return dates
}

export function getDateKey(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

export function timeToHour(timeStr) {
    if (!timeStr) return 0
    const [h, m] = timeStr.split(':').map(Number)
    return h + m / 60
}

export const HOURS = Array.from({ length: 24 }, (_, i) => i)

export const PRIORITY_COLORS = {
    low: {
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        dot: 'bg-sky-500',
        block: 'bg-sky-100 border-sky-300 text-sky-800',
        blockDark: 'bg-sky-200/80',
    },
    medium: {
        bg: 'bg-ocean-50',
        text: 'text-ocean-700',
        border: 'border-ocean-200',
        dot: 'bg-ocean-500',
        block: 'bg-ocean-100 border-ocean-300 text-ocean-800',
        blockDark: 'bg-ocean-200/80',
    },
    high: {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dot: 'bg-rose-500',
        block: 'bg-rose-100 border-rose-300 text-rose-800',
        blockDark: 'bg-rose-200/80',
    },
}

export const PRIORITY_LABELS = {
    low: 'Alacsony',
    medium: 'Közepes',
    high: 'Magas',
}

export const DAY_NAMES_SHORT = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V']
export const DAY_NAMES = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']

export const MONTH_NAMES = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
]
