import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Alert({ type = 'info', title, message, children, className = '' }) {
  const types = {
    info: {
      icon: Info,
      bg: 'bg-blue-950/40 border-blue-800/60 text-blue-200',
      iconColor: 'text-blue-400'
    },
    success: {
      icon: CheckCircle2,
      bg: 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200',
      iconColor: 'text-emerald-400'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-amber-950/40 border-amber-800/60 text-amber-200',
      iconColor: 'text-amber-400'
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-rose-950/40 border-rose-800/60 text-rose-200',
      iconColor: 'text-rose-400'
    },
    demo: {
      icon: ShieldCheck,
      bg: 'bg-amber-500/10 border-amber-500/40 text-amber-300',
      iconColor: 'text-amber-400'
    }
  };

  const current = types[type] || types.info;
  const IconComponent = current.icon;

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${current.bg} ${className}`}>
      <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1 text-sm">
        {title && <h4 className="font-semibold mb-0.5 tracking-tight text-white">{title}</h4>}
        {message && <p className="leading-relaxed opacity-90">{message}</p>}
        {children}
      </div>
    </div>
  );
}
