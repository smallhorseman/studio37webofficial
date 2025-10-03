import { useState, useCallback } from 'react';

export const useJourneyTracking = () => {
  const trackJourneyStep = useCallback((stage, touchpoint, data) => {
    // Simple journey tracking implementation
    console.log('Journey step:', { stage, touchpoint, data });
    
    // Store in localStorage for now
    const journeyData = JSON.parse(localStorage.getItem('studio37_journey') || '[]');
    journeyData.push({
      stage,
      touchpoint,
      data,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('studio37_journey', JSON.stringify(journeyData.slice(-50)));
  }, []);

  return { trackJourneyStep };
};

export const useAbTest = (testName) => {
  const [variant] = useState(() => {
    // Simple A/B test implementation
    return Math.random() > 0.5 ? 'variant_a' : 'variant_b';
  });

  return { variant };
};

export const useRealtimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return { notifications, dismissNotification };
};
