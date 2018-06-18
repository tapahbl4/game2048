import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
    isVisible: boolean = false;
    isVisibleCancelButton: boolean = false;
    title: string = '';
    message: string = '';

    @Output('isOkClicked')
    isOkClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output('isCancelClicked')
    isCancelClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    show(title: string, message: string, isVisibleCancelButton: boolean = false) {
        this.title = title;
        this.message = message;
        this.isVisible = true;
        this.isVisibleCancelButton = isVisibleCancelButton;
    }

    private okClickTrigger(event) {
        this.isVisible = false;
        this.isOkClicked.emit(true);
    }

    private cancelClickTrigger(event) {
        this.isVisible = false;
        this.isCancelClicked.emit(true);
    }
}
