import axios from 'axios';
import { useState } from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    axios
      .post(url, data, { headers: { 'Content-Type': 'application/json' } })
      .then((res) => setState((prev) => ({ ...prev, data: res.data, loading: false })))
      .catch((error) => setState((prev) => ({ ...prev, error, loading: false })));
  }
  return [mutation, { ...state }];
}
