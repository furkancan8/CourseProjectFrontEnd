import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AppComponent } from 'src/app/AngulurApp/app.component';
import { Course } from 'src/app/models/Course/course';
import { CourseVideo } from 'src/app/models/Course/courseVideo';
import { VideoDetails } from 'src/app/models/Course/videoDetails';
import { Comment } from 'src/app/models/Public/comment';
import { CommentAnswer } from 'src/app/models/Public/commentAnswer';
import { User } from 'src/app/models/User/User';
import { CourseService } from 'src/app/services/Course/course.service';
import { VideoService } from 'src/app/services/Course/video.service';
import { CategoryService } from 'src/app/services/Public/category.service';
import { CommentService } from 'src/app/services/Public/comment.service';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { UserService } from 'src/app/services/User/user.service';
@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.css'],
})
export class CourseVideoComponent implements OnInit{
  videoUrlMain="https://localhost:44350/Uploads/Videos/Ihlas-2.mp4";
  videoUrl="https://localhost:44350/Uploads/Videos/";
  imageUrl="https://localhost:44350/Uploads/Images/";
  commentIcon="https://localhost:44350/Uploads/Images/comment-Icon.png";
  downIcon="https://localhost:44350/Uploads/Images/down-arrow.png";
  videos:VideoDetails[]=[]
  mainVideo:VideoDetails[]=[]
  courseVideo:CourseVideo[]=[]
  teacher:User[]=[]
  commentUsers:User[]=[]
  answerCommentUser:User[]=[]
  teacherName:string
  teacherDescription:string;
  course:Course[]=[]
  courseComment:Comment[]=[]
  answerComment:CommentAnswer[]=[]
  courseName:string
  courseCategoryName:string
  courseCreateDate:Date
  isViewAnswerComment:boolean=false
  commentFormGroup:FormGroup
  commentAnswerFormGroup:FormGroup
  courseId:number
  canComment:boolean=true
  successAddCommentMessage:boolean=false
  commentWhiceVideo:number
  constructor(private videoService:VideoService,private commentService:CommentService,private userService:UserService,
    private courseService:CourseService,private route:ActivatedRoute,private categoryService:CategoryService,
    private teacherService:TeacherService,private formBuilder:FormBuilder,private appComponent:AppComponent
    ) {
  }
  ngOnInit(): void {
    var routeId
    this.route.paramMap.subscribe(params=>{
      routeId=params.get('routeId');
    })
      this.getCourseByRouteId(routeId)
      this.createFormGroup()
      this.appComponent.hideNavbar()
  }
  getAllVideoLine(courdeId:number)
  {
    this.videoService.getAllLineVideos(courdeId).subscribe(res=>{
      this.videos=res.data
      res.data.forEach(element => {
        if(element.videoLine==1&&this.mainVideo.length==0)
        {
          this.mainVideo.push(element)
          this.commentWhiceVideo=element.videoLine
          this.createFormGroup()
        }
      });
    })

  }
  getAllVideoByCourse(courseId:number)
  {
    this.videoService.getAllVideoByCourse(courseId).subscribe(res=>{
      this.courseVideo=res.data
     res.data.forEach(element => {
         if(element.videoDetailsId)
         {
          this.getAllVideoLine(element.courseId)
         }
         this.getTeacherById(element.courseId)
     });
    })
  }
  changeMainVideo(video:VideoDetails)
  {
     this.mainVideo=[]
     this.mainVideo.push(video)
     this.commentWhiceVideo=video.videoLine
     this.createFormGroup()
  }
  getTeacherById(courseId:number)
  {
     this.courseService.getCourseById(courseId).subscribe(course=>{
      this.userService.getbyId(course.data.teacherId).subscribe(user=>{
        if(this.teacher.length==0)
        {
          this.teacher.push(user.data)
          this.teacherName=user.data.fullName
        }
      })
      this.teacherService.getTeacher(course.data.teacherId).subscribe(teacher=>{
         this.teacherDescription=teacher.data.description

      })
     })
  }
  getCourseByRouteId(routeId:string)
  {
    this.courseService.getCourseByRouteId(routeId).subscribe(res=>{

      if(this.course.length==0)
      {
        this.course.push(res.data)
      }
      this.getAllVideoByCourse(res.data.courseId)
      this.getCommentByCourse(res.data.courseId)
      this.getCategoryById(res.data.categoryId)
      this.courseName=res.data.name
      this.courseId=res.data.courseId
      this.createFormGroup()
      this.courseCreateDate=res.data.createDate
      this.commentService.getAllCommentByCourse(res.data.courseId).subscribe(comment=>{
        comment.data.forEach(commentElement => {
          this.userService.getbyId(commentElement.userId).subscribe(userCourse=>{

            if (!this.commentUsers.some(user => user.id === userCourse.data.id))
             {
              this.commentUsers.push(userCourse.data);
            }
          });
        });
      })
    });

  }
  getCommentByCourse(courseId:number)
  {
    this.commentService.getAllCommentByCourse(courseId).subscribe(comment=>{
     this.courseComment=comment.data
    })
  }
  getCategoryById(categoryId:number)
  {
    this.categoryService.getByCategoryId(categoryId).subscribe(res=>{
      this.courseCategoryName=res.data.name
    })
  }
  viewCommentAnswer(commentId:number)
  {
    this.answerCommentUser=[]
    this.commentService.getAllAnswerForComment(commentId).subscribe(commentAnswer=>{
     this.answerComment=commentAnswer.data
     commentAnswer.data.forEach(element => {
      this.userService.getbyId(element.userId).subscribe(user=>{
        this.answerCommentUser.push(user.data)
        console.log(this.answerCommentUser)
      })
     });
    })
    if(this.isViewAnswerComment==false)
    {
      this.isViewAnswerComment=true
    }
  }
  changeViewCanComment()
  {
    if(this.canComment==true)
    {
      this.canComment=false
    }else{
      this.canComment=true
    }
  }
  successAddComment()
  {
   setTimeout(() => {
    if(this.commentService.successAddComment==true)
    {
      this.canComment=true
      this.successAddCommentMessage=true
    }
   }, 1000);
  }
  createFormGroup()
  {
    this.commentFormGroup=this.formBuilder.group({
        title:["",Validators.required],
        commentText:["",Validators.required],
        userId:[2],
        courseId:[this.courseId],
        nowVideo:[this.commentWhiceVideo]
    })
    this.commentFormGroup.get('courseId').setValue(this.courseId)
    this.commentFormGroup.get('nowVideo').setValue(this.commentWhiceVideo)
    this.commentAnswerFormGroup=this.formBuilder.group({
        comment:["",Validators.required]
    })
  }
}
