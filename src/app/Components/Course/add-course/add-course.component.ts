import { Component,OnInit } from '@angular/core';
import { Category } from 'src/app/models/Public/category';
import { CategoryService } from 'src/app/services/Public/category.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit{
  categories:Category[]=[]
  courseName:string=''
  constructor(private categoryService:CategoryService) {

  }
  ngOnInit(): void {
   this.getAllCategory()
  }
  getAllCategory()
  {
    this.categoryService.getAllCategory().subscribe(res=>{
     this.categories=res.data
    })
  }
  girilenDegeriGuncelle(deger:any) {
    this.courseName = deger.target.value;
  }
}
