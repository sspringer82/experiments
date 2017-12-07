import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items = [
    { id: 1, title: 'item 1' },
    { id: 2, title: 'item 2' },
    { id: 3, title: 'item 3' },
    { id: 4, title: 'item 4' },
    { id: 5, title: 'item 5' },
  ];

  public handleMove(event) {
    const jsonEvent = JSON.parse(event);
    const el = this.items.splice(
      this.items.findIndex(item => item.id === parseInt(jsonEvent.el, 10)),
      1,
    );
    const index = this.items.findIndex(item => item.id === jsonEvent.before);
    this.items.splice(index, 0, el.pop());
  }
}
