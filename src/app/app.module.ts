import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HelperService } from "./helper.service";
import { ChooseComponent } from './components/control/choose/choose.component';
import { ClassicComponent } from './components/games/classic/classic.component';
import { OverlayComponent } from "./components/control/overlay/overlay.component";


@NgModule({
    declarations: [
        AppComponent,
        ChooseComponent,
        ClassicComponent,
        OverlayComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [HelperService],
    bootstrap: [AppComponent]
})
export class AppModule { }
