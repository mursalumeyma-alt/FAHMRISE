import React from 'react';

export default function ProgressBar({ value = 0, max = 100, label, showValue = true, size = 'md', className = '' }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5 text-slate-300">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono text-emerald-400">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60 ${sizeClasses[size]}`}>
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
