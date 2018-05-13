import { Component, HostListener } from '@angular/core';
import { HelperService } from "./helper.service";

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
    UP_ARROW = 38,
    DOWN_ARROW = 40,
}

const EMPTY = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    field: any[];
    dimension: number = 4;

    constructor(helper: HelperService) {
        this.initApp();
    }

    initApp(): void {
        this.field = [];

        for (let i = 0; i < this.dimension; i++) {
            let str: number[] = [];

            for (let j = 0; j < this.dimension; j++) {
                str.push(EMPTY);
            }

            this.field.push(str);
        }

        this.addNewElement(this.getEmptyCells());
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if ([KEY_CODE.LEFT_ARROW, KEY_CODE.RIGHT_ARROW, KEY_CODE.UP_ARROW, KEY_CODE.DOWN_ARROW].indexOf(event.keyCode) !== -1) {
            let isMoved = this.moveCells(event.keyCode);

            if (isMoved) {
                let emptyCells = this.getEmptyCells();

                if (emptyCells.length) {
                    this.addNewElement(emptyCells);
                }
            }

            // if (this.isGameOver()) {
            //     console.log('game over');
            // }
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
        let result = false;

        for (let i = 0; i < this.dimension && !result; i++) {
            for (let j = 0; j < this.dimension && !result; j++) {
                let siblings: any[] = [];

                if (i > 0) {
                    siblings.push(this.field[i - 1][j]);
                }

                if (j > 0) {
                    siblings.push(this.field[i][j - 1]);
                }

                if (i < this.dimension) {
                    siblings.push(this.field[i + 1][j]);
                }

                if (j < this.dimension) {
                    siblings.push(this.field[i][j + 1]);
                }

                if (siblings.indexOf(this.field[i][j]) === -1 && this.field[i][j] !== EMPTY) {
                    result = true;
                }
            }
        }

        return result;
    }

    moveCells(dimension: number): boolean {
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
}
