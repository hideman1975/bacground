import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-input',
  templateUrl: './test-input.component.html',
  styleUrls: ['./test-input.component.scss']
})
export class TestInputComponent {
  @Input() options: any = {
    label: 'Группа полей',
    placeholder: 'введите значение',
    validationMessage: 'Не должно быть пустым',
    items:  [{ id: 0, value: '' }]
  };

  counter: number = 0;

  addItem() {
    this.counter++;
    this.options.items.push({id: this.counter, value: ''})
  }

  removeItem(item: any) {
    if (this.options.items.length > 1) {
      this.options.items = this.options.items.filter((it: any) => it.id !== item.id)
    }
  }
}
