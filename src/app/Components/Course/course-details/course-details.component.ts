import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit{

  constructor(private activetedRoute:ActivatedRoute) {


  }
  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      const courseName=decodeURIComponent(params["name"])
      const updatedCourseName = courseName.replace(/#/g,'sharp').replace('+','plus');
    //  this.getCourseByName(updatedCourseName)
    })
  }
}
