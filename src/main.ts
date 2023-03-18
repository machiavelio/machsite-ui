import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/core/entry-point/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
