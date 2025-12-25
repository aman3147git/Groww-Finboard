'use client';

import React from 'react';
import { Card } from '@/ui/atoms/card';
import { WidgetTheme } from '@/store/widgetStore';
import { BadgeCheck, Sun, MoonStar, Waves, Sparkles, Zap } from 'lucide-react';

interface ThemeSelectorProps {
  selectedTheme: WidgetTheme;
  onThemeChange: (theme: WidgetTheme) => void;
}

const themes = [
  {
    id: 'default' as WidgetTheme,
    name: 'Core',
    icon: BadgeCheck,
  },
  {
    id: 'minimal' as WidgetTheme,
    name: 'Lite',
    icon: Sparkles,
  },
  {
    id: 'glass' as WidgetTheme,
    name: 'Crystal',
    icon: Zap,
  },
  {
    id: 'neon' as WidgetTheme,
    name: 'Neon',
    icon: Zap,
  },
  {
    id: 'aurora' as WidgetTheme,
    name: 'Aurora',
    icon: Sparkles,
  },
  {
    id: 'sunset' as WidgetTheme,
    name: 'Sunset',
    icon: Sun,
  },
  {
    id: 'midnight' as WidgetTheme,
    name: 'Midnight',
    icon: MoonStar,
  },
  {
    id: 'ocean' as WidgetTheme,
    name: 'Ocean',
    icon: Waves,
  },
];

export function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {themes.map((theme) => (
        <Card
          key={theme.id}
          className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedTheme === theme.id
              ? 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-950'
              : 'hover:border-emerald-300 dark:hover:border-emerald-600'
          } border-gray-200 dark:border-gray-700`}
          onClick={() => onThemeChange(theme.id)}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <theme.icon className="h-6 w-6 text-emerald-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">{theme.name}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
