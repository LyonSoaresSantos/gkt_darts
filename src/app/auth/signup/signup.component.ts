import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { mimeType } from 'src/app/shared/mime-type.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  imagePreview: string;
  form: FormGroup;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nick: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      // status: new FormControl(null, { validators: [Validators.required] }),
      // league: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onSignup() {
    if (this.form.invalid) {
      console.log('cliquei2');
      return;
    }
    this.authService.createUser(
      this.form.value.name,
      this.form.value.nick,
      this.form.value.email,
      this.form.value.password,
      `999`,
      `3`,
      // `9`,
      // `1`,
      this.form.value.image
    );
    console.log(this.form.value);

    this.form.reset();
  }
  
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // this.authService.login(form.value.email, form.value.password);
  }

}
