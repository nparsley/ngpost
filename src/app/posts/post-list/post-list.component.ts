import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'first post', content: 'this is the first post\'s conent'},
  //   {title: 'second post', content: 'this is the second post\'s conent'},
  //   {title: 'third post', content: 'this is the third post\'s conent'},
  // ]
  // @Input() posts: Post[] = [];
  posts: Post[] = [];
  // postsService: PostService;
  private postSub: Subscription;

  constructor(public postsService: PostService) {
    // this.postsService = postsService;
  }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();

    this.postSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }


}
