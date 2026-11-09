package com.jfs.training.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jfs.training.entity.WorkspaceBookingEntity;

@Repository
public class WorkspaceBookingDAOWrapper {

    @Autowired
    private WorkspaceBookingDAO workspaceBookingDAO;

    /**
     * ToDo Item 1.2
     */
    public WorkspaceBookingEntity addWorkspaceBooking(
            WorkspaceBookingEntity workspaceBookingEntity) {

        return workspaceBookingDAO.save(workspaceBookingEntity);
    }

    /**
     * ToDo Item 1.3
     */
    public List<WorkspaceBookingEntity>
            getAllWorkspaceBookings() {

        return workspaceBookingDAO.findAll();
    }
}
