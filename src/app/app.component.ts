import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store';
  imgParent = '';

  onLoaded(img: string) {
    console.log('Image loaded! del padre', img);
  }
}

