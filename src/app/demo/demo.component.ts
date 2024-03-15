import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: true,
  template: `
    <main>
      <h4>Router Param (entityId): <span>{{entityId}}</span></h4>
      <h4>Router Query Param (sort): <span>{{sort}}</span></h4>
      <h4>Router Data (title): <span>{{title}}</span></h4>
    </main>
  `
})
export class DemoComponent implements OnChanges {

  @Input() sort: 'asc' | 'desc' = 'desc';
  
  @Input() entityId: string = '';
  
  @Input() title?: string = '';
  @Input() description?: string = '';

  ngOnChanges(changes: SimpleChanges) {
    console.log('Input Changed: ', changes);
  }
}
