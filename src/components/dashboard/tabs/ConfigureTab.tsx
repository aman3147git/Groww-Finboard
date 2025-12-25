'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';
import { extractFields } from '@/lib/dataUtils';

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

interface ConfigureTabProps {
  widgetName: string;
  setWidgetName: (name: string) => void;
  apiUrl: string;
  setApiUrl: (url: string) => void;
  refreshInterval: number;
  setRefreshInterval: (interval: number) => void;
  displayMode: 'card' | 'table' | 'chart';
  setDisplayMode: (mode: 'card' | 'table' | 'chart') => void;
  apiTestResult: ApiTestResult | null;
  setApiTestResult: (result: ApiTestResult | null) => void;
  setCurrentTab: (tab: string) => void;
  selectedFields: string[];
  setSelectedFields: (fields: string[]) => void;
}

export function ConfigureTab({
  widgetName,
  setWidgetName,
  apiUrl,
  setApiUrl,
  refreshInterval,
  setRefreshInterval,
  displayMode,
  setDisplayMode,
  apiTestResult,
  setApiTestResult,
  setCurrentTab,
  selectedFields,
  setSelectedFields
}: ConfigureTabProps) {
  const [isTestingApi, setIsTestingApi] = useState(false);

  // Suggested APIs (copy/paste friendly)
  const sampleApis = [
    {
      name: 'Coinbase Exchange Rates',
      url: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
      type: 'card',
      description: 'Exchange rates for a base currency (BTC shown)'
    },
    {
      name: 'CoinGecko Crypto Market',
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1',
      type: 'table',
      description: 'Top cryptocurrencies market data'
    }
  ];

  const handleTestApi = async () => {
    if (!apiUrl) return;
    
    setIsTestingApi(true);
    setApiTestResult(null);
    
    try {
      const response = await apiClient.fetch({ url: apiUrl });
      const fields = extractFields(response.data);
      
      setApiTestResult({
        success: true,
        message: `API connection successful! ${fields.length} fields found.`,
        fields: fields.map(field => ({
          path: field.path,
          type: field.type,
          value: field.value
        })),
        rawData: response.data
      });
      // Preselect some fields: first 4 or label+number for charts
      const defaults =
        displayMode === 'chart'
          ? (() => {
              const numeric = fields.find(f => f.type === 'number')?.path;
              const label = fields.find(f => f.type === 'string')?.path;
              return [label, numeric].filter(Boolean) as string[];
            })()
          : fields.slice(0, 4).map(f => f.path);
      setSelectedFields(defaults);
      
    } catch (error) {
      setApiTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to connect to API',
        fields: []
      });
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Widget Name & Display Mode */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="widget-name" className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Widget Name</Label>
          <Input
            id="widget-name"
            placeholder="e.g., Bitcoin Price, Stock Portfolio"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            className="h-14 rounded-xl border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Display Mode</Label>
          <div className="flex gap-3">
            {(['card', 'table', 'chart'] as const).map((mode) => (
              <Button
                key={mode}
                variant={displayMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setDisplayMode(mode)}
                className={`capitalize flex-1 h-12 rounded-xl ${
                  displayMode === mode 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600' 
                    : 'border-white/40 dark:border-white/10 hover:bg-white/70 dark:hover:bg-slate-900/40'
                }`}
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* API URL */}
      <div className="space-y-2">
        <Label htmlFor="api-url" className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">API URL</Label>
        <div className="flex gap-3">
          <Input
            id="api-url"
            placeholder="https://api.example.com/data"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="flex-1 h-14 rounded-xl border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Button 
            onClick={handleTestApi} 
            disabled={!apiUrl || isTestingApi}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 h-14 rounded-xl font-semibold"
          >
            {isTestingApi ? 'Testing...' : 'Test API'}
          </Button>
        </div>
        
        {/* API Test Result */}
        {apiTestResult && (
          <Card className={`p-4 border-2 ${
            apiTestResult.success 
              ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800' 
              : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
          }`}>
            <div className="flex items-start space-x-3">
              {apiTestResult.success ? (
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div>
                <p className={`font-semibold ${
                  apiTestResult.success ? 'text-emerald-800 dark:text-emerald-200' : 'text-red-800 dark:text-red-200'
                }`}>
                  {apiTestResult.success ? 'API Connection Successful!' : 'Connection Failed'}
                </p>
                <p className={`text-sm ${
                  apiTestResult.success ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
                }`}>
                  {apiTestResult.message}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Field Selection (moved into Configure) */}
      {apiTestResult?.success && apiTestResult.fields.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Select Fields</Label>
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {apiTestResult.fields.slice(0, 40).map((f) => {
                const checked = selectedFields.includes(f.path);
                return (
                  <label key={f.path} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-emerald-600"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFields([...selectedFields, f.path]);
                        } else {
                          setSelectedFields(selectedFields.filter(p => p !== f.path));
                        }
                      }}
                    />
                    <span className="text-gray-700 dark:text-gray-300 break-all">
                      {f.path}
                      <span className="ml-2 text-xs text-gray-400">({f.type})</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Refresh Interval */}
      <div className="space-y-2">
        <Label htmlFor="refresh-interval" className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Refresh Interval (seconds)</Label>
        <Input
          id="refresh-interval"
          type="number"
          value={refreshInterval}
          onChange={(e) => setRefreshInterval(Number(e.target.value))}
          min="10"
          max="3600"
          className="w-40 h-14 rounded-xl border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      {/* Suggested APIs */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Suggested APIs (copy & paste)</Label>
        <ul className="space-y-2 text-sm">
          {sampleApis.map((api) => (
            <li key={api.url} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-gray-900/40">
              <div className="min-w-0">
                <div className="font-medium text-gray-900 dark:text-white">{api.name}</div>
                <div className="text-gray-500 dark:text-gray-400 truncate font-mono">{api.url}</div>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setApiUrl(api.url)}>Use</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
