import { useState, useEffect } from 'react';

export function useCurrentTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    // 确保清理，防止内存泄漏
    return () => clearInterval(timerId);
  }, []);

  return date;
}