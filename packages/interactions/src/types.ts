export type Effect =
  | { type: 'focus'; target: 'trigger' | 'content' | 'item'; index?: number }
  | { type: 'scrollIntoView'; index: number };

export interface TransitionResult<S> {
  state: S;
  effects: Effect[];
}

export interface Item {
  id: string;
  disabled: boolean;
}

export type Orientation = 'horizontal' | 'vertical';
