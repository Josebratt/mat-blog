import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post> | undefined;

  constructor( private afs: AngularFirestore, private afStorage: AngularFireStorage) {
    this.postCollection = this.afs.collection('posts', ref => ref.orderBy('published', 'desc'));
   }

   // obtenemos la informacion y el id de la coleccion (posts)
   getPost(){
     return this.postCollection.snapshotChanges().pipe(
       map( actions => {
         return actions.map( a => {
           const data = a.payload.doc.data() as Post;
           const id = a.payload.doc.id;
           return {id, ...data}
         })
       })
     )
   }

   // obtenemos el id del post y retornamos el valor
   getPostDetails(id: string){
     this.postDoc = this.afs.doc<Post>(`posts/${id}`);
     return this.postDoc.valueChanges();
   }

   // guardamos la data creada
   createPost(post: Post){
     this.postCollection.add(post);
   }

   // obtenemos el id que deseamos eliminar
   getPostById(id: string){
     return this.afs.doc<Post>(`posts/${id}`);
   }

   // eliminamos el post, asi como la imagen
   deletePost(id: string, image: string){
    const imageStorage = this.afStorage.storage.refFromURL(image!)
    imageStorage.delete().then(
      () => console.log('File Deleted') 
    ).catch( error => console.log(error)
    );
    return this.getPostById(id).delete();
   }

   // 
   updatePost(id: string, formData: Partial<Post>){
     return this.getPostById(id).update(formData);
   }

}
