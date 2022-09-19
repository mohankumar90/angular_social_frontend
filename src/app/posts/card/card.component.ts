import { Component, Input, ViewChild, ElementRef, Output } from "@angular/core";
import { IPost } from "../../shared/interfaces/post";
import { Router, ActivatedRoute } from "@angular/router";
import { IUser } from "../../shared/interfaces/user";
import { AuthService } from "../../auth/services/auth.service";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/+store";
import { LikeDislikePost, DeletePost } from "src/app/+store/posts/actions";
import { Constants } from "src/app/constants";
import { HttpClient } from "@angular/common/http";
import * as internal from "assert";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent {
  @Input() post: IPost;
  @Input() personId: string;
  @ViewChild("like", { static: false }) like: ElementRef;
  @ViewChild("dislike", { static: false }) dislike: ElementRef;

  @Input() likeCnt: number;
  private userData: IUser;
  isDetailPage = !!this.activatedRoute.snapshot.params.id;
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) {
    this.userData = this.authService.userData;
  }

  get isAuthor() {
    if (!this.userData) {
      return false;
    }
    return this.userData.id === this.post.createdById;
  }

  likePost(postId, personId) {
    var url = Constants.posts + "like";
      
    var payload = new FormData();
      
    payload.append("person", personId);
    payload.append("post", postId);

    this.http.post<any>(url, payload).subscribe(resp => {
      if (resp["status"]) {
        console.log(resp["data"]["likes"]);
        this.likeCnt = resp["data"]["likes"];
      }
    });
  }

  getDetails(postId: string, personId: string) {
    this.router.navigate(["post", postId, "person", personId]);
  }

  deletePost() {
    // this.store.dispatch(new DeletePost(this.post));
  }
}
