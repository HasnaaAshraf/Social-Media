import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../../shared/services/comments/comments.service';
import { IComment } from '../../../../shared/interfaces/i-comment';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-one-comment',
  standalone: true,
  imports: [DatePipe,ReactiveFormsModule],
  templateUrl: './one-comment.component.html',
  styleUrl: './one-comment.component.scss'
})
export class OneCommentComponent {

  private readonly _CommentsService = inject(CommentsService)

  @Input({required:true}) pId !:string


  commentGroup !:FormGroup

  commentList:IComment[]=[]

  ngOnInit(): void {

    this.commentGroup = new FormGroup({
      content:new FormControl (null),
      post:new FormControl(this.pId)
    })

    this._CommentsService.getPostComment(this.pId).subscribe({
      next:(res)=>{
        console.log(`postId, ${this.pId}`,res.comments);
        this.commentList = res.comments.reverse()
      }
    })
  }

  sendComment():void
  {
    this._CommentsService.createComment(this.commentGroup.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.commentList = res.comments.reverse(), // To show comment at the end not at start
        this.commentGroup.get('content')?.reset() //To show code in comment
      }
    })

  }
}
