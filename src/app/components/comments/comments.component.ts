import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../model/comment";
import {CommentService} from "../../service/comment.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() id: number = 0;
  comments: Comment[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentService.getComments(this.id)
      .subscribe(comments => this.comments = comments);
  }
}
