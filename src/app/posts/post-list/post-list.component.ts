import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor( 
    public authServices: AuthService,
    private postServices: PostService) { 
    this.posts = this.postServices.getPost(); 
   
  }

  ngOnInit(): void {
    
  }

  delete(id: string, image: string) {
    this.postServices.deletePost(id, image);
  }

  

}
