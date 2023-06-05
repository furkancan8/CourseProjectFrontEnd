import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit{

  sectionVideoFormGroup:FormGroup
  videoDetailsFormGroup:FormGroup
  sectionCourseFormGroup:FormGroup
  teacherCourseFormGroup:FormGroup
  courseVideoFormGroup:FormGroup
  constructor(private formBuilder:FormBuilder) {

  }
  ngOnInit(): void {

  }
  createFormGroup()
  {
    this.sectionVideoFormGroup=this.formBuilder.group({
      id:new FormControl(""),
      sectionCourseId:new FormControl(""),
      videoId:new FormControl("")
    })
    this.videoDetailsFormGroup=this.formBuilder.group({
      id:new FormControl(""),
      videoUrl:new FormControl(""),
      time:new FormControl(""),
      title:new FormControl(""),
      videoLine:new FormControl(""),
      videoRouteId:new FormControl("")
    })
    this.courseVideoFormGroup=this.formBuilder.group({
      id:new FormControl(""),
      videoDetailsId:new FormControl(""),
      courseId:new FormControl("")
    })
    this.teacherCourseFormGroup=this.formBuilder.group({
      id:new FormControl(""),
      teacherId:new FormControl(""),
      courseId:new FormControl(""),
    })
    this.sectionCourseFormGroup=this.formBuilder.group({
      id:new FormControl(""),
      courseId:new FormControl(""),
      title:new FormControl(""),
      sectionLine:new FormControl("")
    })
  }
}
