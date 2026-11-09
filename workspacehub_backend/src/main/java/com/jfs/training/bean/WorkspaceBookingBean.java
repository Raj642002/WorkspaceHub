package com.jfs.training.bean;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class WorkspaceBookingBean {

    private Long id;

    @NotBlank(message = "Employee name is required")
    @Size(min = 3, max = 50,
          message = "Employee name should contain 3 to 50 characters")
    private String employeeName;

    @NotBlank(message = "Workspace type is required")
    private String workspaceType;

    @NotNull(message = "Booking date is required")
    @FutureOrPresent(message = "Booking date cannot be in the past")
    private LocalDate bookingDate;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    private LocalTime endTime;

    @NotBlank(message = "Status is required")
    private String status;

    public WorkspaceBookingBean() {
    }

    public WorkspaceBookingBean(Long id, String employeeName,
            String workspaceType, LocalDate bookingDate,
            LocalTime startTime, LocalTime endTime,
            String status) {
        this.id = id;
        this.employeeName = employeeName;
        this.workspaceType = workspaceType;
        this.bookingDate = bookingDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getWorkspaceType() {
        return workspaceType;
    }

    public void setWorkspaceType(String workspaceType) {
        this.workspaceType = workspaceType;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}