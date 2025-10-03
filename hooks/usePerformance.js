import { useState, useEffect } from 'react';

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    memory: null,
    loadTime: null,
    renderTime: null
  });

  useEffect(() => {
    // Memory usage monitoring
    if (performance.memory) {
      setMetrics(prev => ({
        ...prev,
        memory: {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576),
          total: Math.round(performance.memory.totalJSHeapSize / 1048576),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
        }
      }));
    }

    // Load time monitoring
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({
        ...prev,
        loadTime
      }));
    }
  }, []);

  return metrics;
};
