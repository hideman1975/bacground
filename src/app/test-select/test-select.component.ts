import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-select',
  templateUrl: './test-select.component.html',
  styleUrls: ['./test-select.component.scss']
})
export class TestSelectComponent {
  @Input() options: any = [];

  isDropdownActive: boolean = false;
  zIndex: number = 500;

  ngOnInit() {
    this.zIndex = 500 - this.options.index;
  }
}
