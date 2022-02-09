import { Component, OnInit } from '@angular/core';
//Services
import { NewsService } from '../services/news.service';
import { FavesService } from '../services/faves.service';
//Models
import { Post } from '../models/post';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})

export class NewsListComponent implements OnInit {
  posts: Post[]=[]
  post: Post= new Post().deserialize({})

  selectedFrame:any='';
  favePosts:any=[]
  isFaves:boolean=false;
  //pagination
  page:number=1;
  previousPage:any;
  pageSize:number=10;
  collectionSize:number=0;
  
  constructor(
    private newsService:NewsService,
    private favesService:FavesService
    ) { }
  
  ngOnInit(): void {
    let selectedFrame=localStorage.getItem("selectedFrame");
    //console.log(selectedFrame)
    if(selectedFrame!==null){
      this.selectedFrame=selectedFrame;
    }else{
      this.selectedFrame='angular';
    }
    this.getNews();
    this.getFavePost();
  }

  getNews():void {
    let page=this.page-1;
    //console.log(page)
    this.newsService.getNews(this.selectedFrame,page).subscribe((data:any)=>{
     
      this.pageSize=data.hitsPerPage;
      this.collectionSize=data.hitsPerPage*data.nbPages;
      //If data not exist.. Discard! 
      this.posts=data.hits.filter((post:Post)=>
        post.author !== null &&
        post.story_title !== null &&
        post.story_url !== null &&
        post.created_at !== null
      );
      this.isFaves=false;
      this.getFavePost();
    })
  }

  getFavePost():void {
    this.posts=this.posts.map((post:Post)=>{
        post=new Post().deserialize(post);
        this.favePosts=this.favesService.currentPostValue;
        if( this.favePosts?.find(
            (postP:Post)=>
            postP.objectID==post.objectID)!==undefined){
          post.likePost(true);
        }else{
          post.likePost(false);
        }
        return post
      });
  }

  myFaves():void {
    let favePosts:any=this.favesService.currentPostValue;
    this.posts=favePosts;
    this.pageSize=10;
    this.collectionSize=this.posts.length;
    this.isFaves=true;
  }

  likePost(index:number):void {
    let post=this.posts[index];
    post.fave=true;
    this.favesService.savePost(post);
    this.getFavePost();
  }

  filterQuery(event:Event):void {
    this.selectedFrame = (event.target as HTMLInputElement).value;
    localStorage.setItem('selectedFrame', this.selectedFrame);
    //console.log(this.selectedFrame)
    this.getNews();
  }

  loadPage(page: number):void {
    //console.log(this.page)
    if (page !== this.previousPage) {
      this.previousPage = page;
      if(!this.isFaves){
        this.getNews();
      }
    }
  }

  removeCache():void {
    localStorage.removeItem('faves');
    localStorage.removeItem('selectedFrame');
    alert('Cache Removed')
    window.location.reload();
  }
}
