import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "../layout/layout-page/layout-page.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutPageComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("../../pages/home/components/home-page/home-page.component").then((m) => m.HomePageComponent),
      },
      {
        path: "library",
        loadComponent: () =>
          import("../../pages/library/components/library-page/library-page.component").then(
            (m) => m.LibraryPageComponent,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
