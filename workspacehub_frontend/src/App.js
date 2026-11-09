import React, { useState } from 'react';
import './App.css';
import AddBookingForm from './components/AddBookingForm';
import BookingList from './components/BookingList';

function App() {
  const [activeTab, setActiveTab] = useState('add');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBookingAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab('list');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>WorkspaceHub</h1>
        <p className="app-subtitle">Workspace Booking Management</p>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Booking
        </button>
        <button
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          View Bookings
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'add' && (
          <AddBookingForm onBookingAdded={handleBookingAdded} />
        )}
        {activeTab === 'list' && (
          <BookingList refreshTrigger={refreshTrigger} />
        )}
      </main>
    </div>
  );
}

export default App;
