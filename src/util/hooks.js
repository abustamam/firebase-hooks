import { useState, useEffect } from 'react';

export const useAsyncSubscription = fn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  useEffect(() => {
    try {
      setLoading(true);
      fn().then(({ ref, value }) => {
        if (value) {
          setData(value);
        }
        if (ref) {
          ref.on('child_added', child => {
            setData(d => ({ ...d, [child.key]: child.val() }));
          });
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, fn]);
  return { loading, error, data };
};
