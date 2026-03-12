import { forwardRef, useRef, useCallback } from 'react';
import { cn, Grid } from '@toucanui/core';
import type { GridGap } from '@toucanui/core';
import { FormContext } from '../form-field/form-field';
import type { FormFieldHandle } from '../form-field/form-field';

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onValidSubmit?: () => void;
  onInvalidSubmit?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  gap?: GridGap;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { onValidSubmit, onInvalidSubmit, onSubmit, gap = 4, className, children, ...props },
  ref,
) {
  const fieldsRef = useRef<Map<string, FormFieldHandle>>(new Map());

  const registerField = useCallback((name: string, handle: FormFieldHandle) => {
    fieldsRef.current.set(name, handle);
  }, []);

  const unregisterField = useCallback((name: string) => {
    fieldsRef.current.delete(name);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(e);

      let allValid = true;
      fieldsRef.current.forEach((handle) => {
        const valid = handle.validate();
        if (!valid) allValid = false;
      });

      if (allValid) {
        onValidSubmit?.();
      } else {
        onInvalidSubmit?.();
      }
    },
    [onSubmit, onValidSubmit, onInvalidSubmit],
  );

  return (
    <FormContext.Provider value={{ registerField, unregisterField }}>
      <form ref={ref} className={cn('tcn-form', className)} onSubmit={handleSubmit} {...props}>
        <Grid gap={gap}>{children}</Grid>
      </form>
    </FormContext.Provider>
  );
});
