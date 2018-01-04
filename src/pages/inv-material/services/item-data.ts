import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {MatTableDataSource} from '@angular/material';
import {Item} from '../models/item-model';
// import { Observable } from '../../../node_modules/_rxjs@5.5.2@rxjs/Observable';



  interface ParseResponse {
    results: Item[];
  }

@Injectable()
export class ItemService{
    items : Item[] ;
    headers: HttpHeaders;
    url : any;
    constructor(private http:HttpClient){
    this.headers = new HttpHeaders();
    this.headers = this.headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");
    this.url = "http://47.92.145.25:80/parse"+"/classes/InvItems";
    }
    LmsStudentSerice
    loadItemsData() : Item[] {
      
      let options:any ={
        headers:this.headers
      };
      this.http.get<ParseResponse>(this.url,options).subscribe(data=>{
        this.items = data['results'];
      });
      return this.items;
      }


      sortItems(type) {
        // 参考MDN中的ES6，Array语法
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
        if (type == 'asc') {
          this.items.sort(function (a, b) {
            if (a.count > b.count) {
              return 1;
            }
            if (a.count < b.count) {
              return -1;
            }
            return 0;
          });
        }
        if (type == 'desc') {
          this.items.sort(function (a, b) {
            if (a.count > b.count) {
              return -1;
            }
            if (a.count < b.count) {
              return 1;
            }
            return 0;
          });
        }
        if(type == 'random') {
          this.items.sort(function (a, b) {
            return Math.random()*10 - Math.random()* 10;
          });
        }
      }
      addNewItem(item) {
        let url = "http://47.92.145.25:80/parse"+"/classes/InvItems";
        let headers:HttpHeaders = new HttpHeaders();
        headers = headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");
        let options ={
          headers:headers
        };
        if(!item.objectId){
          console.log(item);
          // this.http.post(url,item,options).subscribe(data=>{
          //   this.loadItemsData();
          // });
          return this.http.post(url,item,options);
        } else{
          url = "http://47.92.145.25:80/parse"+"/classes/InvItems/"+item.objectId;
          delete item["objectId"];
          delete item["createdAt"];
          delete item["updatedAt"];
          // this.http.put(url,item,options).subscribe(data=>{
          //   this.loadItemsData();
          // });
          return this.http.put(url,item,options);
        }
      }
      deleteItemByID(id) {
        let url = "http://47.92.145.25:80/parse"+"/classes/InvItems"+"/"+id;
        let headers:HttpHeaders = new HttpHeaders();
        headers = headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");
        let options ={
          headers:headers
        };
        return this.http.delete(url,options);
        // this.http.delete(url,options).subscribe(data=>{
        //   this.loadItemsData();
        // });
      }
      getItems(): Observable<Object> {
        let options = {
          headers: this.headers
        };
      
        return this.http.get(this.url, options);
      }
}