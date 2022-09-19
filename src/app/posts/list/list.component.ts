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
  personId: string = "";
  pageType: string = "wall";
  postCount = 0;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(queryParams => {
      this.personId = queryParams.get("personId");
      
      this.getPosts();
      
    });
  }

  getPosts() {
    var allPostss = [];
    var url = Constants.posts + "listOfPosts";
      
    var payload = new FormData();
    
    payload.append("personId", this.personId);
    payload.append("pageType", this.pageType);

    this.http.post<any[]>(url, payload).subscribe(resp => {

      if (resp["status"]) {
        resp["data"]["postData"].forEach(element => {
          var post = {
            id: element.post.id, 
            title: element.post.title,
            description: element.post.desc, 
            likes: element.post.likes, 
            createdOn: new Date(element.post.created),
            dislikes: 0,
            createdByName: element.postOwner.person_name,
            createdById: element.post.owner,
            avatar: element.postOwner.person_pic
          };
          allPostss.push(post);
        });
        this.postCount = allPostss.length;
        this.allPosts$ = of(allPostss);
      } else {
        console.log("Failed ", resp["data"]["error"]);
      }
    });
  }

  checkCount() {
    if (this.postCount == 0)
      return true;
  }

  pageTypeChanged(value) {
    this.pageType = value;

    this.getPosts();
  }
  
}


