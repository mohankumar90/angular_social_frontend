import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { DetailComponent } from "./detail/detail.component";
import { CreateComponent } from "./create/create.component";
import { AuthGuard } from "../shared/guards/auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "list" },
  { path: "list/:personId", component: ListComponent },
  { path: "create", component: CreateComponent },
  { path: ":id/person/:personId", component: DetailComponent }
];

export const PostRoutingModule = RouterModule.forChild(routes);
