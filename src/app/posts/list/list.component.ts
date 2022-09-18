import { Component, OnInit } from "@angular/core";
import { IPost } from "../../shared/interfaces/post";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { IAppState, getAllPostsSelector } from "src/app/+store";
import { AllPosts } from "../../+store/posts/actions";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { constants } from "os";
import { Constants } from "src/app/constants";
import { _MAT_INK_BAR_POSITIONER } from "@angular/material";
import { PostService } from "../services/post.service";
import { element } from "protractor";

@Component({
  selector: "app-all-posts",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  allPosts$: Observable<IPost[]>;
  allPostss: IPost[] = [];
  personId: string = "";
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(queryParams => {
      this.personId = queryParams.get("personId");
      
      var url = Constants.posts + "listOfPosts";
      
      var payload = new FormData();
      
      payload.append("personId", this.personId);

      this.http.post<any[]>(url, payload).subscribe(resp => {

        if (resp["status"]) {
          resp["data"]["postData"].forEach(element => {
            var post = {
              id: element.id, 
              title: element.title,
              description: element.desc, 
              likes: element.likes, 
              createdOn: new Date(element.created),
              dislikes: 0,
              createdByName: resp["data"]["person_name"],
              createdById: this.personId,
              avatar: resp["data"]["person_pic"]
            };
            this.allPostss.push(post);
          });

          this.allPosts$ = of(this.allPostss);
        } else {
          console.log("Failed ", resp["data"]["error"]);
        }
      });
    });
  }

  checkCount() {
    if (this.allPostss.length == 0)
      return true;
  }
  
}


