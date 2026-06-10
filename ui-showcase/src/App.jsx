import { Wifi, ActivitySquare, ListTodo } from 'lucide-react';
import { useDummyData } from './useDummyData';
import './App.css';

function App() {
  const { currentActivity, confidence, history, metrics, deviceStatus } = useDummyData();

  return (
    <div className="app-container animate-fade-in">
      <header className="header">
        <div className="title-group">
          <h1>Rehabelt Model Dashboard</h1>
          <p>Real-time ML Exercise Classification & Gait Analysis</p>
        </div>
        <div className="status-badges">
          <div className="badge online">
            <Wifi size={18} />
            <span>{deviceStatus.connected ? 'Connected' : 'Offline'}</span>
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        
        {/* Live Feed Panel */}
        <section className="glass-panel live-feed-panel">
          <div className="live-indicator">
            <div className="dot"></div>
            Live Inference
          </div>
          
          <div className="activity-display">
            <h2 className={currentActivity} key={currentActivity}>
              {currentActivity}
            </h2>
            
            <div className="confidence-bar-container">
              <div 
                className="confidence-bar" 
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
            <div className="confidence-text">
              Confidence: {(confidence * 100).toFixed(1)}%
            </div>
          </div>
        </section>

        {/* Gait Metrics Panel */}
        <section className="glass-panel metrics-panel animate-slide-up">
          <div className="panel-header">
            <h3>Gait Metrics</h3>
          </div>
          
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="label">Cadence</span>
              <span className="val">{metrics.cadence > 0 ? metrics.cadence.toFixed(1) : '--'}</span>
              <span className="unit">steps/min</span>
            </div>
            
            <div className="metric-card">
              <span className="label">Lateral Sway</span>
              <span className="val">{metrics.lateralSway > 0 ? metrics.lateralSway.toFixed(1) : '--'}</span>
              <span className="unit">cm</span>
            </div>
            
            <div className="metric-card">
              <span className="label">Step Length</span>
              <span className="val">{metrics.stepLength > 0 ? metrics.stepLength.toFixed(1) : '--'}</span>
              <span className="unit">cm</span>
            </div>
          </div>
        </section>

        {/* History Panel */}
        <section className="glass-panel history-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="panel-header">
            <ListTodo size={24} />
            <h3>Activity Log</h3>
          </div>
          
          <div className="history-list">
            {history.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                Waiting for activity...
              </p>
            ) : (
              history.map((item) => (
                <div key={item.id} className={`history-item ${item.activity}`}>
                  <div className="history-info">
                    <strong>{item.activity}</strong>
                    <span>{item.time}</span>
                  </div>
                  <div className="history-meta">
                    {item.duration}s
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        
      </main>
    </div>
  );
}

export default App;
