import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/Public/category.service';
import { Course } from 'src/app/models/Course/course';
import { Category } from 'src/app/models/Public/category';
import { UserOperationClaim } from 'src/app/models/Public/userOperationClaim';
import { TeacherCourse } from 'src/app/models/Teacher/teacherCourse';
import { User } from 'src/app/models/User/User';
import { CourseService } from 'src/app/services/Course/course.service';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { OperationClaimService } from 'src/app/services/User/operation-claim.service';
import { UserService } from 'src/app/services/User/user.service';
import { AppComponent } from 'src/app/AngulurApp/app.component';
import { CourseUserService } from 'src/app/services/Course/course-user.service';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/services/Course/video.service';
import { VideoDetails } from 'src/app/models/Course/videoDetails';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  teacherCount: number;
  categoryCount: number;
  @ViewChild('teacherCap') teacherCapElement: ElementRef;
  @ViewChild('categoryCap') categoryCapElement: ElementRef;
  course:Course[]=[]
  fullCourse:Course[]=[]
  userImageUrl:string="https://localhost:44350/Uploads/Images/avatar-scaled.jpeg";
  imageUrl:string="https://localhost:44350/Uploads/Images/";
  IsActiveCategory:boolean=false
  IsActiveTeacher:boolean=false
  teacherCourse:TeacherCourse[]=[]
  teachers:User[]=[]
  TeacherClaim:UserOperationClaim[]=[]
  categories:Category[]=[]
  constructor(private courseService:CourseService,private teacherService:TeacherService,private userService:UserService
   ,private categoryService:CategoryService,private claimService:OperationClaimService,private appComponent:AppComponent,
   private userCourseUser:CourseUserService,private route:Router,private videoService:VideoService) {

  }
  ngOnInit(): void {
    this.getAllTeacherByClaim()
    this.getCourse()
    this.getAllCategory()
    setTimeout(() => {
    this.teacherCount=document.querySelectorAll('.teacher').length;
    this.categoryCount=document.querySelectorAll('.category').length;
    }, 300);
    this.appComponent.hideNavbar()
    console.log()
    const cookies = document.cookie;
    console.log(cookies);
  }
  getCourse()
  {
     this.courseService.getAll().subscribe(course=>{
      this.course=course.data
      this.fullCourse=course.data
      this.userCourseUser.getAllCourseByUserId(6004).subscribe(userCourse=>{
        course.data.forEach(element => {
          userCourse.data.forEach(userCourseElement => {
             if(element.courseId==userCourseElement.courseId)
             {
               element.IsCourseHaveUser=true
               console.log(element)
             }
            //  console.log(element)
            //  if(userCourseElement.courseId!=element.courseId){
            //   element.IsCourseHaveUser=false
            //  }
          });
        });
      })
     })
  }
  routeLinkCourse(course:Course)
  {
    this.videoService.getAllVideoByCourse(course.courseId).subscribe(videoCourse=>{
      videoCourse.data.forEach(vCourse => {
          this.videoService.getAllLineVideos(vCourse.videoDetailsId).subscribe(videoDetails=>{
            videoDetails.data.forEach(videoElement => {
              if(course.IsCourseHaveUser==true)
              {
                this.route.navigate(["/course/have/"+course.courseRouteId+"/lesson/"+videoElement.videoRouteId])
              }
           });
          })
        });
    })
    if(course.IsCourseHaveUser!=true)
    {
      this.route.navigate(["/course/"+course.name])
    }
  }
  addClassCategory()
  {
    if(this.IsActiveCategory==false)
    {
      this.adjustCategoryCapHeight()
      setTimeout(() => {
        this.IsActiveCategory=true
      }, 150);
    }else
    {
      this.detractjustCategoryCapHeight()
      setTimeout(() => {
        this.IsActiveCategory=false
      }, 150);
    }
    return;
  }
  addClassTeacher()
  {
      if(this.IsActiveTeacher==false)
      {
        this.adjustTeacherCapHeight()
        setTimeout(() => {
          this.IsActiveTeacher=true
        }, 150);

      }else
      {
        this.detractjustTeacherCapHeight()
        setTimeout(() => {
          this.IsActiveTeacher=false
        }, 150);
      }

    return;
  }
  getTeacherOfCourse(teacherId:number)
  {
    this.teacherService.getTeacherOfCourse(teacherId).subscribe(res=>{
        this.teacherCourse=res.data
    })
  }
  getAllTeacherByClaim()
  {
    this.claimService.getAllTeacherByClaim().subscribe(res=>{
      this.TeacherClaim=res.data
      this.getTeacher()
    })
  }
  getTeacher()
  {
    var tryTeacher:User[]=[]
    var promises:Promise<any>[]=[]

    this.TeacherClaim.forEach(element => {
    var promise=new Promise<void>((resolve,reject)=>{
      this.userService.getbyId(element.userId).subscribe(res=>{
        tryTeacher.push(res.data)
        resolve();
      })
     })
     promises.push(promise)
    });
    Promise.all(promises).then(()=>{
      this.teachers=tryTeacher
    })
  }
  getAllCategory()
  {
    this.categoryService.getAllCategory().subscribe(res=>{
     this.categories=res.data
    })
  }
  changeCategoryOfCourse(categoryId:number)
  {
    this.course=this.fullCourse.filter(i=>i.categoryId==categoryId)
  }
  allCategoryOfCourse()
  {
    this.course=this.fullCourse
  }
  changeTeacherOfCourse(teacherId:number)
  {
    this.course=this.fullCourse.filter(t=>t.teacherId==teacherId);
  }
  adjustTeacherCapHeight() {
      setTimeout(() => {
        const teacherCount = this.teacherCount;
        console.log(teacherCount);
        const newHeight = 70 + (teacherCount * 40);
        this.teacherCapElement.nativeElement.style.height = newHeight + 'px';
      }, 100);
  }
  adjustCategoryCapHeight() {
    setTimeout(() => {
      const categoryCount = this.categoryCount;
      console.log(categoryCount);
      const newHeight = 70 + (categoryCount * 40);
      this.categoryCapElement.nativeElement.style.height = newHeight + 'px';
    }, 100);
  }
  detractjustTeacherCapHeight()
  {
    setTimeout(() => {
      this.teacherCapElement.nativeElement.style.height = 40 + 'px';
    }, 100);
  }
  detractjustCategoryCapHeight()
  {
    setTimeout(() => {
      this.categoryCapElement.nativeElement.style.height = 40 + 'px';
    }, 100);
  }
  getTeacherById(teacherId: number): User | undefined {
    return this.teachers.find(teacher => teacher.id === teacherId);
  }

}
