import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  title: string = '';
  image: string | undefined = '';
  content: string = '';

  textButton: string = 'Create Post';

  uploadPercent: Observable<number | undefined> | undefined;
  downloadURL!: Observable<string | undefined>;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private afStorage: AngularFireStorage,
    private route: Router
    ) { }

  ngOnInit(): void {
    
  }

  create(){
    const data = {
      title: this.title,
      content: this.content,
      image: this.image,
      published: Date.now(),
      author: this.authService.authState.displayName
    }
    this.postService.createPost(data);
    this.route.navigate(['/blog']);

    this.title = '';
    this.content = '';
    this.image = '';

    this.textButton = 'Post Created';

    setTimeout(() => {
      this.textButton = 'Create Post'
    }, 3000);
  }

  uploadImage($event: any){
    let file = $event.target.files[0];
    const filePath = `posts/${file.name}`;
    const fileRef = this.afStorage.ref(filePath);

    if (file.type.split('/')[0] !== 'image') {
      return alert('Only image files');
    } else {
      const task = this.afStorage.upload(filePath, file);
      // observe percentage changes
      this.uploadPercent = task.percentageChanges()
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(
          () => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => this.image = url);
          }
        )
      )
      .subscribe()

      console.log('image uploaded!');

      file = new File([""], "filename");
      
      
    }
  }

}
