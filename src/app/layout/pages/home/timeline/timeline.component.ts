import { Component, inject } from '@angular/core';
import { PostsService } from '../../../../shared/services/posts/posts.service';
import { Iposts } from '../../../../shared/interfaces/iposts';
import { DatePipe } from '@angular/common';
import { OneCommentComponent } from '../../../Additions/oneComment/one-comment/one-comment.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DatePipe,OneCommentComponent,FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

 private readonly _PostsService = inject(PostsService)

 postList: Iposts[] = []

 savedFile !: File;

 content : string = '';

  ngOnInit(): void {
   this._PostsService.getAllPosts().subscribe({
    next:(res)=>{
      console.log(res.posts);
      this.postList = res.posts
    },
    error:(err)=>{
      console.log(err);  
    }
   })
  }


  changeImage(e:Event):void{
    const input = e.target as HTMLInputElement
   if (input.files && input.files.length > 0) {
    this.savedFile = input.files[0]
   }
  }

  createPost():void{
    const FormDataa = new FormData()
    FormDataa.append('body' , this.content);
    FormDataa.append('image' , this.savedFile);
    this._PostsService.createPost(FormDataa).subscribe({
      next:(res)=>{
        alert("Post Added Sucessfully")
      },
      error:(errr)=>{
        console.log(errr);
      }
    })
  }

}
