import React, { useState, useEffect, useCallback } from 'react';
import { getAllWorkspaceBookings } from '../services/bookingService';

function BookingList({ refreshTrigger }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllWorkspaceBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings, refreshTrigger]);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">All Workspace Bookings</h2>
        <button className="btn btn-secondary btn-sm" onClick={fetchBookings} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && bookings.length === 0 && (
        <p className="empty-message">No bookings found. Add a booking to get started.</p>
      )}

      {bookings.length > 0 && (
        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Workspace Type</th>
                <th>Booking Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.employeeName}</td>
                  <td>{booking.workspaceType}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.startTime}</td>
                  <td>{booking.endTime}</td>
                  <td>
                    <span className={`status-badge status-${booking.status?.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookingList;
