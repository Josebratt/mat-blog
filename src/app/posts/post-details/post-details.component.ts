import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post | undefined;

  time: any;
  fecha: any;

  editing: boolean = false;

  constructor( 
    public authServices: AuthService,
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
        this.time = data?.published;
        this.fecha = new Date(this.time)

        this.post = data; 
        this.post!.published = this.fecha;
      }
    )
  }

  update() {
    const formData = {
      title: this.post?.title,
      content: this.post?.content
    };
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.updatePost(id!, formData);
    this.editing = false;
  }

  delete(id: string, image: string) {
    this.postService.deletePost(id, image);
    this.router.navigate(['/blog']);
  }

}
