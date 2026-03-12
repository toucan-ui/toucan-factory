import { render, screen, act } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToastProvider, useToast } from './toast.js';

// Helper to call useToast from within the provider
function TestConsumer({ onReady }: { onReady: (api: ReturnType<typeof useToast>) => void }) {
  const api = useToast();
  onReady(api);
  return null;
}

function renderWithProvider(
  consumerCallback: (api: ReturnType<typeof useToast>) => void = () => {},
  props: Record<string, unknown> = {},
) {
  return render(
    <ToastProvider {...props}>
      <TestConsumer onReady={consumerCallback} />
    </ToastProvider>,
  );
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // --- Provider ---

  it('renders provider without crashing', () => {
    render(
      <ToastProvider>
        <p>App</p>
      </ToastProvider>,
    );
    expect(screen.getByText('App')).toBeInTheDocument();
  });

  // --- useToast outside provider ---

  it('throws when useToast is used outside provider', () => {
    function Bad() {
      useToast();
      return null;
    }
    expect(() => render(<Bad />)).toThrow('useToast must be used within a <ToastProvider>');
  });

  // --- toast() adds a toast ---

  it('adds a toast via toast()', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Hello' });
    });

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  // --- Variant / role mapping ---

  it('renders info toast with role=status', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Info toast', variant: 'info' });
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders success toast with role=status', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Success', variant: 'success' });
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders warning toast with role=alert', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Warning', variant: 'warning' });
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders danger toast with role=alert', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Danger', variant: 'danger' });
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // --- Container ARIA ---

  it('renders container with region role and aria-label', () => {
    renderWithProvider();
    const container = document.querySelector('.tcn-toast-container')!;
    expect(container).toHaveAttribute('role', 'region');
    expect(container).toHaveAttribute('aria-label', 'Notifications');
  });

  // --- Position ---

  it('sets data-position on container', () => {
    renderWithProvider(() => {}, { position: 'bottom-left' });
    const container = document.querySelector('.tcn-toast-container')!;
    expect(container).toHaveAttribute('data-position', 'bottom-left');
  });

  it('defaults to top-right position', () => {
    renderWithProvider();
    const container = document.querySelector('.tcn-toast-container')!;
    expect(container).toHaveAttribute('data-position', 'top-right');
  });

  // --- Dismiss ---

  it('dismisses toast via dismiss API', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    let toastId: string;
    act(() => {
      toastId = api.toast({ message: 'Dismissable', duration: 0 });
    });

    expect(screen.getByText('Dismissable')).toBeInTheDocument();

    act(() => {
      api.dismiss(toastId);
    });

    expect(screen.queryByText('Dismissable')).not.toBeInTheDocument();
  });

  it('renders dismiss button with aria-label', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Has dismiss', duration: 0 });
    });

    expect(screen.getByLabelText('Dismiss notification')).toBeInTheDocument();
  });

  // --- Auto-dismiss ---

  it('auto-dismisses after duration', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Temporary', duration: 3000 });
    });

    expect(screen.getByText('Temporary')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Temporary')).not.toBeInTheDocument();
  });

  // --- Duration 0 persists ---

  it('does not auto-dismiss when duration is 0', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Persistent', duration: 0 });
    });

    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(screen.getByText('Persistent')).toBeInTheDocument();
  });

  // --- Stacking ---

  it('stacks multiple toasts', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Toast 1', duration: 0 });
      api.toast({ message: 'Toast 2', duration: 0 });
      api.toast({ message: 'Toast 3', duration: 0 });
    });

    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
    expect(screen.getByText('Toast 3')).toBeInTheDocument();
  });

  // --- maxToasts ---

  it('enforces maxToasts limit', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider(
      (a) => {
        api = a;
      },
      { maxToasts: 2 },
    );

    act(() => {
      api.toast({ message: 'Toast 1', duration: 0 });
    });
    act(() => {
      api.toast({ message: 'Toast 2', duration: 0 });
    });
    act(() => {
      api.toast({ message: 'Toast 3', duration: 0 });
    });

    const toasts = document.querySelectorAll('.tcn-toast');
    expect(toasts.length).toBeLessThanOrEqual(2);
  });

  // --- dismissAll ---

  it('dismisses all toasts', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Toast 1', duration: 0 });
      api.toast({ message: 'Toast 2', duration: 0 });
    });

    act(() => {
      api.dismissAll();
    });

    expect(document.querySelectorAll('.tcn-toast')).toHaveLength(0);
  });

  // --- Description ---

  it('renders description when provided', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Title', description: 'Details here', duration: 0 });
    });

    expect(screen.getByText('Details here')).toBeInTheDocument();
  });

  // --- data-variant ---

  it('sets data-variant on toast', () => {
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Success!', variant: 'success', duration: 0 });
    });

    const toast = document.querySelector('.tcn-toast')!;
    expect(toast).toHaveAttribute('data-variant', 'success');
  });

  // --- Portal ---

  it('renders container in portal', () => {
    const { container } = renderWithProvider();
    expect(container.querySelector('.tcn-toast-container')).toBeNull();
    expect(document.querySelector('.tcn-toast-container')).toBeInTheDocument();
  });

  // --- Accessibility ---

  it('passes axe checks', async () => {
    vi.useRealTimers();
    let api: ReturnType<typeof useToast>;
    renderWithProvider((a) => {
      api = a;
    });

    act(() => {
      api.toast({ message: 'Test toast', duration: 0 });
    });

    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
