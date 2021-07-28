import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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

  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  isLoading = false;

  //paginator
  // totalPosts = 10;
  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage =1;


  constructor(public postsService: PostService, private authService: AuthService) {
    // this.postsService = postsService;
  }

  ngOnInit(): void {
    // add spinner
    this.isLoading = true;
    // this.posts = this.postsService.getPosts();
    // this.postsService.getPosts(this.postsPerPage, 1);
    this.postsService.getPosts(this.postsPerPage, this.currentPage);

    this.postSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      // .subscribe((posts: Post[]) => {
        // add spinner
        this.isLoading = false;
        // this.posts = posts;

        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });

      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        });
  }


  // pagination
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    // console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;

    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


}
