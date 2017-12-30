import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { Observable } from '../../../node_modules/_rxjs@5.5.2@rxjs/Observable';

interface Employee {
  id?: number;
  name: string;
  sex: string;
  dept:string;
  sale:number;
  joinin:string;
}

@Injectable()
export class EmployeeService{

    employees:any[];
    constructor(private http:HttpClient){
    }
    loadEmployeesData() {
    // this.users = [
    //   {id: 5, count:100, name: "Ryane", github: "ryanemax", sex: "male"},
    //   {id: 4, count:999, name: "Liming", github: "liming", sex: "male"},
    //   {id: 3, count:1000, name: "Xiaohong", github: "xiaohong", sex: "female"},
    //   {id: 1, count:3432500, name: "Zhangdayong", github: "Zhangdayong", sex: "male"},
    //   {id: 2, count:10012312321, name: "Hanmeimei", github: "Hanmeimei", sex: "female"}
    // ];
    let url = "http://47.92.145.25:80/parse"+"/classes/User12";
    let headers:HttpHeaders = new HttpHeaders();
    headers = headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");

    let options:any ={
      headers:headers
    };
    return this.http.get(url,options).subscribe(data=>{
      this.employees = data['results'];
      console.log(this.employees);
    });
  }


  addNewEmployee(employee) {
        if(employee["name"]===""||employee["dept"]===""){
          alert("请输入正确的用户信息");
        }

        let url = "http://47.92.145.25:80/parse"+"/classes/Employee12";
        let headers:HttpHeaders = new HttpHeaders();
        headers = headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");
    
        let options:any ={
          headers:headers
        };

        if(!employee.objectId){
        // 新增用户
        this.http.post(url,employee,options).subscribe(data=>{
          this.loadEmployeesData();
        });
      }else{
        // 修改用户
        url = "http://47.92.145.25:80/parse"+"/classes/User12/"+employee.objectId;
        delete employee["objectId"];
        delete employee["createdAt"];
        delete employee["updatedAt"];
        this.http.put(url,employee,options).subscribe(data=>{
          this.loadEmployeesData();
        });
      }


      }
    
      deleteEmployeeByID(id) {
        let url = "http://47.92.145.25:80/parse"+"/classes/User12"+"/"+id;
        let headers:HttpHeaders = new HttpHeaders();
        headers = headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");
    
        let options ={
          headers:headers
        };
    
        this.http.delete(url,options).subscribe(data=>{
          this.loadEmployeesData();
        });
      }

      sortEmployees(type) {
        // 参考MDN中的ES6，Array语法
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
        if (type === 'asc') {
          this.employees.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        }
    
        if (type === 'desc') {
          this.employees.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          });
        }
    
        if(type === 'random') {
          for(let i=0, len=this.employees.length; i<len; i++){
            let rand = Number(Math.random()*len).toFixed(0);
            let temp = this.employees[rand];
            this.employees[rand] = this.employees[i];
            this.employees[i] = temp;
          }
        }
        console.log("sortEmployees Works!");
      }
    
      
    
}