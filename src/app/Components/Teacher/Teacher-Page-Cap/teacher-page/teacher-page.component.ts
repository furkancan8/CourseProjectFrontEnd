import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Public/comment';
import { SupportContact } from 'src/app/models/Public/supportContact';
import { User } from 'src/app/models/User/User';
import { CommentService } from 'src/app/services/Public/comment.service';
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
  userCommentAll:Comment[]=[]
  userCommentShow:Comment[]=[]
  constructor(private userService:UserService,private contactService:SupportContactService,private commentService:CommentService,
    ) {

  }
  ngOnInit(): void {
   this.getUserService(6004);
   this.getUserMessage(6004);
   this.getUserComment(6004);
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
     console.log(userMessageShow)
    })
  }
  getUserComment(teacherId:number)
  {
    this.commentService.getAllUserComment(teacherId).subscribe(res=>{
      this.userCommentAll=res.data
      const userCommentAll=this.userCommentAll.reduce((prev,current)=>
       prev.id>current.id? prev:current
     );
     this.userCommentShow.push(userCommentAll)
     console.log(this.userCommentShow)
    })
  }
}
