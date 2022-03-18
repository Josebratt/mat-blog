import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post | undefined;

  // time!: Timestamp<any | undefined>;

  constructor( 
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getPost();         
  }

  getPost() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return this.postService.getPostDetails(id!).subscribe(
      data => {
        this.post = data; 
        // this.time = data?.published
      }
    )
  }

  update() {
    const formData = {
      title: this.post?.title,
      content: this.post?.content
    };
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.updatePost(id!, formData)
  }

}
