// Ultra-lightweight toast — replaces Sonner + @preact/compat (~15KB+ savings)
// Creates DOM elements directly, no Preact/React needed

type ToastType = 'success' | 'error';

interface ToastOptions {
  duration?: number;
}

const COLORS: Record<ToastType, string> = {
  success: '#16a34a',
  error: '#dc2626',
};

const ICONS: Record<ToastType, string> = {
  success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
};

let container: HTMLDivElement | null = null;

function getContainer(): HTMLDivElement {
  if (container && container.parentNode) return container;
  container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;width:90%;max-width:420px;';
  document.body.appendChild(container);
  return container;
}

function showToast(type: ToastType, message: string, options?: ToastOptions) {
  const el = document.createElement('div');
  el.style.cssText = `display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;background:${COLORS[type]};color:#fff;font-size:14px;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,0.3);pointer-events:auto;opacity:0;transform:translateY(-8px);transition:opacity 0.2s,transform 0.2s;`;
  el.innerHTML = `${ICONS[type]}<span style="flex:1;line-height:1.4">${message}</span>`;
  getContainer().appendChild(el);

  // Animate in
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });

  // Auto-dismiss
  const duration = options?.duration || 4000;
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    setTimeout(() => el.remove(), 200);
  }, duration);
}

export const toast = {
  success: (msg: string, opts?: ToastOptions) => showToast('success', msg, opts),
  error: (msg: string, opts?: ToastOptions) => showToast('error', msg, opts),
};
