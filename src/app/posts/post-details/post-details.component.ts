import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post | undefined;

  constructor( 
    private postService: PostService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPost();
    console.log(this);
    
  }

  getPost(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return this.postService.getPostDetails(id!).subscribe(
      data => this.post = data
    )
  }

}
