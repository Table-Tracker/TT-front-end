import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDTO } from 'src/app/models/dtos/image.dto';
import { VisitorDTO } from 'src/app/models/dtos/visitor.dto';
import { UserService } from 'src/app/services/user.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @ViewChild('locationInput') locationInput!: ElementRef;
  @ViewChild('file') file!: ElementRef;
  date : any;

  fileToUpload: File | null = null;
  deletedAvatar: boolean = false;
  savedAvatar: boolean = true;
  imageSource: string = '';

  isInEditMode: boolean = false;

  successBool: boolean = false;
  errorBool: boolean = false;

  @Input() userId!: number;
  user: VisitorDTO = {
    id: 0,
    fullName: '',
    avatar: { id: 0, name: ''},
    email: '',
    reservations: [],
    dateOfBirth: new Date(),
    favourites: [],
    generalTrustFactor: 0,
    location: ''
  };

  constructor(
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getVisitor(this.userId)
      .subscribe((data: VisitorDTO) => {
        this.user = data;
        this.user.dateOfBirth = new Date(this.user.dateOfBirth);
        this.date = this.user.dateOfBirth === undefined || this.user.dateOfBirth === null || this.user.dateOfBirth.getDate() === new Date('0001-01-01').getDate() ? null : this.user.dateOfBirth;

        if (this.fileToUpload !== null) {
          this.putImageIntoSource();
        } else if (this.user.avatar === undefined || this.user.avatar === null || this.user.avatar.id === 0) {
          this.imageSource = "../../../assets/user-placeholder.jpg"
        } else {
          this.imageSource = `https://localhost:5001/images/${this.user.avatar.name}`;
        }  
      });
  }

  isNullOrEmpty(value: string | undefined): boolean {
    return !value || value === undefined || value === "" || value.length === 0;
  }

  getDateString(): string {
    if (this.user.dateOfBirth.getDate() === new Date('0001-01-01').getDate()) {
      return "Date not set";
    }
    
    return this.user.dateOfBirth.toDateString();
  }

  getLocationString(): string {
    if (this.user.location === undefined || this.user.location === null) {
      return "Location not set";
    }
    
    return this.user.location;
  }

  changeIsInEdit() {
    this.isInEditMode = !this.isInEditMode;
  }

  save() {
    this.user.dateOfBirth = this.date;
    this.user.location = this.locationInput.nativeElement.value;

    this.userService.updateVisitor(this.user)
      .subscribe(() => {
        this.changeIsInEdit();
      });

  }

  myFilter = (d: Date | null): boolean => {
    const year = (d || new Date()).getFullYear();
    return year >= new Date().getFullYear() - 100;
  };

  uploadAvatar(files) {
    if (files.length === 0) {
      return;
    }

    this.fileToUpload = <File>files[0];
    this.file.nativeElement.value = null;
    this.deletedAvatar = false;
    this.savedAvatar = false;
    this.putImageIntoSource();
  }

  deleteAvatar() {
    this.deletedAvatar = true;
    this.fileToUpload = null;
    this.imageSource = "../../../assets/user-placeholder.jpg"
    this.savedAvatar = false;
  }

  putImageIntoSource() {
    if (FileReader) {
      var fr = new FileReader();

      fr.onload = () => {
        this.imageSource = fr.result as string;
      }

      fr.readAsDataURL(this.fileToUpload!);
    }
  }

  saveAvatar() {
    if (this.fileToUpload !== null) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload!);

      this.userService.uploadAvatar(this.user.id, formData)
        .subscribe((response: ImageDTO) => {
          this.user.avatar = response;
          this.imageSource = `https://localhost:5001/images/${this.user.avatar.name}`;
          this.savedAvatar = true;
          this.deletedAvatar = false;
          this.fileToUpload = null;
          this.errorBool = false;
          this.successBool = false;
        });
    } else if (this.deletedAvatar || this.user.avatar !== null && this.user.avatar.id === 0) {
      this.userService.deleteAvatar(this.user.id)
        .subscribe(() => {
          this.deletedAvatar = false;
          this.savedAvatar = true;
          this.errorBool = false;
          this.successBool = false;
        });
    }
  }

  success = () => {
    this.errorBool = false;
    this.successBool = true;
  }

  error = () => {
    this.errorBool = true;
    this.successBool = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '250px',
      data: { email: this.user.email, success: this.success, error: this.error },
    });
  }
}
