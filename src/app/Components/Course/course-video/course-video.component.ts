import { Component, OnInit } from '@angular/core';
import { CourseVideo } from 'src/app/models/Course/courseVideo';
import { VideoDetails } from 'src/app/models/Course/videoDetails';
import { VideoService } from 'src/app/services/Course/video.service';
import { CommentService } from 'src/app/services/Public/comment.service';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';

@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.css']
})
export class CourseVideoComponent implements OnInit{

  videoUrlMain="https://localhost:44350/Uploads/Videos/İhlas-2.mp4";
  videoUrl="https://localhost:44350/Uploads/Videos/";
  videos:VideoDetails[]=[]
  courseVideo:CourseVideo[]=[]
  constructor(private videoService:VideoService,private commentService:CommentService,private teacherService:TeacherService) {

  }
  ngOnInit(): void {
    this.getAllVideoByCourse(1)
  }
  getVideoDetails(videoDetailId:number)
  {
    this.videoService.getVideoDetails(videoDetailId).subscribe(res=>{
     this.videos.push(res.data)
     console.log(this.videos)
    })
  }
  getAllVideoByCourse(courseId:number)
  {
    this.videoService.getAllVideoByCourse(courseId).subscribe(res=>{
     res.data.forEach(element => {
         this.getVideoDetails(element.id)
     });
     console.log(res.data)
    })
  }
  getTeacherById(teacherId:number)
  {

  }
}
