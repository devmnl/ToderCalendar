import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Briefcase, Coffee, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { getDayStatus, type DayStatus } from '../utils/schedule';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getNextStatusDay = (status: DayStatus) => {
    let day = new Date();
    // Check next 30 days
    for (let i = 1; i <= 30; i++) {
      const nextDay = new Date();
      nextDay.setDate(day.getDate() + i);
      if (getDayStatus(nextDay) === status) {
        return format(nextDay, "EEEE, d 'de' MMMM", { locale: ptBR });
      }
    }
    return 'Não encontrado';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                <CalendarIcon size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 capitalize">
                  {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Controle de Escala 14 Dias</p>
              </div>
            </div>
            
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-all text-zinc-600 dark:text-zinc-300 hover:shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-all text-zinc-900 dark:text-zinc-100"
              >
                Hoje
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-all text-zinc-600 dark:text-zinc-300 hover:shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="px-6 py-4 flex flex-wrap gap-6 bg-zinc-50/30 dark:bg-zinc-800/20 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-indigo-500 shadow-sm shadow-indigo-500/30" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Trabalho</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-amber-400 shadow-sm shadow-amber-400/30" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Folga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md border-2 border-indigo-500 bg-white dark:bg-zinc-900" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hoje</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-7 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {days.map((day, idx) => {
              const status = getDayStatus(day);
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isSelectedDay = isToday(day);
              
              return (
                <div
                  key={idx}
                  className={cn(
                    "relative aspect-square sm:aspect-auto sm:h-24 p-1.5 sm:p-2 rounded-xl border transition-all duration-200 group",
                    !isCurrentMonth ? "bg-zinc-50/50 dark:bg-zinc-800/30 border-transparent opacity-40" : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800",
                    isSelectedDay && "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-900 shadow-lg",
                    status === 'work' && isCurrentMonth && "bg-indigo-50/30 dark:bg-indigo-900/10",
                    status === 'off' && isCurrentMonth && "bg-amber-50/30 dark:bg-amber-900/10"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className={cn(
                      "text-sm font-semibold sm:text-base",
                      isCurrentMonth ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-600",
                      isSelectedDay && "text-indigo-600 dark:text-indigo-400"
                    )}>
                      {format(day, 'd')}
                    </span>
                    {isCurrentMonth && (
                      <div className={cn(
                        "p-1 rounded-md",
                        status === 'work' ? "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30" : "text-amber-500 bg-amber-100 dark:bg-amber-900/30"
                      )}>
                        {status === 'work' ? <Briefcase size={14} /> : <Coffee size={14} />}
                      </div>
                    )}
                  </div>
                  
                  {isCurrentMonth && (
                    <div className="mt-auto hidden sm:block">
                      <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter",
                        status === 'work' 
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" 
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      )}>
                        {status === 'work' ? 'Trabalho' : 'Folga'}
                      </span>
                    </div>
                  )}

                  {/* Mobile Indicator */}
                  {isCurrentMonth && (
                    <div className={cn(
                      "absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full sm:hidden",
                      status === 'work' ? "bg-indigo-500" : "bg-amber-400"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Bottom info */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-indigo-500 rounded-xl text-white">
            <Briefcase size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-indigo-900 dark:text-indigo-300">Próximo Dia de Trabalho</p>
            <p className="text-lg font-bold text-indigo-700 dark:text-indigo-100 capitalize">
              {getNextStatusDay('work')}
            </p>
          </div>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-400 rounded-xl text-white">
            <Coffee size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-900 dark:text-amber-300">Próxima Folga</p>
            <p className="text-lg font-bold text-amber-700 dark:text-amber-100 capitalize">
              {getNextStatusDay('off')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
