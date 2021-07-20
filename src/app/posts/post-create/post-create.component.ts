import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { PostService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  // @Output() postCreated = new EventEmitter<Post>();
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;

  // creating form programatically
  form: FormGroup;


  constructor(public postService: PostService, public route: ActivatedRoute) {}

  // onSavePost(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
    onSavePost() {
      if (this.form.invalid) {
        return;
      }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);

    // add spinner
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }


    // form.resetForm();
    this.form.reset();
  }

  ngOnInit() {
    //initialize form
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        // this.post = this.postService.getPost(this.postId);
        // add spinner
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          // add spinner
        this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

}
