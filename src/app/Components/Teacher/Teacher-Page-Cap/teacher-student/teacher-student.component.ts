import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/AngulurApp/app.component';
import { Course } from 'src/app/models/Course/course';
import { CourseUser } from 'src/app/models/Course/courseUser';
import { User } from 'src/app/models/User/User';
import { CourseUserService } from 'src/app/services/Course/course-user.service';
import { CourseService } from 'src/app/services/Course/course.service';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.css']
})
export class TeacherStudentComponent implements OnInit{
  user:User[]=[]
  teacherCourse:Course[]=[]
  courseUser:CourseUser[]=[]
  imageUrl:string="https://localhost:44350/Uploads/Images/";
  constructor(private teacherService:TeacherService,private userService:UserService,private courseService:CourseService,
  private courseUserService:CourseUserService,private appComponent:AppComponent) {

  }
  ngOnInit(): void {
    this.getAllTeacherOfStudent(1);
    this.getAllTeachingCourse(1);
    this.appComponent.hideFooter();
  }
  getAllTeacherOfStudent(teacherId:number)
  {
    this.teacherService.getAllTeacherOfStudent(teacherId).subscribe(res=>{
      res.data.forEach(element => {
         this.userService.getbyId(element.studentId).subscribe(res2=>{
          // this.user.push(res2.data)
         })
      });
    })
  }
  getAllTeachingCourse(teacherId:number){
    this.courseService.getAllTeachingCourse(teacherId).subscribe(courseRes=>{
      courseRes.data.forEach(course => {
        this.teacherCourse.push(course)
        console.log(this.teacherCourse)

        this.courseUserService.getAllCourseId(course.courseId).subscribe(courseUserRes=>{
          this.courseUser=courseUserRes.data
          courseUserRes.data.forEach(courseUser => {
            this.userService.getbyId(courseUser.userId).subscribe(userRes=>{
              this.user.push(userRes.data)
             })
          });
        })
      });
    })
  }
  changeUserOfCourse(courseId:number)
  {
    this.user=[]
    this.courseUserService.getAllCourseId(courseId).subscribe(courseUserRes=>{
      this.courseUser=courseUserRes.data
      courseUserRes.data.forEach(courseUser => {
        this.userService.getbyId(courseUser.userId).subscribe(userRes=>{
          this.user.push(userRes.data)
         })
      });
    })
  }
}
