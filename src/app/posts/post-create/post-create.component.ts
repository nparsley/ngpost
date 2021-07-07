import { Component } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
  newPost = 'no content';
  enteredValue = '';

  onAddPost(/* postInput: HTMLTextAreaElement */) {
    // console.log(postInput)
    // console.dir(postInput)


    // this.newPost = postInput.value;
    this.newPost = this.enteredValue;
  }

}
