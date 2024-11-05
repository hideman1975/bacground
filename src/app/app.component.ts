import { Component, ComponentRef, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit } from '@angular/core';
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
      if (item.type === 'text') {
        let inputRef!: ComponentRef<TestInputComponent>;
        inputRef = this.viewRef.createComponent(TestInputComponent);
        inputRef.setInput('options', item)
        this.widgets.push(inputRef)
      } else if (item.type === 'checkbox') {
        let inputRef!: ComponentRef<TestCheckboxComponent>;
        inputRef = this.viewRef.createComponent(TestCheckboxComponent);
        inputRef.setInput('options', item)
        this.widgets.push(inputRef)
      } else if (item.type === 'number') {
        let inputRef!: ComponentRef<TestNumberComponent>;
        inputRef = this.viewRef.createComponent(TestNumberComponent);
        inputRef.setInput('options', item)
        this.widgets.push(inputRef)
      } else if (item.type === 'select') {
        let inputRef!: ComponentRef<TestSelectComponent>;
        inputRef = this.viewRef.createComponent(TestSelectComponent);
        item.zindex
        inputRef.setInput('options', item)
        this.widgets.push(inputRef)
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
      if (item.instance.options.type === 'select') {
        this.formResult[item.instance.options.field] = item.instance.options.selectedOptions;
      } else
        if (item.instance.options.type === 'text') {
          this.formResult[item.instance.options.field] = item.instance.options.items;
        } else
          if (item.instance.options.type === 'checkbox') {
            this.formResult[item.instance.options.field] = item.instance.options.checks;
          } else
            if (item.instance.options.type === 'number') {
              this.formResult[item.instance.options.field] = item.instance.options.value;
            }
    })

    console.log('Sent to server:', this.formResult);
    this.clear();
  }
}
