package com.jfs.training.service;
import java.util.List;

import com.jfs.training.bean.WorkspaceBookingBean;

public interface WorkspaceBookingService {

    public Long addWorkspaceBooking(
            WorkspaceBookingBean workspaceBookingBean);

    public List<WorkspaceBookingBean>
            getAllWorkspaceBookings();
}
