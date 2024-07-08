import { useAppSelector } from '../redux/store';

export function useAppSelectorHook() {
  const approvalsData = useAppSelector((state) => state?.approvalsData)?.data;

  return {
    approvalsData,
  };
}
