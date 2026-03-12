import {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
  useRef,
  useContext,
  useEffect,
  createContext,
  cloneElement,
  isValidElement,
} from 'react';

// ---------- Validation ----------

export type ValidationRule =
  | { type: 'required'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | { type: 'custom'; validate: (value: string) => string | undefined };

export function runRules(value: string, rules: ValidationRule[]): string | undefined {
  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value.trim()) return rule.message ?? 'This field is required';
        break;
      case 'minLength':
        if (value.length < rule.value)
          return rule.message ?? `Must be at least ${rule.value} characters`;
        break;
      case 'maxLength':
        if (value.length > rule.value)
          return rule.message ?? `Must be at most ${rule.value} characters`;
        break;
      case 'pattern':
        if (!rule.value.test(value)) return rule.message ?? 'Invalid format';
        break;
      case 'custom': {
        const result = rule.validate(value);
        if (result) return result;
        break;
      }
    }
  }
  return undefined;
}

// ---------- Context ----------

export interface FormContextValue {
  registerField: (name: string, handle: FormFieldHandle) => void;
  unregisterField: (name: string) => void;
}

export const FormContext = createContext<FormContextValue | null>(null);

// ---------- FormFieldHandle ----------

export interface FormFieldHandle {
  validate: () => boolean;
  getName: () => string | undefined;
  reset: () => void;
}

// ---------- FormField ----------

export interface FormFieldProps {
  name?: string;
  rules?: ValidationRule[];
  validateOn?: 'blur' | 'change' | 'submit';
  children: React.ReactElement<{
    error?: string;
    onChange?: (...args: unknown[]) => void;
    onBlur?: (...args: unknown[]) => void;
  }>;
}

export const FormField = forwardRef<FormFieldHandle, FormFieldProps>(function FormField(
  { name, rules = [], validateOn = 'blur', children },
  ref,
) {
  const [value, setValue] = useState('');
  const [dirty, setDirty] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formContext = useContext(FormContext);
  const handleRef = useRef<FormFieldHandle>(null);

  const validate = useCallback((): boolean => {
    const result = runRules(value, rules);
    setError(result);
    return !result;
  }, [value, rules]);

  const reset = useCallback(() => {
    setValue('');
    setDirty(false);
    setTouched(false);
    setError(undefined);
  }, []);

  const getName = useCallback(() => name, [name]);

  handleRef.current = { validate, getName, reset };

  useImperativeHandle(ref, () => handleRef.current!, [validate, getName, reset]);

  // Stable delegating handle — always calls through to latest ref
  const stableHandle = useRef<FormFieldHandle>({
    validate: () => handleRef.current!.validate(),
    getName: () => handleRef.current!.getName(),
    reset: () => handleRef.current!.reset(),
  });

  // Register with parent Form
  useEffect(() => {
    if (formContext && name) {
      formContext.registerField(name, stableHandle.current);
      return () => formContext.unregisterField(name);
    }
  }, [formContext, name]);

  const handleChange = useCallback(
    (...args: unknown[]) => {
      // Detect native event vs direct value
      const arg = args[0];
      let newValue: string;
      if (arg && typeof arg === 'object' && 'target' in (arg as Record<string, unknown>)) {
        const target = (arg as React.ChangeEvent<HTMLInputElement>).target;
        // Checkbox: use checked state as string
        if (target.type === 'checkbox') {
          newValue = target.checked ? 'true' : '';
        } else {
          newValue = target.value;
        }
      } else {
        newValue = String(arg ?? '');
      }

      setValue(newValue);
      setDirty(true);

      // Validate on change, or after first touch (eager clearing)
      if (validateOn === 'change' || touched) {
        const result = runRules(newValue, rules);
        setError(result);
      }

      // Forward original onChange
      const childOnChange = children.props.onChange;
      if (childOnChange) {
        (childOnChange as (...a: unknown[]) => void)(...args);
      }
    },
    [validateOn, touched, rules, children.props.onChange],
  );

  const handleBlur = useCallback(
    (...args: unknown[]) => {
      setTouched(true);

      if (validateOn === 'blur' || validateOn === 'submit') {
        if (dirty || validateOn === 'blur') {
          const result = runRules(value, rules);
          setError(result);
        }
      }

      // Forward original onBlur
      const childOnBlur = children.props.onBlur;
      if (childOnBlur) {
        (childOnBlur as (...a: unknown[]) => void)(...args);
      }
    },
    [validateOn, dirty, value, rules, children.props.onBlur],
  );

  if (!isValidElement(children)) {
    return children;
  }

  return cloneElement(children, {
    error: error || children.props.error,
    onChange: handleChange,
    onBlur: handleBlur,
  });
});
