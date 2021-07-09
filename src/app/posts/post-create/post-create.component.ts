import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  // newPost = 'no content';
  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter();

  onAddPost(/* postInput: HTMLTextAreaElement */) {
    // console.log(postInput)
    // console.dir(postInput)


    // this.newPost = postInput.value;
    // this.newPost = this.enteredValue;

    const post = {title: this.enteredTitle, content: this.enteredContent};
    this.postCreated.emit(post);
  }

}
