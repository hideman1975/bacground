import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TestInputComponent } from './test-input/test-input.component';
import { TestNumberComponent } from './test-number/test-number.component';
import { TestCheckboxComponent } from './test-checkbox/test-checkbox.component';
import { TestSelectComponent } from './test-select/test-select.component';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('container', { read: ViewContainerRef }) viewRef!: ViewContainerRef;

  widgets: ComponentRef<TestInputComponent | TestCheckboxComponent | TestNumberComponent | TestSelectComponent>[] = [];
  formResult: any = {};
  clearJson: Array<any> = [];
  json: Array<any> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  load() {
    this.getData('././assets/data/form-config.json').subscribe(data => {
      this.json = data;
      this.clearJson = JSON.parse(JSON.stringify(this.json));
      this.renderWidgets();
    })
  }

  renderWidgets() {
    this.json.forEach((item: any, index) => {
      item.index = index;
      switch (item.type) {
        case 'text':
          let textRef!: ComponentRef<TestInputComponent>;
          textRef = this.viewRef.createComponent(TestInputComponent);
          textRef.setInput('options', item);
          this.widgets.push(textRef);
          break;
        case 'checkbox':
          let checkRef!: ComponentRef<TestCheckboxComponent>;
          checkRef = this.viewRef.createComponent(TestCheckboxComponent);
          checkRef.setInput('options', item);
          this.widgets.push(checkRef);
          break;
        case 'number':
          let numberRef!: ComponentRef<TestNumberComponent>;
          numberRef = this.viewRef.createComponent(TestNumberComponent);
          numberRef.setInput('options', item);
          this.widgets.push(numberRef);
          break;
        case 'select':
          let selectRef!: ComponentRef<TestSelectComponent>;
          selectRef = this.viewRef.createComponent(TestSelectComponent);
          selectRef.setInput('options', item);
          this.widgets.push(selectRef);
          break;
        default: return;
      }
    })
  }

  clear() {
    this.json = JSON.parse(JSON.stringify(this.clearJson))
    this.viewRef.clear();
    setTimeout(() => { this.load() }, 1000)
  }

  submit() {
    this.widgets.forEach(item => {
      switch (item.instance.options.type) {
        case 'text': this.formResult[item.instance.options.field] = item.instance.options.items;
          break;
        case 'select': this.formResult[item.instance.options.field] = item.instance.options.selectedOptions;
          break;
        case 'checkbox': this.formResult[item.instance.options.field] = item.instance.options.checks;
          break;
        case 'number': this.formResult[item.instance.options.field] = item.instance.options.value;
          break;
        default: return;
      }
    })

    console.log('Sent to server:', this.formResult);
    this.clear();
  }
}
