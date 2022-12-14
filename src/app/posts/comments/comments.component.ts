import { Component, OnInit, Input } from "@angular/core";
import { IComment } from "../../shared/interfaces/comment";
import { IPost } from "../../shared/interfaces/post";
import { AuthService } from "../../auth/services/auth.service";
import { Observable, of } from "rxjs";
import { DocumentData } from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { IAppState, getCommentsSelector } from "src/app/+store";
import { PostComments, AddComment } from "../../+store/posts/actions";
import { ActivatedRoute } from "@angular/router";
import { Constants } from "src/app/constants";
import { HttpClient } from "@angular/common/http";
import { constants } from "os";
import { AuthServicePerson } from "src/app/auth/services/auth.service_person";
import { SignInComponent } from "src/app/auth/sign-in/sign-in.component";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input() post: IPost;
  @Input() personId: string;
  allCommentss: Observable<any[]>;
  // @Input() newCmt: Observable<any> = of({});

  cmts: any[] = [];

  constructor(
    private authService: AuthServicePerson,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {

    var url = Constants.posts + "getCommentsForPost/" + this.post.id;

    this.http.get<any[]>(url).subscribe(resp => {
      this.cmts = []
      resp.forEach(i => {
        var cmd = {
          "id": i["id"],
          "cmd": i["cmd"],
          "personId": i["owner"]["id"],
          "person_name": i["owner"]["person_name"],
          "person_pic": i["owner"]["person_pic"],
        }
        this.cmts.push(cmd);
      });
      this.allCommentss = of(this.cmts);
    });
    
    // this.newCmt.subscribe(cmdObj => {
    //   this.cmts.push(cmdObj);
    //   this.allCommentss = of(this.cmts);
    // });
  }

  addComment(form: NgForm) {
    // const comment: IComment = {
    //   id: Math.random().toString(),
    //   avatar: this.authService.userData.avatar,
    //   content: form.value.comment,
    //   createdBy: this.authService.userData.name,
    //   createdOn: new Date(),
    //   likes: 0,
    //   dislikes: 0
    // };
    var url = Constants.posts + "comment";

    var payload = new FormData();

    payload.append("cmd", form.value.comment);
    payload.append("userid", this.personId);
    payload.append("post", this.post.id);

    this.http.post(url, payload).subscribe(resp => {
      if (!resp["status"]) {
        console.log("error on comment");
      }
      else {
        this.cmts.push({
          "id": resp["data"]["id"],
          "person_pic": resp["data"]["pic"],
          "person_name": resp["data"]["first_name"],
          "personId": this.personId,
          "cmd": form.value.comment,
        });
        this.allCommentss = of(this.cmts);
      }
    });
  }
}
