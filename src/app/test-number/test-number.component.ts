import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-test-number',
  templateUrl: './test-number.component.html',
  styleUrls: ['./test-number.component.scss']
})
export class TestNumberComponent {
  @Input() options: any;

  constructor() { }

  increase() {
    this.options.value++;
  }

  decrease() {
    if (this.options.value > 0) {
      this.options.value--;
    }
  }
}
