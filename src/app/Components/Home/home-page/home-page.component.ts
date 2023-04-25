import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Course } from 'src/app/models/Course/course';
import { Category } from 'src/app/models/Public/category';
import { Teacher } from 'src/app/models/Teacher/teacher';
import { TeacherCourse } from 'src/app/models/Teacher/teacherCourse';
import { CourseService } from 'src/app/services/Course/course.service';
import { PublicService } from 'src/app/services/public.service';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { AuthService } from 'src/app/services/User/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  teacherCount: number;
  categoryCount: number;
  @ViewChild('teacherCap') teacherCapElement: ElementRef;
  @ViewChild('categoryCap') categoryCapElement: ElementRef;
  course:Course[]=[]
  fullCourse:Course[]=[]
  userImageUrl:string="https://localhost:44350/Uploads/Images/avatar-scaled.jpeg";
  imageUrl:string="https://localhost:44350/Uploads/Images/";
  IsActiveCategory:boolean=false
  IsActiveTeacher:boolean=false
  teacherCourse:TeacherCourse[]=[]
  teachers:Teacher[]=[]
  categories:Category[]=[]
  constructor(private courseService:CourseService,private authService:AuthService,private teacherService:TeacherService,
    private publicService:PublicService) {

  }
  ngOnInit(): void {
    this.getCourse()
    this.getAllTeacher()
    this.getAllCategory()
    setTimeout(() => {
    this.teacherCount=document.querySelectorAll('.teacher').length;
    this.categoryCount=document.querySelectorAll('.category').length;
    }, 300);
  }
  getCourse()
  {
     this.courseService.getAll().subscribe(res=>{
      this.course=res.data
      this.fullCourse=res.data
     })
  }
  addClassCategory()
  {
    if(this.IsActiveCategory==false)
    {
      this.adjustCategoryCapHeight()
      setTimeout(() => {
        this.IsActiveCategory=true
      }, 150);
    }else
    {
      this.detractjustCategoryCapHeight()
      setTimeout(() => {
        this.IsActiveCategory=false
      }, 150);
    }
    return;
  }
  addClassTeacher()
  {
      if(this.IsActiveTeacher==false)
      {
        this.adjustTeacherCapHeight()
        setTimeout(() => {
          this.IsActiveTeacher=true
        }, 150);

      }else
      {
        this.detractjustTeacherCapHeight()
        setTimeout(() => {
          this.IsActiveTeacher=false
        }, 150);
      }

    return;
  }
  getTeacherOfCourse(teacherId:number)
  {
    this.teacherService.getTeacherOfCourse(teacherId).subscribe(res=>{
        this.teacherCourse=res.data
    })
  }
  getAllTeacher()
  {
    this.teacherService.getAllTeacher().subscribe(res=>{
      this.teachers=res.data
      console.log(this.teachers)
    })
  }
  getAllCategory()
  {
    this.publicService.getAllCategory().subscribe(res=>{
     this.categories=res.data
    })
  }
  changeCategoryOfCourse(categoryId:number)
  {
    this.course=this.fullCourse.filter(i=>i.categoryId==categoryId)
  }
  allCategoryOfCourse()
  {
    this.course=this.fullCourse
  }
  changeTeacherOfCourse(teacherId:number)
  {
    this.course=this.fullCourse.filter(t=>t.teacherId==teacherId);
  }
  adjustTeacherCapHeight() {
      setTimeout(() => {
        const teacherCount = this.teacherCount;
        console.log(teacherCount);
        const newHeight = 70 + (teacherCount * 40);
        this.teacherCapElement.nativeElement.style.height = newHeight + 'px';
      }, 100);
  }
  adjustCategoryCapHeight() {
    setTimeout(() => {
      const categoryCount = this.categoryCount;
      console.log(categoryCount);
      const newHeight = 70 + (categoryCount * 40);
      this.categoryCapElement.nativeElement.style.height = newHeight + 'px';
    }, 100);
  }
  detractjustTeacherCapHeight()
  {
    setTimeout(() => {
      this.teacherCapElement.nativeElement.style.height = 40 + 'px';
    }, 100);
  }
  detractjustCategoryCapHeight()
  {
    setTimeout(() => {
      this.categoryCapElement.nativeElement.style.height = 40 + 'px';
    }, 100);
  }
}
