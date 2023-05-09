import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SupportContact } from 'src/app/models/Public/supportContact';
import { SupportContactService } from 'src/app/services/Public/support-contact.service';

@Component({
  selector: 'app-teacher-contact',
  templateUrl: './teacher-contact.component.html',
  styleUrls: ['./teacher-contact.component.css']
})
export class TeacherContactComponent implements OnInit{

  supportContact:SupportContact[]=[]
  contactMain:SupportContact[]=[]
  supportFormGroup:FormGroup
  supportIdFormGroup:FormGroup
  teacherId:string
  contactId:number
  IsSuccessMessage:boolean=false;
  constructor(private supportService:SupportContactService,private formBuilder:FormBuilder,private cdr:ChangeDetectorRef) {

  }
  ngOnInit(): void {
  this.getAllTeacherId(1)
  this.createSupportForm()
  }
  getAllTeacherId(teacherId:number)
  {
    var dateObject=new Date();
   this.supportService.getAllTeacherMessage(teacherId).subscribe(res=>{
      res.data.forEach(element => {
           var teacherId=element.teacherId.toString()
          this.teacherId=teacherId
      });
      this.supportContact=res.data
      this.supportContact.forEach(element => {

      });
   })
  }
  mainContactChange(supportContact:SupportContact)
  {
    this.contactMain=[]
     this.contactMain.push(supportContact)
    this.contactId=supportContact.id
    this.supportContact.forEach(element => {
      if(element.id==this.contactId)
      {
        element.isRead=false
      }
    });
    this.createSupportForm()
    let entityModel=Object.assign({},this.supportIdFormGroup.value);
    this.supportService.update(entityModel).subscribe(res=>{
     console.log(res.success)
    })
  }
  createSupportForm(){
    this.supportFormGroup=this.formBuilder.group({
      teacherId:new FormControl(1),
      subject:new FormControl(),
      message:new FormControl(),
    })
    this.supportIdFormGroup=this.formBuilder.group({
      id:new FormControl()
    })
    this.supportIdFormGroup.get("id").setValue(this.contactId);
    console.log(this.supportIdFormGroup.get("id"));
  }
  submitMessage()
  {
   setTimeout(() => {
    if(this.supportService.AddPostSuccess==true)
    {
     this.IsSuccessMessage=true
    }
   }, 500);
   this.getAllTeacherId(1)
  }
}
