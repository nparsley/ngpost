import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: 'first post', content: 'this is the first post\'s conent'},
  //   {title: 'second post', content: 'this is the second post\'s conent'},
  //   {title: 'third post', content: 'this is the third post\'s conent'},
  // ]
  @Input() posts = [];

  constructor() { }

  ngOnInit(): void {
  }

}
