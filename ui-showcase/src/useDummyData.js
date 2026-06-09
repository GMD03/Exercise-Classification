import { useState, useEffect } from 'react';

const ACTIVITIES = ['Walking', 'Sit-to-Stand', 'Supine-to-Sit', 'Standing Still', 'Resting'];

export function useDummyData() {
  const [currentActivity, setCurrentActivity] = useState('Standing Still');
  const [confidence, setConfidence] = useState(0.95);
  const [history, setHistory] = useState([]);
  const [metrics, setMetrics] = useState({
    cadence: 0,
    lateralSway: 0,
    stepLength: 0
  });
  const [deviceStatus, setDeviceStatus] = useState({
    battery: 87,
    connected: true,
    calibration: 'Complete'
  });

  // Simulate activity changes
  useEffect(() => {
    const activityInterval = setInterval(() => {
      // 70% chance to stay on same activity if it's Walking or Standing, otherwise change
      const shouldChange = Math.random() > 0.7;
      
      if (shouldChange) {
        const nextActivity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
        setCurrentActivity(nextActivity);
        
        // Add to history
        setHistory(prev => {
          const newEntry = {
            id: Date.now(),
            activity: nextActivity,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            duration: Math.floor(Math.random() * 45) + 5
          };
          return [newEntry, ...prev].slice(0, 10);
        });
      }
      
      // Jitter confidence
      setConfidence(0.85 + (Math.random() * 0.14));
      
    }, 3000);

    return () => clearInterval(activityInterval);
  }, []);

  // Simulate gait metrics when walking
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      if (currentActivity === 'Walking') {
        setMetrics({
          cadence: 100 + (Math.random() * 20 - 10), // 90-110 steps/min
          lateralSway: 3.5 + (Math.random() * 1.5 - 0.75), // 2.75 - 5.0 cm
          stepLength: 65 + (Math.random() * 10 - 5) // 60 - 75 cm
        });
      } else {
        // Decay metrics to 0 when not walking
        setMetrics(prev => ({
          cadence: prev.cadence * 0.8,
          lateralSway: prev.lateralSway * 0.8,
          stepLength: prev.stepLength * 0.8
        }));
      }
    }, 1000);

    return () => clearInterval(metricsInterval);
  }, [currentActivity]);

  return { currentActivity, confidence, history, metrics, deviceStatus };
}
