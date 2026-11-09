CREATE DATABASE IF NOT EXISTS WorkspaceHubDb;

USE WorkspaceHubDb;

DROP TABLE IF EXISTS workspace_bookings;

CREATE TABLE workspace_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(255) NOT NULL,
    workspace_type VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(50) NOT NULL
);

INSERT INTO workspace_bookings
(employee_name, workspace_type, booking_date, start_time, end_time, status)
VALUES
('Rahul Sharma', 'Meeting Room', '2026-07-10', '10:00:00', '11:00:00', 'Booked'),
('Priya Nair', 'Collaboration Space', '2026-07-11', '14:00:00', '16:00:00', 'Booked'),
('Arjun Kumar', 'Focus Desk', '2026-07-12', '09:30:00', '12:30:00', 'Booked');
