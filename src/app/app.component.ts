import {Component, EventEmitter, HostListener, Input, ViewChild} from '@angular/core';
import { HelperService } from './helper.service';
import {OverlayComponent} from './components/control/overlay/overlay.component';
import {ClassicComponent} from './components/games/classic/classic.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    chooseScreen = true;

    gameMode = '';
    size: number;
    @ViewChild('overlayComponent') overlay: OverlayComponent;
    @ViewChild('classicGameComponent') classicGame: ClassicComponent;

    constructor(helper: HelperService) {
        //
    }

    setGameMode(gameInfo) {
        this.gameMode = gameInfo.mode;
        this.size = gameInfo.size;

        this.chooseScreen = false;
    }

    eventTrigger(event, type: string) {
        switch (type) {
            case 'gameOver':
                this.overlay.show('Game Over', 'Try again?', true);
                break;

            case 'gameOverOk':
                this.restart();
                break;

            case 'gameOverCancel':
                this.chooseScreen = true;
                break;
        }
    }

    restart() {
        if (this.gameMode === 'classic') {
            this.classicGame.initGame();
        }
    }
}
