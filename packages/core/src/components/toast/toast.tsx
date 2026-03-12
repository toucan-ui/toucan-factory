import { createContext, forwardRef, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn.js';
import { useToastManager, type ToastOptions } from '../../adapters/use-toast-manager.js';
import type { ToastPosition, ToastVariant } from '../../types.js';

// --- Context ---

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }
  return context;
}

// --- ToastProvider ---

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const manager = useToastManager(maxToasts);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toast: manager.toast, dismiss: manager.dismiss, dismissAll: manager.dismissAll }}
    >
      {children}
      {mounted &&
        createPortal(
          <div
            className="tcn-toast-container"
            data-position={position}
            role="region"
            aria-label="Notifications"
            aria-live="polite"
            onMouseEnter={manager.pauseTimers}
            onMouseLeave={manager.resumeTimers}
          >
            {manager.toasts.map((item) => (
              <Toast
                key={item.id}
                variant={item.variant}
                role={item.variant === 'warning' || item.variant === 'danger' ? 'alert' : 'status'}
              >
                <div className="tcn-toast-content">
                  <div className="tcn-toast-message">{item.message}</div>
                  {item.description && (
                    <div className="tcn-toast-description">{item.description}</div>
                  )}
                </div>
                <button
                  type="button"
                  className="tcn-toast-dismiss"
                  aria-label="Dismiss notification"
                  onClick={() => manager.dismiss(item.id)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </Toast>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

// --- Toast ---

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { variant = 'info', className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-toast', className)} data-variant={variant} {...props}>
      {children}
    </div>
  );
});
