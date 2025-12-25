'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/ui/atoms/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/atoms/select';
import { Plus } from 'lucide-react';
import { useWidgetStore, WidgetTheme } from '@/store/widgetStore';
import { ConfigureTab } from '@/features/builder/tabs/Configure';
import { ThemeTab } from '@/features/builder/tabs/Theme';
import { FieldsTab } from '@/features/builder/tabs/Fields';
// import { extractFields } from '@/lib/dataUtils';
// import { cardSamples, tableSamples, chartSamples } from '@/lib/dummy';

interface ApiTestResult {
  success: boolean;
  message: string;
  fields: Array<{
    path: string;
    type: string;
    value: unknown;
  }>;
  rawData?: unknown;
}

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWidgetModal({ isOpen, onClose }: AddWidgetModalProps) {
  const addWidget = useWidgetStore((state) => state.addWidget);
  
  // Form state
  const [widgetName, setWidgetName] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [displayMode, setDisplayMode] = useState<'card' | 'table' | 'chart'>('card');
  const [selectedTheme, setSelectedTheme] = useState<WidgetTheme>('default');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState('configure');
  const [apiTestResult, setApiTestResult] = useState<ApiTestResult | null>(null);

  // Dummy data state (disabled)
  // const [dummyLoaded, setDummyLoaded] = useState(false);
  // const [dummyKey, setDummyKey] = useState<string>('');
  // const [dummyData, setDummyData] = useState<unknown>(null);

  // const sampleKeys = {
  //   card: Object.keys(cardSamples),
  //   table: Object.keys(tableSamples),
  //   chart: Object.keys(chartSamples),
  // } as const;

  // const loadDummy = () => {
  //   let data: unknown;
  //   if (displayMode === 'card') data = (cardSamples as Record<string, unknown>)[dummyKey];
  //   else if (displayMode === 'table') data = (tableSamples as Record<string, unknown>)[dummyKey];
  //   else data = (chartSamples as Record<string, unknown>)[dummyKey];
  //
  //   if (!data) return;
  //
  //   const fields = extractFields(data).slice(0, 8);
  //
  //   const defaults =
  //     displayMode === 'chart'
  //       ? (() => {
  //           const numeric = fields.find(f => f.type === 'number')?.path;
  //           const label = fields.find(f => f.type === 'string')?.path;
  //           return [label, numeric].filter(Boolean) as string[];
  //         })()
  //       : fields.map(f => f.path).slice(0, 4);
  //
  //   setDummyData(data);
  //   setSelectedFields(defaults);
  //   setApiTestResult({
  //     success: true,
  //     message: 'Dummy data loaded',
  //     fields: fields.map(f => ({ path: f.path, type: f.type, value: f.value })),
  //     rawData: data
  //   });
  //   if (!widgetName) {
  //     setWidgetName(`${displayMode[0].toUpperCase()}${displayMode.slice(1)} - ${dummyKey}`);
  //   }
  //   setDummyLoaded(true);
  //   setCurrentTab('theme');
  // };

  const handleSubmit = () => {
    const canUseApi = widgetName && apiUrl && apiTestResult?.success;
    // const canUseDummy = widgetName && dummyLoaded && dummyData && selectedFields.length > 0;
    if (!canUseApi) return;

    addWidget({
      name: widgetName,
      type: displayMode,
      apiUrl: apiUrl,
      selectedFields,
      refreshInterval,
      theme: selectedTheme,
      // data: canUseDummy ? dummyData : undefined,
    });

    // Reset form
    setWidgetName('');
    setApiUrl('');
    setRefreshInterval(30);
    setDisplayMode('card');
    setSelectedTheme('default');
    setSelectedFields([]);
    setCurrentTab('configure');
    setApiTestResult(null);
    // setDummyLoaded(false);
    // setDummyKey('');
    // setDummyData(null);
    
    onClose();
  };

  const canProceed = Boolean(widgetName) && Boolean(apiTestResult?.success);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen max-w-none h-[92vh] overflow-y-auto overflow-x-hidden rounded-3xl p-0">
        <div className="px-8 py-7 border-b border-white/20 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-t-3xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 bg-clip-text text-transparent">Create a widget</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Connect an API, choose style, and save.</p>
        </div>

        {/* Quick Dummy Data section - disabled */}
        {/**
        <div className="mb-6 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 p-4">
          ... dummy UI ...
        </div>
        **/}

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full px-8 pb-3">
          {/* <TabsList className="grid w-full grid-cols-2 gap-2 p-1 bg-white/70 dark:bg-slate-900/50 rounded-2xl border border-white/30 dark:border-white/10">
            <TabsTrigger 
              value="configure" 
              className="w-full h-12 text-base font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-900/60 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow"
            >
              Source
            </TabsTrigger>
            <TabsTrigger 
              value="theme" 
              className="w-full h-12 text-base font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-900/60 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow"
              disabled={!canProceed}
            >
              Theme
            </TabsTrigger>
          </TabsList> */}

          <TabsContent value="configure" className="mt-6 px-8">
            <ConfigureTab
              widgetName={widgetName}
              setWidgetName={setWidgetName}
              apiUrl={apiUrl}
              setApiUrl={setApiUrl}
              refreshInterval={refreshInterval}
              setRefreshInterval={setRefreshInterval}
              displayMode={displayMode}
              setDisplayMode={(mode) => {
                setDisplayMode(mode);
                // setDummyLoaded(false);
                // setDummyKey('');
                // setDummyData(null);
                setApiTestResult(null);
                setSelectedFields([]);
              }}
              apiTestResult={apiTestResult}
              setApiTestResult={setApiTestResult}
              setCurrentTab={setCurrentTab}
              selectedFields={selectedFields}
              setSelectedFields={setSelectedFields}
            />
          </TabsContent>

          <TabsContent value="theme" className="mt-6 px-8">
            <ThemeTab
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
            />
          </TabsContent>

          {/* Quick Start / Dummy section removed per request */}
        </Tabs>

        <div className="flex justify-end space-x-4 px-8 py-6 border-t border-white/20 dark:border-white/10 bg-white/60 dark:bg-slate-900/50 rounded-b-3xl">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!apiTestResult?.success || selectedFields.length === 0 || !widgetName}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Widget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
