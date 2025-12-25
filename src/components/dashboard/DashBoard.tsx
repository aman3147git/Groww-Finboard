'use client';

import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Button } from '@/ui/atoms/button';
import { Card } from '@/ui/atoms/card';
import { Plus, TrendingUp, BarChart3, Activity, Eye, Grid3X3 } from 'lucide-react';
import { useWidgetStore, Widget } from '@/store/widgetStore';
import { CardWidget } from '@/widgets/Card';
import { TableWidget } from '@/widgets/Table';
import { ChartWidget } from '@/widgets/Chart';
import { AddWidgetModal } from './AddWidgetModel';
import { ModeToggle } from '../ui/ModeToggle';
import Image from 'next/image';

export function Dashboard() {
  const { widgets, isAddModalOpen, setAddModalOpen, reorderWidgets, refreshWidget } = useWidgetStore();

  useEffect(() => {
    const interval = setInterval(() => {
      widgets.forEach(widget => {
        if (!widget.isLoading && widget.apiUrl) {
          refreshWidget(widget.id);
        }
      });
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [widgets, refreshWidget]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderWidgets(result.source.index, result.destination.index);
  };

  const renderWidget = (widget: Widget) => {
    const props = { widget };
    
    switch (widget.type) {
      case 'card':
        return <CardWidget key={widget.id} {...props} />;
      case 'table':
        return <TableWidget key={widget.id} {...props} />;
      case 'chart':
        return <ChartWidget key={widget.id} {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          {/* Mobile-first responsive header */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Logo and Title */}
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 dark:from-emerald-300 dark:via-sky-300 dark:to-violet-300 bg-clip-text text-transparent">FinBoard</h1>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/70 dark:bg-slate-900/40 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300">Dashboard</span>
              </div>
                <div className="flex items-center space-x-2 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-600 dark:text-slate-300">Live updates</span>
              </div>
            </div>
            
            {/* Right: Actions */}
            <div className="flex items-center justify-between sm:justify-end space-x-2">
              {/* Mode Toggle */}
              <ModeToggle/>
              
              {/* Add Widget Button */}
              <Button
                onClick={() => setAddModalOpen(true)}
                size="sm"
                className="px-3 sm:px-4 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Add Widget</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-5">
          {/* LEFT: main content */}
          <div className="space-y-6">
            {/* Widgets Section */}
            <div className="space-y-5">
        {widgets.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Widgets</h2>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                    <Eye className="w-3 h-3" />
                    <span>Drag to reorder</span>
                  </div>
                </div>
              )}

              {widgets.length >= 0 ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="widgets" direction="horizontal">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                      >
                        {widgets
                          .sort((a, b) => a.position - b.position)
                          .map((widget, index) => (
                            <Draggable key={widget.id} draggableId={widget.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`transition-all duration-200 ${
                                    widget.type === 'table' ? 'sm:col-span-2 lg:col-span-3' : ''
                                  } ${
                                    snapshot.isDragging 
                                      ? 'scale-[1.02] shadow-xl z-50 rotate-1' 
                                      : 'hover:shadow-md'
                                  }`}
                                >
                                  {renderWidget(widget)}
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                /* Empty State - Completely redesigned two-column hero */
                <Card className="border-0 overflow-hidden rounded-3xl shadow-xl">
                  <div className="relative">
                    <div className="absolute -inset-10 bg-gradient-to-tr from-emerald-400/15 via-cyan-400/10 to-indigo-400/10 blur-3xl" />
                    <div className="relative px-4 sm:px-6 py-10 sm:py-12">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
                        {/* Left copy */}
                        <div className="lg:col-span-7 text-center lg:text-left">
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-900/40 px-3 py-1 text-xs border border-white/50 dark:border-white/10 mb-3">
                            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live data ready
              </div>
                          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            Build your first widget
                          </h3>
                          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0">
                            Connect an API, pick a chart, and visualize insights in seconds.
                          </p>
                          <div className="mt-5 flex items-center justify-center lg:justify-start gap-3">
                            <Button onClick={() => setAddModalOpen(true)} className="px-5">
                              <Plus className="w-4 h-4 mr-2" /> Create widget
                            </Button>
                            <Button variant="outline" onClick={() => setAddModalOpen(true)} className="px-5">
                              Quick start
                            </Button>
                  </div>
                </div>
                        {/* Right preview grid moved into empty state only */}
                        <div className="lg:col-span-5 hidden lg:block">
                          <div className="grid grid-cols-12 gap-4 sm:gap-5">
                            <div className="col-span-12 h-40 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3 sm:p-4 rotate-[-1.5deg]"></div>
                            <div className="col-span-6 h-28 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10"></div>
                            <div className="col-span-6 h-28 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10"></div>
                  </div>
                </div>
                </div>
              </div>
                  </div>
                </Card>
              )}
                </div>
              </div>

          {/* RIGHT SIDEBAR: vertical stats with divider */}
          <div className="space-y-3 pl-4 lg:pl-6 border-l border-white/40 dark:border-white/10">
            {widgets.length > 0 && (
              <>
                <Card className="border-0 p-5 sm:p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Total widgets</div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{widgets.length}</div>
                 
                </Card>
                <Card className="border-0 p-5 sm:p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Cards</div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{widgets.filter(w => w.type === 'card').length}</div>
               
                </Card>
                <Card className="border-0 p-5 sm:p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Tables</div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{widgets.filter(w => w.type === 'table').length}</div>
              
                </Card>
                <Card className="border-0 p-4 sm:p-5 rounded-2xl">
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Charts</div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{widgets.filter(w => w.type === 'chart').length}</div>
              
            </Card>
              </>
            )}
          </div>
        </div>

        {/* Widgets Section (duplicate) hidden */}
        {false && (<div className="space-y-4">
          {widgets.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Widgets</h2>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Eye className="w-3 h-3" />
                <span>Drag to reorder</span>
              </div>
            </div>
          )}

          {widgets.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="widgets" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {widgets
                      .sort((a, b) => a.position - b.position)
                      .map((widget, index) => (
                        <Draggable key={widget.id} draggableId={widget.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`transition-all duration-200 ${
                                widget.type === 'table' ? 'sm:col-span-2 lg:col-span-3' : ''
                              } ${
                                snapshot.isDragging 
                                  ? 'scale-[1.02] shadow-xl z-50 rotate-1' 
                                  : 'hover:shadow-md'
                              }`}
                            >
                              {renderWidget(widget)}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            /* Empty State - Completely redesigned two-column hero */
            <Card className="border-0 overflow-hidden">
              <div className="relative">
                <div className="absolute -inset-10 bg-gradient-to-tr from-emerald-400/15 via-cyan-400/10 to-indigo-400/10 blur-3xl" />
                <div className="relative px-4 sm:px-6 py-10 sm:py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
                    {/* Left copy */}
                    <div className="lg:col-span-5 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-900/40 px-3 py-1 text-xs border border-white/50 dark:border-white/10 mb-3">
                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live data ready
                </div>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        Build your first widget
                </h3>
                      <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0">
                        Connect an API, pick a chart, and visualize insights in seconds.
                      </p>
                      <div className="mt-5 flex items-center justify-center lg:justify-start gap-3">
                        <Button onClick={() => setAddModalOpen(true)} className="px-5">
                          <Plus className="w-4 h-4 mr-2" /> Create widget
                        </Button>
                        <Button variant="outline" onClick={() => setAddModalOpen(true)} className="px-5">
                          Quick start
                  </Button>
                      </div>
                      <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2 text-[11px]">
                        {['Real‑time','Charts','Tables','Secure'].map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/40 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300">{t}</span>
                        ))}
                      </div>
                    </div>
                    {/* Right preview grid */}
                    <div className="lg:col-span-7">
                      <div className="grid grid-cols-12 gap-4 sm:gap-5">
                        {/* Large Line/Area */}
                        <div className="col-span-12 sm:col-span-8 h-48 sm:h-56 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3 sm:p-4 rotate-[-1.5deg]">
                          <div className="h-full w-full rounded-lg bg-gradient-to-b from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/10 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:18px_18px]" />
                            <svg viewBox="0 0 400 150" className="absolute inset-0 w-full h-full">
                              <defs>
                                <linearGradient id="dashLine" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="#10b981" />
                                  <stop offset="100%" stopColor="#22d3ee" />
                                </linearGradient>
                                <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#10b98122" />
                                  <stop offset="100%" stopColor="#22d3ee11" />
                                </linearGradient>
                              </defs>
                              <path d="M0,110 C40,95 70,125 110,100 C150,76 190,30 230,58 C270,84 320,60 360,76 L400,82 L400,150 L0,150 Z" fill="url(#dashFill)" />
                              <path d="M0,110 C40,95 70,125 110,100 C150,76 190,30 230,58 C270,84 320,60 360,76" stroke="url(#dashLine)" strokeWidth="3" fill="none" />
                              {Array.from({length:11}).map((_,i)=>{
                                const x = 18 + i*35; const y = 110 - Math.abs(Math.sin(i/2))*48 - (i%2?4:0);
                                return <circle key={i} cx={x} cy={y} r="2.2" fill="#10b981" />
                              })}
                            </svg>
                          </div>
                        </div>
                        {/* Donut */}
                        <div className="col-span-12 sm:col-span-4 h-48 sm:h-56 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3 flex flex-col items-center justify-center">
                          <div className="relative size-28">
                            <svg viewBox="0 0 36 36" className="transform -rotate-90">
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#34d399" strokeWidth="6" strokeDasharray="40 83" />
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#60a5fa" strokeWidth="6" strokeDasharray="25 98" strokeDashoffset="-40" />
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#fbbf24" strokeWidth="6" strokeDasharray="18 105" strokeDashoffset="-65" />
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#a78bfa" strokeWidth="6" strokeDasharray="12 111" strokeDashoffset="-83" />
                            </svg>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-1"><span className="size-2 rounded-full bg-emerald-400" />Stocks</div>
                            <div className="flex items-center gap-1"><span className="size-2 rounded-full bg-sky-400" />ETFs</div>
                            <div className="flex items-center gap-1"><span className="size-2 rounded-full bg-amber-400" />Crypto</div>
                            <div className="flex items-center gap-1"><span className="size-2 rounded-full bg-violet-400" />Cash</div>
                          </div>
                        </div>
                        {/* Bars */}
                        <div className="col-span-12 sm:col-span-5 h-32 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3">
                          <div className="flex items-end h-full gap-2">
                            {[28,64,36,52,78,44,58].map((h,i)=> (
                              <div key={i} className="flex-1 rounded-md bg-gradient-to-t from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-500">
                                <div className="w-full rounded-md bg-gradient-to-t from-emerald-500 to-cyan-500" style={{height: `${h}%`}} />
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Mini table */}
                        <div className="col-span-12 sm:col-span-7 h-32 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3">
                          <div className="grid grid-cols-3 text-[12px] text-slate-500 dark:text-slate-300">
                            <div>Ticker</div>
                            <div className="text-center">Price</div>
                            <div className="text-right">Change</div>
                          </div>
                          <div className="mt-2 space-y-1.5 text-[13px]">
                            {[['AAPL','$212.45','+1.2%'],['ETH','$3,280','-0.6%'],['TSLA','$248.10','+0.9%'],['MSFT','$421.05','+0.3%']].map((r,i)=> (
                              <div key={i} className="grid grid-cols-3 rounded-md px-2 py-1 bg-slate-50/80 dark:bg-slate-900/40">
                                <div className="font-medium text-slate-800 dark:text-white">{r[0]}</div>
                                <div className="text-center text-slate-700 dark:text-slate-200">{r[1]}</div>
                                <div className={`text-right ${r[2].startsWith('+')?'text-emerald-600':'text-rose-500'}`}>{r[2]}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>)}

        <AddWidgetModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      </div>
    </div>
  );
}