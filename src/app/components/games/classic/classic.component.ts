import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import { HelperService } from '../../../helper.service';
import { GameInterface } from '../game.interface';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
    UP_ARROW = 38,
    DOWN_ARROW = 40,
}

const EMPTY = 0;

@Component({
    selector: 'classic-game',
    templateUrl: './classic.component.html',
    styleUrls: ['./classic.component.css']
})
export class ClassicComponent implements GameInterface {
    field: any[];
    prevField: any[] = null;
    @Input('size') dimension: number = 4;
    @Output() gameOverEvent: EventEmitter<any> = new EventEmitter<any>();

    touchX: number = 0;
    touchY: number = 0;

    constructor(helper: HelperService) {
        this.initGame();
    }

    initGame(): void {
        this.prevField = null;
        this.field = [];

        for (let i = 0; i < this.dimension; i++) {
            let str: number[] = [];

            for (let j = 0; j < this.dimension; j++) {
                str.push(EMPTY);
            }

            this.field.push(str);
        }

        this.addNewElement(this.getEmptyCells());

        // ONLY FOR DEBUG !!!!
        // this.field = [
        //     [2, 4, 8, 16],
        //     [32, 64, 128, 256],
        //     [512, 1024, 2048, 4096],
        //     [8192, 16384, 32768, 65536]
        // ];
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if ([KEY_CODE.LEFT_ARROW, KEY_CODE.RIGHT_ARROW, KEY_CODE.UP_ARROW, KEY_CODE.DOWN_ARROW].includes(event.keyCode)) {
            let isMoved = this.moveCells(event.keyCode);

            if (isMoved) {
                let emptyCells = this.getEmptyCells();

                if (emptyCells.length) {
                    this.addNewElement(emptyCells);
                }
            }

            if (this.isGameOver()) {
                this.gameOverEvent.emit(true);
            }
        }
    }

    @HostListener('window:touchstart', ['$event'])
    touchstartEvent(event: TouchEvent) {
        this.touchX = event.changedTouches[0].pageX;
        this.touchY = event.changedTouches[0].pageY;
    }

    @HostListener('window:touchend', ['$event'])
    touchendEvent(event: TouchEvent) {
        let direction: any = null,
            diffX = event.changedTouches[0].pageX - this.touchX,
            diffY = event.changedTouches[0].pageY - this.touchY;

        if (diffX && diffY) {
            if (Math.abs(diffX) > Math.abs(diffY)) {
                direction = diffX > 0 ? KEY_CODE.RIGHT_ARROW : KEY_CODE.LEFT_ARROW;
            } else {
                direction = diffY > 0 ? KEY_CODE.DOWN_ARROW : KEY_CODE.UP_ARROW;
            }

            if (direction) {
                let isMoved = this.moveCells(direction);

                if (isMoved) {
                    let emptyCells = this.getEmptyCells();

                    if (emptyCells.length) {
                        this.addNewElement(emptyCells);
                    }
                }
            }
        }
    }

    getEmptyCells(): any[] {
        let result: any[] = [];

        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                if (this.field[i][j] === EMPTY) {
                    result.push([i, j]);
                }
            }
        }

        return result;
    }

    addNewElement(emptyCells: any[]): void {
        let forAdd = HelperService.getRandomInt(0, emptyCells.length - 1);
        this.field[emptyCells[forAdd][0]][emptyCells[forAdd][1]] = HelperService.getRandomInt(1, 6) === 1 ? 4 : 2;
    }

    // TODO
    isGameOver(): boolean {
        let result = true;

        for (let i = 0; i < this.dimension && result; i++) {
            for (let j = 0; j < this.dimension && result; j++) {
                if (this.field[i][j] === EMPTY
                    || (i + 1 < this.dimension && this.field[i][j] === this.field[i + 1][j])
                    || (j + 1 < this.dimension && this.field[i][j] === this.field[i][j + 1]))
                {
                    result = false;
                }
            }
        }

        return result;
    }

    moveCells(dimension: number): boolean {
        this.prevField = Object.assign([], this.field);
        let isMoved = false;

        if (dimension === KEY_CODE.UP_ARROW || dimension === KEY_CODE.DOWN_ARROW) {
            this.field = HelperService.transposeMatrix(this.field);
        }

        for (let i = 0; i < this.dimension; i++) {
            let newStr: number[] = [],
                addStr: number[] = [];

            if (dimension === KEY_CODE.RIGHT_ARROW || dimension === KEY_CODE.DOWN_ARROW) {
                this.field[i] = this.field[i].reverse();
            }

            for (let j = 0; j < this.dimension; j++) {
                if (this.field[i][j] != EMPTY) {
                    newStr.push(this.field[i][j]);
                }
            }

            for (let j = 0; j < newStr.length; j++) {
                if (newStr[j] !== EMPTY) {
                    if (j !== newStr.length && newStr[j + 1] === newStr[j]) {
                        addStr.push(newStr[j] + newStr[j + 1]);
                        newStr[j + 1] = EMPTY;
                    } else {
                        addStr.push(newStr[j])
                    }
                }
            }

            addStr = addStr.concat(HelperService.generateEmptyArray(Math.abs(addStr.length - this.dimension)));

            if (!HelperService.isEqualArrays(this.field[i], addStr)) {
                isMoved = true;
            }

            this.field[i] = addStr;

            if (dimension === KEY_CODE.RIGHT_ARROW || dimension === KEY_CODE.DOWN_ARROW) {
                this.field[i] = this.field[i].reverse();
            }
        }

        if (dimension === KEY_CODE.UP_ARROW || dimension === KEY_CODE.DOWN_ARROW) {
            this.field = HelperService.transposeMatrix(this.field);
        }

        return isMoved;
    }

    undo(): void {
        if (this.prevField) {
            this.field = Object.assign([], this.prevField);
            this.prevField = null;
        }
    }
}
