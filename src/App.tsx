import Calendar from './components/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-2">
          Minha Escala
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          Calendário personalizado para acompanhamento de escala de trabalho e folgas.
        </p>
      </header>
      
      <main className="w-full">
        <Calendar />
      </main>
      
      <footer className="mt-12 text-zinc-400 dark:text-zinc-600 text-sm">
        © {new Date().getFullYear()} ToderCalendar • Planejamento de Escala
      </footer>
    </div>
  )
}

export default App
