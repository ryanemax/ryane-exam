import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

var ParseConfig = {
    applicationId:"dev",
    serverURL: "http://47.92.145.25:80/parse",
    headers:new Headers({
        "X-Parse-Application-Id":"dev",
        "X-Parse-Master-Key":"angulardev",
        // "X-Parse-Session-Token":"r:059bbbebdc201de090f16fe9716b43bf",
        "Content-Type":"application/json; charset=utf-8",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Methods",        
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":"true",
        "Access-Control-Allow-Methods":"GET, POST, PATCH, PUT, DELETE, OPTIONS",
    })
}

export namespace Parse {

    
    // export let applicationId: string;
    // export let javaScriptKey: string | undefined;
    // export let masterKey: string | undefined;
    // export let serverURL: string;
    // export let VERSION: string;

    export class HttpHandler{
        http:Http
        constructor(http:Http){
            this.http = http
        }
        extractData(res: Response) {
            let body = res.json();
            return body.results || [];
        }
        extractDataByOne(res: Response) {
            let body = res.json();
            return body || {};
        }
        handleHttpError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    }

/*
    * Parse.Query 查询类，继承自HttpHandler
    * @params className 对应数据类名 
    * @params http 传输组件中注入的http方法 
    * 使用方法参考
    let query = new Parse.Query("TeacherInfo",http)
    query.find().subscribe(data=>{
      console.log(data)
    })
*/

    export class Query extends HttpHandler{
        className:string
        _where:any = {}
        _limit:number
        _skip:number
        constructor(className:string,http:Http){
            super(http)
            this.className = className
        }
        // 查询条件
        equalTo(key,value){
            this._where[key] = value
        }
        limit(num){
            this._limit = num
        }
        skip(num){
            this._skip = num
        }
        // 查询方法
        find():Observable<any[]>{
            let url = ParseConfig.serverURL+"/classes/"+this.className
            let queryParams:Array<any> = []

            // 设置where
            let hasWhere = Object.keys(this._where).length            
            if(hasWhere){
                let param = "where="+JSON.stringify(this._where)
                queryParams.push(param)
            }
            // 设置limit
            if(this._limit){
                let param =  "limit="+this._limit
                queryParams.push(param)
            }

            // 打包查询条件
            if(queryParams.length>0){
                let paramString = ""
                queryParams.forEach((p,index)=>{
                    if(index==0){
                        paramString += p
                    }else{
                        paramString += "&"+p
                    }
                })
                url += "?" + paramString
            }
            console.log(url)


            url = encodeURI(url)
            return this.http.get(url,{
                headers: ParseConfig.headers,
                // withCredentials: true
            })
            .map(super.extractData)
            .catch(super.handleHttpError)
        }
        get(id):Observable<ParseObject>{
            let url = ParseConfig.serverURL+"/classes/"+this.className+"/"+id;
            console.log(url);
            return this.http.get(url,{
                headers: ParseConfig.headers
            })
            .map(super.extractDataByOne)
            .catch(super.handleHttpError)
        }
}


/*
    * Parse.Query 查询类，继承自HttpHandler
    * @params className 对应数据类名 
    * @params http 传输组件中注入的http方法 
    * 使用方法参考
    let query = new Parse.Query("TeacherInfo",http)
    query.find().subscribe(data=>{
      console.log(data)
    })
*/

    export class ParseObject extends HttpHandler{
        headers:Headers
        serverURL:string

        className:string
        createdAt:Date
        updatedAt:Date
        constructor(className:string,http:Http){
            super(http)
            this.className = className
            this.serverURL = ParseConfig.serverURL;
            this.headers = ParseConfig.headers;
            console.log("serverURL:",this.serverURL)
        }
        find():Observable<any[]>{
            let url = this.serverURL+"/classes/"+this.className
            return this.http.get(url,{
                headers: this.headers
            })
            .map(super.extractData)
            .catch(super.handleHttpError)
        }
}

    export function initialize(appId: string, sURL: string, javaScriptKey?: string, masterKey?: string): void{
        // this.CoreManager.APPLICATION_ID = applicationId
        // this.CoreManager.SERVER_URL = serverURL
        ParseConfig.applicationId = appId
        ParseConfig.serverURL = sURL
        if(javaScriptKey){
            this.CoreManager.set("JAVASCRIPT_KEY",javaScriptKey)
        }
        if(masterKey){
            this.CoreManager.set("APPLICATION_ID",masterKey)
        }
        return
    };

    interface IBaseObject {
        toJSON(): any;
        toPointer(): any;
    }

    class BaseObject implements IBaseObject {
        objectId:string
        createdAt:Date
        updateAt:Date
        public toJSON(){
            
        };
        public toPointer(){
            
        };
    }

    export class User extends BaseObject{
      
        static current():User|undefined{
            return
        };
        static signUp(username: string, password: string, attrs: any): Promise<User>{
            return
        };
        static logIn(username: string, password: string): Promise<User>{
            return
        };
        static logOut(): Promise<User>{
            return
        };
        static logInWith(provider:string,options:any): Promise<User>{
            return
        };
        static allowCustomUserClass(isAllowed: boolean): void{
            return
        };
        static become(sessionToken: string): Promise<User>{
            return
        };
        static requestPasswordReset(email: string): Promise<User>{
            return
        };
        static extend(protoProps?: any, classProps?: any): any{
            return
        };

        signUp(attrs: any): Promise<this>{
            return
        };
        logIn(): Promise<this>{
            return
        };
        authenticated(): boolean{
            return
        };
        isCurrent(): boolean{
            return
        };

        getEmail(): string | undefined{
            return
        };
        setEmail(email: string): boolean{
            return
        };

        getUsername(): string | undefined{
            return
        };
        setUsername(username: string): boolean{
            return
        };

        setPassword(password: string): boolean{
            return
        };
        getSessionToken(): string{
            return
        };  
    }


}