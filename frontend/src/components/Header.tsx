
export function Header() {
    return (
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">HealthDashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-slate-500">Dr. Smith</div>
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            </div>
        </header>
    );
}
