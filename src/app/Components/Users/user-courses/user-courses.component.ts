import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course/course';
import { CourseUser } from 'src/app/models/Course/courseUser';
import { CourseUserService } from 'src/app/services/Course/course-user.service';
import { CourseService } from 'src/app/services/Course/course.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent implements OnInit{
   id=localStorage.getItem(('i_u'))
   userId=parseInt(this.id)
   courseUser:CourseUser[]=[]
   course:Course[]=[]
   userImageUrl:string="https://localhost:44350/Uploads/Images/avatar-scaled.jpeg";
   imageUrl:string="https://localhost:44350/Uploads/Images/";
  constructor(private courseUserService:CourseUserService,private courseService:CourseService) {

  }
  ngOnInit(): void {
    this.getCourseByUserId(this.userId)
  }
  getCourseByUserId(userId:number)
  {
      this.courseUserService.getCourseByUserId(userId).subscribe(res=>{
          this.courseUser=res.data
          console.log(this.courseUser)
          res.data.forEach(element => {
            this.getCourseById(element.courseId)
          });
      })
  }
  getCourseById(courseId:number)
  {
    this.courseService.getCourseById(courseId).subscribe(res=>{
        this.course.push(res.data)
        console.log(this.course)
    })
  }
}
