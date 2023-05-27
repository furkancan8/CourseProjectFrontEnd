export interface Course{
    courseId:number,
    name:string,
    title:string,
    description:string,
    image:string,
    teacherId:number,
    categoryId:number
    createDate:Date
    price:number
    IsCourseHaveUser:boolean
    courseRouteId:string
}
