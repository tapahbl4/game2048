import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'choose',
    templateUrl: './choose.component.html',
    styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {
    @Output('chooseGameMode') gameMode: EventEmitter<any> = new EventEmitter<any>();
    size: number = 4;

    constructor() { }

    ngOnInit() {
    }

    selectMode(mode: string) {
        this.gameMode.emit({
            mode: mode,
            size: this.size
        });
    }
}
