import { useDialog, type UseDialogOptions, type UseDialogReturn } from './use-dialog.js';

export type UseDrawerOptions = UseDialogOptions;

export type UseDrawerReturn = UseDialogReturn;

export function useDrawer(options: UseDrawerOptions): UseDrawerReturn {
  return useDialog(options);
}
