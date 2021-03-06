import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
// Cloud 微服务接口库
import {Parse} from "../../cloud/cloud";
// End of Cloud

interface WeatherData{
    id?: number;
    dateInfo:string,
    weekInfo:string,
    temperature:string,
    humidity:string,
    pm:string,
    status:string,
    objectId: string;
  }
  
  interface ParseResponse {
    results: any[];
  }

  @Injectable()
  export class WeatherDataService{

    weatherDataList:Array<WeatherData>;
    constructor(private httpclient:HttpClient,private http:Http) {}

    // loadWeatherData() {
    //     let url = "http://47.92.145.25:80/parse"+"/classes/WeatherData";
    //     let headers:HttpHeaders = new HttpHeaders();
    //     headers = headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");

    //     let options:any ={
    //     headers:headers
    //     };
    //     return this.http.get<ParseResponse>(url,options).subscribe(data=>{
    //     this.weatherDataList = data['results'];
    //     console.log(this.weatherDataList);
    //     });
    // }
    loadWeatherData() {
      return new Promise((resolve,reject)=>{
        let query = new Parse.Query("WeatherData",this.httpclient);
        return query.find().subscribe(data=>{
          this.weatherDataList = data;
          resolve(data);
        });
      })
    }
    sortWeatherData(type){
      if (type == "date") {
        this.weatherDataList.sort(function(a, b) {
          if (a.dateInfo > b.dateInfo) {
            return 1;
          }
          if (a.dateInfo < b.dateInfo) {
            return -1;
          }
        });
      } else if (type == "temperature") {
          this.weatherDataList.sort(function(a, b) {
          let compA : String;
          let compB : String;
          let numIdxA  : number = 1;
          let numIdxB  : number = 1;
          if (a.temperature != null && "-"!=a.temperature.substr(1,1)) {
            numIdxA = 2;
          }
          compA = a.temperature!=null?a.temperature.substr(0,numIdxA):"0";
          if (b.temperature != null && "-"!=b.temperature.substr(1,1)) {
            numIdxB = 2;
          }
          compB = b.temperature!=null?b.temperature.substr(0,numIdxB):"0";
          if (Number(compA) < Number(compB)) {          
            return -1;
          }
          if (Number(compA) > Number(compB)) {
            return 1;
          }
        });
      }
  
      console.log("sort Works!");
    }
  
    addWeatherData(weatherData){
      if(weatherData["dateInfo"]===""||weatherData["weekInfo"]===""){
        alert("请输入正确的日期信息");
        return;
      }
      let url = "http://47.92.145.25:80/parse"+"/classes/WeatherData";
      let headers:HttpHeaders = new HttpHeaders();

      headers = headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");
      let options :any ={
        headers:headers
      };

      if(!weatherData.objectId){
        // 新增用户
        this.httpclient.post(url,weatherData,options).subscribe(data=>{
          this.loadWeatherData();
        });
      }
      else {
        // 修改用户
        url = "http://47.92.145.25:80/parse"+"/classes/WeatherData/"+weatherData.objectId;
        delete weatherData["objectId"];
        delete weatherData["createdAt"];
        delete weatherData["updatedAt"];
        this.httpclient.put(url,weatherData,options).subscribe(data=>{
          this.loadWeatherData();
        });
      }
  
    }

    deleteByObjId(id){
      let url = "http://47.92.145.25:80/parse"+"/classes/WeatherData"+"/"+id;
      let headers:HttpHeaders = new HttpHeaders();
      headers = headers.set("Content-Type","application/json").set("X-Parse-Application-Id","dev").set("X-Parse-Master-Key","angulardev");
  
      let options:any ={
        headers:headers
      };
  
      this.httpclient.delete(url,options).subscribe(data=>{
        this.loadWeatherData();
      });
    }
  }
  
  