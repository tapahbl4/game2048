import { Injectable } from '@angular/core';

const EMPTY = 0;

@Injectable()
export class HelperService {
    static generateEmptyArray(length: number): number[] {
        let arr: number[] = [];

        for (let i = 0; i < length; i++) {
            arr.push(EMPTY);
        }

        return arr;
    }

    static transposeMatrix(matrix: any[]): any[] {
        let newMatrix: any[] = [];
        let len = matrix.length;

        for (let i = 0; i < len; i++) {
            let str: number[] = [];

            for (let j = 0; j < len; j++) {
                str.push(matrix[j][i]);
            }

            newMatrix.push(str);
        }

        return newMatrix;
    }

    static isEqualArrays(array1: any[], array2: any[]): boolean {
        let isEqual: boolean = true;

        if (array1.length !== array2.length) {
            isEqual = false;
        } else {
            for (let i = 0; i < array1.length && isEqual; i++) {
                if (array1[i] !== array2[i]) {
                    isEqual = false;
                }
            }
        }

        return isEqual;
    }

    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
