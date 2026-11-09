package com.jfs.training.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jfs.training.bean.WorkspaceBookingBean;
import com.jfs.training.dao.WorkspaceBookingDAOWrapper;
import com.jfs.training.entity.WorkspaceBookingEntity;

@Service
public class WorkspaceBookingServiceImpl
        implements WorkspaceBookingService {

    @Autowired
    private WorkspaceBookingDAOWrapper daoWrapper;

    /**
     * ToDo Item 1.4
     */
    @Override
    public Long addWorkspaceBooking(
            WorkspaceBookingBean workspaceBookingBean) {
     WorkspaceBookingEntity entity=new WorkspaceBookingEntity();
     
   BeanUtils.copyProperties(workspaceBookingBean, entity);
   
   WorkspaceBookingEntity save=daoWrapper.addWorkspaceBooking(entity);
  
        return save.getId();
    }

    /**
     * ToDo Item 1.5
     */
    @Override
    public List<WorkspaceBookingBean>
            getAllWorkspaceBookings() {
    List<WorkspaceBookingEntity> entity=daoWrapper.getAllWorkspaceBookings();
    List<WorkspaceBookingBean> bean= new ArrayList<>();
    
    for(WorkspaceBookingEntity en:entity) {
    	 WorkspaceBookingBean b= new WorkspaceBookingBean();
    	  BeanUtils.copyProperties(en, b);
         bean.add(b);
    }
        return bean;
    }
}