import { Component, OnInit } from "@angular/core";
import { IPost } from "../../shared/interfaces/post";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { IAppState, getPostDetailSelector } from "src/app/+store";
import { Store } from "@ngrx/store";
import { PostDetail } from "src/app/+store/posts/actions";
import { HttpClient } from "@angular/common/http";
import { Constants } from "src/app/constants";

@Component({
  selector: "app-details",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  post$: Observable<IPost>;
  personId: Observable<string>;
  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    const postId: string = this.activateRoute.snapshot.params.id;
    this.personId = of(this.activateRoute.snapshot.params.personId);

    var url = Constants.posts + "Post/" + postId;

    this.http.get<any>(url).subscribe(resp => {
      if (resp) {
        this.post$ = of({
          id: resp["id"],
          title: resp["title"],
          description: resp["desc"],
          createdOn: resp["created"],
          likes: resp["likes"],
          dislikes: 0,
          imgName: "",
          imageLink: "",
          createdByName: resp["owner"]["person_name"],
          createdById: resp["owner"]["person_id"],
          avatar: resp["owner"]["person_pic"],
        });
      }
    });
  }
}
