import {Component, HostListener, Input} from '@angular/core';
import { HelperService } from "./helper.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isVisibleOverlay: boolean = false;
    isVisibleOverlayCancelButton: boolean = false;
    overlayTitle: string = '';
    overlayMessage: string = '';

    chooseScreen: boolean = true;

    gameMode: string = '';
    size: number;

    constructor(helper: HelperService) {

    }

    showOverlay(title: string, message: string, isVisibleCancelButton: boolean = false) {
        this.overlayTitle = title;
        this.overlayMessage = message;
        this.isVisibleOverlay = true;
        this.isVisibleOverlayCancelButton = isVisibleCancelButton;
    }

    setGameMode(gameInfo){
        this.gameMode = gameInfo.mode;
        this.size = gameInfo.size;

        this.chooseScreen = false;
        console.log(gameInfo);
    }
}
