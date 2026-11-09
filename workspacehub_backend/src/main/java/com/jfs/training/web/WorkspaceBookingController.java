package com.jfs.training.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jfs.training.bean.WorkspaceBookingBean;
import com.jfs.training.service.WorkspaceBookingService;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class WorkspaceBookingController {

    @Autowired
    private WorkspaceBookingService workspaceBookingService;

    /**
     * ToDo Item 1.6
     */
    @PostMapping("/addWorkspaceBooking")
    public ResponseEntity<?> saveWorkspaceBooking(
            @Valid @RequestBody WorkspaceBookingBean workspaceBookingBean,
            BindingResult result) {

    	 if(result.hasErrors()) {
    		  return ResponseEntity
    				  .badRequest()
    				  .body(result.getAllErrors());
    	 }
    	 Long booking=workspaceBookingService.addWorkspaceBooking(workspaceBookingBean);
    	 
    	
        return ResponseEntity
        		.status(HttpStatus.CREATED)
        		.body(booking);
    }

    /**
     * ToDo Item 1.7
     */
    @GetMapping("/getAllWorkspaceBookings")
    public ResponseEntity<List<WorkspaceBookingBean>>
            listWorkspaceBookings() {

    	List<WorkspaceBookingBean> bookinglist=workspaceBookingService.getAllWorkspaceBookings();
    	
        return ResponseEntity.ok(bookinglist);
    }
}