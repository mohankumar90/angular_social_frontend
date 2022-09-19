import { Component, Input, OnInit } from "@angular/core";
import { UploadService } from "../services/upload.service";
import { Upload } from "../../shared/models/file";
import { PostService } from "../services/post.service";
import { IPost } from "../../shared/interfaces/post";
import { MatSnackBar } from "@angular/material";
import { AuthService } from "../../auth/services/auth.service";
import { IUser } from "../../shared/interfaces/user";
import { IAppState } from "src/app/+store";
import { Store } from "@ngrx/store";
import { CreatePost } from "src/app/+store/posts/actions";
import { Constants } from "src/app/constants";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-create-post",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent {
  currentUpload: Upload;
  private _selectedFiles: FileList;
  private _isUpload: boolean = false;
  private _userData: IUser;

  @Input() personId: string;

  constructor(
    private uploadService: UploadService,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this._userData = this.authService.userData;
  }

  // Create post
  createPost(title, description) {
    var url = Constants.posts + "createPost";
    
    var payload = new FormData();
      
    payload.append("title", title);
    payload.append("desc", description);
    payload.append("userid", this.personId);

    this.http.post(url, payload).subscribe(resp => {
      if (resp["status"]) {
        console.log("created post");
        window.location.reload();
      } else {
        console.log("failed to create post");
      }
    });
  }

  // Detect file when is selected
  detectFiles(event) {
    this._selectedFiles = event.target.files;
  }

  // Upload file to Firebase Storage
  uploadSingle() {
    if (!this._selectedFiles) {
      this.snackbar.open("Please select file", "Undo", {
        duration: 3000
      });
      return;
    }
    this._isUpload = true;
    const file = this._selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.publishUpload(this.currentUpload);
  }
}
