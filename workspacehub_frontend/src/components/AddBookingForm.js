import React, { useState } from 'react';
import { addWorkspaceBooking } from '../services/bookingService';

const WORKSPACE_TYPES = ['Hot Desk', 'Meeting Room', 'Private Office', 'Conference Hall'];
const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'CANCELLED'];

const initialForm = {
  employeeName: '',
  workspaceType: '',
  bookingDate: '',
  startTime: '',
  endTime: '',
  status: '',
};

function validate(form) {
  const errors = {};

  if (!form.employeeName.trim()) {
    errors.employeeName = 'Employee name is required';
  } else if (form.employeeName.trim().length < 3 || form.employeeName.trim().length > 50) {
    errors.employeeName = 'Employee name should contain 3 to 50 characters';
  }

  if (!form.workspaceType) {
    errors.workspaceType = 'Workspace type is required';
  }

  if (!form.bookingDate) {
    errors.bookingDate = 'Booking date is required';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(form.bookingDate);
    if (selected < today) {
      errors.bookingDate = 'Booking date cannot be in the past';
    }
  }

  if (!form.startTime) {
    errors.startTime = 'Start time is required';
  }

  if (!form.endTime) {
    errors.endTime = 'End time is required';
  }

  if (form.startTime && form.endTime && form.startTime >= form.endTime) {
    errors.endTime = 'End time must be after start time';
  }

  if (!form.status) {
    errors.status = 'Status is required';
  }

  return errors;
}

function AddBookingForm({ onBookingAdded }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMessage('');
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError('');
    setSuccessMessage('');

    try {
      const payload = {
        employeeName: form.employeeName.trim(),
        workspaceType: form.workspaceType,
        bookingDate: form.bookingDate,
        startTime: form.startTime + ':00',
        endTime: form.endTime + ':00',
        status: form.status,
      };

      const message = await addWorkspaceBooking(payload);
      setSuccessMessage(message);
      setForm(initialForm);
      if (onBookingAdded) onBookingAdded();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSuccessMessage('');
    setServerError('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="card">
      <h2 className="card-title">Add Workspace Booking</h2>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {serverError && <div className="alert alert-error">{serverError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name <span className="required">*</span></label>
          <input
            id="employeeName"
            name="employeeName"
            type="text"
            value={form.employeeName}
            onChange={handleChange}
            placeholder="Enter employee name"
            className={errors.employeeName ? 'input-error' : ''}
          />
          {errors.employeeName && <span className="error-text">{errors.employeeName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="workspaceType">Workspace Type <span className="required">*</span></label>
          <select
            id="workspaceType"
            name="workspaceType"
            value={form.workspaceType}
            onChange={handleChange}
            className={errors.workspaceType ? 'input-error' : ''}
          >
            <option value="">-- Select Workspace Type --</option>
            {WORKSPACE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.workspaceType && <span className="error-text">{errors.workspaceType}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bookingDate">Booking Date <span className="required">*</span></label>
          <input
            id="bookingDate"
            name="bookingDate"
            type="date"
            value={form.bookingDate}
            onChange={handleChange}
            min={today}
            className={errors.bookingDate ? 'input-error' : ''}
          />
          {errors.bookingDate && <span className="error-text">{errors.bookingDate}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startTime">Start Time <span className="required">*</span></label>
            <input
              id="startTime"
              name="startTime"
              type="time"
              value={form.startTime}
              onChange={handleChange}
              className={errors.startTime ? 'input-error' : ''}
            />
            {errors.startTime && <span className="error-text">{errors.startTime}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endTime">End Time <span className="required">*</span></label>
            <input
              id="endTime"
              name="endTime"
              type="time"
              value={form.endTime}
              onChange={handleChange}
              className={errors.endTime ? 'input-error' : ''}
            />
            {errors.endTime && <span className="error-text">{errors.endTime}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status <span className="required">*</span></label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className={errors.status ? 'input-error' : ''}
          >
            <option value="">-- Select Status --</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.status && <span className="error-text">{errors.status}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Add Booking'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBookingForm;
