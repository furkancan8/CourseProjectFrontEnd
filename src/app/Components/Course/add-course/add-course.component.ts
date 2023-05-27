import { Component,OnInit } from '@angular/core';
import { Category } from 'src/app/models/Public/category';
import { User } from 'src/app/models/User/User';
import { CategoryService } from 'src/app/services/Public/category.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit{
  categories:Category[]=[]
  courseName:string=''
  courseTitle:string=''
  coursePrice:string=''
  courseImage:File|null=null
  courseImageUrl:string=null
  teacher:User[]=[]
  imageUrl:string="https://localhost:44350/Uploads/Images/";
  constructor(private categoryService:CategoryService,private userService:UserService) {

  }
  ngOnInit(): void {
   this.getAllCategory()
   this.getTeacher(6004)
  }
  getAllCategory()
  {
    this.categoryService.getAllCategory().subscribe(res=>{
     this.categories=res.data
    })
  }
  coruseFormValue(deger:any,inputType:string) {
    if(inputType=="courseName")
    {
      this.courseName = deger.target.value;
    }
    if(inputType=="courseTitle")
    {
      this.courseTitle=deger.target.value
    }
    if(inputType=="coursePrice")
    {
      this.coursePrice=deger.target.value
    }
    if(inputType=="courseImage")
    {
      this.courseImage=deger.target.files[0]
      if(this.courseImage)
      {
        const reader=new FileReader()
        reader.onload=(a:any)=>{
          this.courseImageUrl=a.target.result
        }
        reader.onloadend=()=>{
          this.courseImageUrl=this.courseImageUrl
        }
        reader.readAsDataURL(this.courseImage)
      }
    }
  }
  getTeacher(userId:number)
  {
    this.userService.getbyId(userId).subscribe(res=>{
      this.teacher.push(res.data)
      console.log(res.data)
    })
  }
}
