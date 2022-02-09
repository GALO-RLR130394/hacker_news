import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavesService {
  public currentPostSubject: BehaviorSubject<any>;
  public currentPost: Observable<string>;
  constructor() {
    this.currentPostSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("faves") || "[]"));
    this.currentPost = this.currentPostSubject.asObservable();
  }

  public get currentPostValue(): string {
    return this.currentPostSubject.value;
  }

  savePost(post:any) {
    let posts=JSON.parse(localStorage.getItem("faves") || "[]");
    if( posts?.find(
      (postP:any)=>
      postP.objectID==post.objectID)==undefined){
        posts?.push(post);
        localStorage.setItem('faves', JSON.stringify(posts));
        this.currentPostSubject.next(posts);
     }else{}
  }
}
