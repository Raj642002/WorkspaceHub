const BASE_URL = process.env.REACT_APP_API_URL || '';

export const addWorkspaceBooking = async (bookingData) => {
  const response = await fetch(`${BASE_URL}/addWorkspaceBooking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || 'Failed to add workspace booking');
  }

  return text;
};

export const getAllWorkspaceBookings = async () => {
  const response = await fetch(`${BASE_URL}/getAllWorkspaceBookings`);

  if (!response.ok) {
    throw new Error('Failed to fetch workspace bookings');
  }

  return response.json();
};
