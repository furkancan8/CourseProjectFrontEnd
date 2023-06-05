import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  courseName:string="Kurs ismi"
  courseTitle:string="Kurs başlığı"
  coursePrice:string="00.00"
  courseImage:File|null=null
  courseImageUrl:string=null
  teacher:User[]=[]
  imageUrl:string="https://localhost:44350/Uploads/Images/";
  isStopped: boolean = false;
  courseFormGroup:FormGroup
  constructor(private categoryService:CategoryService,private userService:UserService,private formBuilder:FormBuilder,
  ) {

  }
  ngOnInit(): void {
   this.getAllCategory()
   this.getTeacher(6004)
   this.getUser()
   this.createFormGroup()
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
    else if(inputType=="courseTitle")
    {
      this.courseTitle=deger.target.value;
    }
    else if(inputType=="coursePrice")
    {
      this.coursePrice=deger.target.value
    }
    else(inputType=="courseImage")
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
    })
  }
  createFormGroup()
  {
    this.courseFormGroup=this.formBuilder.group({
      name:new FormControl(""),
      image:new FormControl(""),
      teacherId:new FormControl(2),
      categoryId:new FormControl(""),
      description:new FormControl(""),
      price:new FormControl(""),
      title:new FormControl("")
    })
  }
  getUser()
  {
    // var token=localStorage.getItem("token");
    // console.log(token)
    // this.authService.getDecodeToken(token).subscribe(res=>{
    //   console.log(res.data)
    // })
  }
}
