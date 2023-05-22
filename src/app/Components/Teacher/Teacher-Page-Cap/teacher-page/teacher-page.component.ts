import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/AngulurApp/app.component';
import { SoldCourse } from 'src/app/models/Course/soldCourse';
import { CourseQuestion } from 'src/app/models/Public/courseQuestion';
import { SupportContact } from 'src/app/models/Public/supportContact';
import { User } from 'src/app/models/User/User';
import { SoldCourseService } from 'src/app/services/Course/sold-course.service';
import { QuestionService } from 'src/app/services/Course/question.service';
import { SupportContactService } from 'src/app/services/Public/support-contact.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit{

  imageUrl:string="https://localhost:44350/Uploads/Images/";
  user:User[]=[]
  userMessageAll:SupportContact[]=[]
  userMessageShow:SupportContact[]=[]
  userCommentAll:CourseQuestion[]=[]
  userCommentShow:CourseQuestion[]=[]
  soldCourse:SoldCourse[]=[]
  daySoldCourse:number=0
  weekSoldCourse:number=0
  monthSoldCourse:number=0

  constructor(private userService:UserService,private contactService:SupportContactService,private questionService:QuestionService,
  private soldCourseService:SoldCourseService,private appComponent:AppComponent) {

  }
  ngOnInit(): void {
   this.getUserService(6004);
   this.getUserMessage(6004);
   this.getUserComment(6004);
   this.getUserForSoldCourse(6004);
   this.appComponent.hideFooter()
  }
  getUserService(teacherId:number)
  {
    this.userService.getbyId(teacherId).subscribe(res=>{
     this.user.push(res.data)
    })
  }
  getUserMessage(teacherId:number)
  {
    this.contactService.getAllTeacherMessage(teacherId).subscribe(res=>{
     res.data.forEach(element => {
       if(element.isRead=true)
       {
        this.userMessageAll.push(element)
       }
     });
     const userMessageShow=this.userMessageAll.reduce((prev,current)=>
       prev.id>current.id? prev:current
     );
     this.userMessageShow.push(userMessageShow);
    })
  }
  getUserComment(teacherId:number)
  {
    this.questionService.getAllUserComment(teacherId).subscribe(res=>{
      this.userCommentAll=res.data
      const userCommentAll=this.userCommentAll.reduce((prev,current)=>
       prev.id>current.id? prev:current
     );
     this.userCommentShow.push(userCommentAll)
    })
  }
  getUserForSoldCourse(userId:number)
  {
    this.soldCourseService.getAllUserForSoldCourse(userId).subscribe(res=>{
      this.soldCourse=res.data
      const date=new Date();
      const nowDay=date.toLocaleDateString();
      res.data.forEach(element => {
        const soldDate=new Date(Date.parse(element.dateTime)).toLocaleDateString();
        if(nowDay==soldDate)
        {
          this.daySoldCourse+=1;
        }
      });
    })
  }
}
