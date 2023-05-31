import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SectionService } from '../services/Course/section.service';
import { VideoService } from '../services/Course/video.service';
import { SupportContactService } from '../services/Public/support-contact.service';
import { TeacherService } from '../services/Teacher/teacher.service';

import { AuthService } from '../services/User/auth.service';
import { UserService } from '../services/User/user.service';

@Directive({
  selector: '[appUpdate]'
})
export class UpdateDirective {
  @Input() entityId:number
  @Input() userId:number
  @Input() entity:string;
  @Input() entityFormGroup:FormGroup
  @Input() changePasswordFormGroup:FormGroup
  @Input() verifypPasswordFormGroup:FormGroup
  constructor(private userService:UserService,private authService:AuthService,private supportService:SupportContactService,
  private sectionService:SectionService,private teacherService:TeacherService,private videoService:VideoService) { }
  @HostListener("click")
  update()
  {
    if(this.entity=="user")
    {
      setTimeout(() => {
        let userModel=Object.assign({},this.entityFormGroup.value)
        this.userService.update(userModel,this.entityId).subscribe(res=>{
          console.log(userModel)
          console.log(res.success)
        })
      }, 1000);
    }
    else if(this.entity=="password")
    {
      setTimeout(() => {
       let registerModel=Object.assign({},this.changePasswordFormGroup.value)
       this.authService.changePassword(registerModel,this.userId).subscribe(res=>{
         console.log(res.success)
           this.authService.IsChangePassword=res.success
       })
      }, 500)
    }
    else if(this.entity=="supportcontact")
    {
      let registerModel=Object.assign({},this.changePasswordFormGroup.value)
      this.supportService.update(registerModel).subscribe(res=>{
        console.log(res.success)
      })
    }
    else if(this.entity=="sectionCourse")
    {
      let registerModel=Object.assign({},this.changePasswordFormGroup.value)
      this.sectionService.courseUpdate(registerModel).subscribe(res=>{
        console.log(res.success)
      })
    }else if(this.entity=="courseVideo")
    {
      let registerModel=Object.assign({},this.changePasswordFormGroup.value)
      this.videoService.courseVideoAdd(registerModel).subscribe(res=>{
        console.log(res.success)
      })
    }else if(this.entity=="videoDetails")
    {
      let registerModel=Object.assign({},this.changePasswordFormGroup.value)
      this.videoService.videoDetailsUpdate(registerModel).subscribe(res=>{
        console.log(res.success)
      })
    }else if(this.entity=="teacherCourse")
    {
      let registerModel=Object.assign({},this.changePasswordFormGroup.value)
      this.teacherService.teacherCourseUpdate(registerModel).subscribe(res=>{
        console.log(res.success)
      })
    }
  }
}
