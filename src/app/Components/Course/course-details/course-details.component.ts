import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CourseComment } from 'src/app/models/Course/comment';
import { Course } from 'src/app/models/Course/course';
import { SectionCourse } from 'src/app/models/Course/sectionCourse';
import { SectionVideo } from 'src/app/models/Course/sectionVideo';
import { VideoDetails } from 'src/app/models/Course/videoDetails';
import { User } from 'src/app/models/User/User';
import { CommentService } from 'src/app/services/Course/comment.service';
import { CourseService } from 'src/app/services/Course/course.service';
import { CourseUserService } from 'src/app/services/Course/course-user.service';
import { VideoService } from 'src/app/services/Course/video.service';
import { UserService } from 'src/app/services/User/user.service';
import { SectionService } from 'src/app/services/Course/section.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit{
  videoUrl="https://localhost:44350/Uploads/Videos/";
  imageUrl="https://localhost:44350/Uploads/Images/";
  course:Course[]=[]
  trailerVideo:VideoDetails[]=[]
  sectionCourse:SectionCourse[]=[]
  sectionVideo:SectionVideo[]=[]
  videos:VideoDetails[]=[]
  courseComment:CourseComment[]=[]
  commentUser:User[]=[]
  courseUser:User[]=[]
  courseStudentCount:number=0
  ckeConfig: any;
  constructor(private activetedRoute:ActivatedRoute,private courseService:CourseService,private videoService:VideoService
    ,private commentService:CommentService,private userService:UserService,private courseUserService:CourseUserService,
    private sectionService:SectionService) {


  }
  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      const courseName=decodeURIComponent(params["name"])
      const updatedCourseName = courseName.replace(/#/g,'sharp').replace('+','plus');
      this.getCourseByName(updatedCourseName)
    })
    25
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }
  getCourseByName(courseName:string)
  {
    this.courseService.getCourseByName(courseName).subscribe(res=>{
      this.course.push(res.data)
      this.userService.getbyId(res.data.teacherId).subscribe(res=>{
        this.courseUser.push(res.data)
      })
      this.getCourseIfTrailer(res.data.courseId)
      this.getSectionByCourseId(res.data.courseId)
      this.getAllCourseOfComment(res.data.courseId)
      this.getCourseStudentCount(res.data.courseId)
    })
  }
  getCourseIfTrailer(courseId:number)
  {
    this.videoService.getCourseOfTrailer(courseId).subscribe(res=>{
      this.trailerVideo.push(res.data)
    })
  }
  getSectionByCourseId(courseId:number)
  {
    this.sectionService.getSectionByCourse(courseId).subscribe(res=>{
      this.sectionCourse=res.data
      this.sectionCourse.forEach(element => {
        this.getVideoIdOfSectionVideoId(element.id)
      });
    })
  }
  getVideoIdOfSectionVideoId(sectionCourseId:number)
  {
   this.sectionService.getVideoBySectionVideo(sectionCourseId).subscribe(res=>{
    res.data.forEach(element => {
      this.sectionVideo.push(element)
    });
    // console.log(this.sectionVideo)
   })
  }
  getVideoBySection(sectionId:number)
  {
    this.videos=[]
    this.sectionVideo.forEach(element => {
      console.log(element)
      if(element.sectionCourseId==sectionId)
      {
        this.videoService.getVideoDetails(element.videoId).subscribe(res=>{
          this.videos.push(res.data)
        })
      }
    });
  }
  getAllCourseOfComment(courseId:number)
  {
    this.commentService.getAllCourseOfComment(courseId).subscribe(res=>{
      this.courseComment=res.data
      this.courseComment.forEach(element => {
        this.getCommentOfUser(element.userId)
      });
    })
  }
  getCommentOfUser(userId:number)
  {
    this.userService.getbyId(userId).subscribe(res=>{
        this.commentUser.push(res.data)
    })
  }
  getCourseStudentCount(courseId:number)
  {
    this.courseUserService.getAllCourseId(courseId).subscribe(res=>{
      res.data.forEach(element => {
          this.courseStudentCount+=1;
          console.log(this.courseStudentCount)
      });
    })
    console.log(this.courseStudentCount)
  }
}
