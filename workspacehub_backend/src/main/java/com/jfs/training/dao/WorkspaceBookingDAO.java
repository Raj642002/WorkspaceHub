package com.jfs.training.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jfs.training.entity.WorkspaceBookingEntity;

@Repository
public interface WorkspaceBookingDAO extends JpaRepository<WorkspaceBookingEntity,Long>{

    // ToDo Item 1.1

}