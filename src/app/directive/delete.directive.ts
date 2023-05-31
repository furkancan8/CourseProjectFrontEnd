import { Directive,Input,ElementRef, HostListener  } from '@angular/core';
import { SectionService } from '../services/Course/section.service';
import { VideoService } from '../services/Course/video.service';
import { TeacherService } from '../services/Teacher/teacher.service';
import { PaymentService } from '../services/User/payment.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  @Input() entityId:number;
  @Input() entity:string;
  constructor(private paymentService:PaymentService,private sectionSerivce:SectionService,private teacherService:TeacherService,
    private videoService:VideoService) { }
  @HostListener("click")
  onclick()
  {
    if(this.entity=="payment")
    {
      this.paymentService.delete(this.entityId).subscribe(res=>{
        console.log(res.success)
      })
    }else if(this.entity=="sectionVideo")
    {
      this.sectionSerivce.videoDelete(this.entityId).subscribe(res=>{
        console.log(res.success)
      })
    }else if(this.entity=="sectionCourse")
    {
      this.sectionSerivce.courseDelete(this.entityId).subscribe(res=>{
        console.log(res.success)
      })
    }else if(this.entity=="videoDetails")
    {
      this.videoService.videoDetailsDelete(this.entityId).subscribe(res=>{
        console.log(res.success)
      })
    }else if(this.entity=="courseVideo")
    {
      this.videoService.courseVideoDelete(this.entityId).subscribe(res=>{
        console.log(res.success)
      })
    }else if(this.entity=="teacherCourse")
    {
      this.teacherService.teacherCourseDelete(this.entityId).subscribe(res=>{
        console.log(res.success)
      })
    }
  }
}
