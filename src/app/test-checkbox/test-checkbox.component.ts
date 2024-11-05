import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-test-checkbox',
  templateUrl: './test-checkbox.component.html',
  styleUrls: ['./test-checkbox.component.scss']
})
export class TestCheckboxComponent {
  @Input() options: any;

  check(item: any) {
    item.checked = !item.checked;
  }
}
