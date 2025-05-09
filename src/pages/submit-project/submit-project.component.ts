import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldType } from '../../types/fields';
import { ProjectSubmission } from '../../types/projects';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldsService } from '../../services/fields.service';
import castObjectToFormData from '../../utils/from-json-to-form-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submit-project',
  templateUrl: './submit-project.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class SubmitProjectComponent implements OnInit {
  projectForm: FormGroup;
  currentStep = 1;
  totalSteps = 4;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';
  previewMode = false;

  fields: FieldType[] = [];

  projectTypes = ['PFA', 'Course', 'Summary Internship'];

  // Generate years from 5 years ago to current year
  years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 5 + i);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    fieldsService: FieldsService
  ) {
    fieldsService.getFields().subscribe({
      next: (fields) => {
        this.fields = fields;
      },
    });
    this.projectForm = this.fb.group({
      // Step 1: Basic Information
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(50)]],
      field: ['', Validators.required],
      type: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],

      // Step 2: Team Information
      students: this.fb.array(
        [this.createStudentControl()],
        [Validators.required, Validators.minLength(1)]
      ),
      supervisors: this.fb.array(
        [this.createSupervisorControl()],
        [Validators.required, Validators.minLength(1)]
      ),

      // Step 3: Technical Details
      technologies: this.fb.array(
        [this.createTechnologyControl()],
        [Validators.required, Validators.minLength(1)]
      ),
      githubUrl: [
        '',
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ],
      demoUrl: [
        '',
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ],

      // Step 4: Media
      images: [null, Validators.required],
      imagePreviewUrls: [[]],
    });
  }

  ngOnInit(): void {}

  // Form array getters
  get studentsArray(): FormArray {
    return this.projectForm.get('students') as FormArray;
  }

  get supervisorsArray(): FormArray {
    return this.projectForm.get('supervisors') as FormArray;
  }

  get technologiesArray(): FormArray {
    return this.projectForm.get('technologies') as FormArray;
  }

  // Form control creators
  createStudentControl(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  createSupervisorControl(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  createTechnologyControl(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  // Add/remove form array items
  addStudent(): void {
    this.studentsArray.push(this.createStudentControl());
  }

  removeStudent(index: number): void {
    if (this.studentsArray.length > 1) {
      this.studentsArray.removeAt(index);
    }
  }

  addSupervisor(): void {
    this.supervisorsArray.push(this.createSupervisorControl());
  }

  removeSupervisor(index: number): void {
    if (this.supervisorsArray.length > 1) {
      this.supervisorsArray.removeAt(index);
    }
  }

  addTechnology(): void {
    this.technologiesArray.push(this.createTechnologyControl());
  }

  removeTechnology(index: number): void {
    if (this.technologiesArray.length > 1) {
      this.technologiesArray.removeAt(index);
    }
  }

  // Navigation between steps
  nextStep(): void {
    if (this.isCurrentStepValid()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    const currentStepControls = this.getControlsForCurrentStep();
    return currentStepControls.every((controlName) => {
      const control = this.projectForm.get(controlName);
      if (control instanceof FormArray) {
        return control.length > 0 && control.valid;
      }
      return control?.valid;
    });
  }

  getControlsForCurrentStep(): string[] {
    switch (this.currentStep) {
      case 1:
        return ['title', 'description', 'field', 'type', 'year'];
      case 2:
        return ['students', 'supervisors'];
      case 3:
        return ['technologies', 'githubUrl', 'demoUrl'];
      case 4:
        return ['images'];
      default:
        return [];
    }
  }

  // File handling
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = Array.from(input.files);
      this.projectForm.patchValue({ images: files });

      // Create preview URLs
      const previewUrls: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          previewUrls.push(reader.result as string);
          if (previewUrls.length === files.length) {
            this.projectForm.patchValue({ imagePreviewUrls: previewUrls });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    const currentImages = this.projectForm.get('images')?.value as File[];
    const currentPreviews = this.projectForm.get('imagePreviewUrls')
      ?.value as string[];

    if (currentImages && currentPreviews) {
      const newImages = [...currentImages];
      newImages.splice(index, 1);

      const newPreviews = [...currentPreviews];
      newPreviews.splice(index, 1);

      this.projectForm.patchValue({
        images: newImages.length ? newImages : null,
        imagePreviewUrls: newPreviews,
      });
    }
  }

  // Form submission
  togglePreview(): void {
    this.previewMode = !this.previewMode;
  }

  submitProject(): void {
    if (this.projectForm.valid) {
      this.isSubmitting = true;

      // Prepare the submission data
      const formValue = this.projectForm.value;
      const submission: ProjectSubmission = {
        title: formValue.title,
        description: formValue.description,
        fieldId: formValue.field,
        type: formValue.type,
        year: formValue.year,
        students: formValue.students.map((s: any) => s.name),
        supervisor: formValue.supervisors.map((s: any) => s.name)[0],
        technologies: formValue.technologies.map((t: any) => t.name),
        images: formValue.images,
        imagePreviewUrls: formValue.imagePreviewUrls,
        githubUrl: formValue.githubUrl,
        demoUrl: formValue.demoUrl,
      };

      // In a real application, you would send the form data to a server here

      const formData = castObjectToFormData(submission);

      // Simulate API call
      this.http
        .post('http://localhost:8085/projects/register', formData)
        .subscribe({
          next: () => {
            this.projectForm.reset();
            this.submitError = false;
            this.submitSuccess = true;

            console.log('successufl ');
            setTimeout(() => {
              this.submitSuccess = false;
            }, 5000);
          },
          error: (error) => {
            console.error('Error submitting form:', error);
            this.submitError = true;
            this.errorMessage =
              'Sorry a technical error occured Please try to submit your project again';
          },
        });
    } else {
      this.markFormGroupTouched(this.projectForm);
      this.submitError = true;
      this.errorMessage =
        'Please fix the errors in the form before submitting.';

      // Clear error after a delay
      setTimeout(() => {
        this.submitError = false;
      }, 5000);
    }
  }

  // Helper to mark all controls as touched for validation display
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }

      if (control instanceof FormArray) {
        control.controls.forEach((c) => {
          if (c instanceof FormGroup) {
            this.markFormGroupTouched(c);
          } else {
            c.markAsTouched();
          }
        });
      }
    });
  }

  // Field helpers
  getFieldById(id: string): FieldType | undefined {
    return this.fields.find((field) => field.id === id);
  }

  getFieldColor(fieldId: string): string {
    const field = this.getFieldById(fieldId);
    return 'blue';
  }

  getButtonClass(color: string): string {
    switch (color) {
      case 'blue':
        return 'bg-blue-700 hover:bg-blue-800';
      case 'green':
        return 'bg-green-600 hover:bg-green-700';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'red':
        return 'bg-red-600 hover:bg-red-700';
      case 'indigo':
        return 'bg-indigo-600 hover:bg-indigo-700';
      case 'cyan':
        return 'bg-cyan-600 hover:bg-cyan-700';
      case 'amber':
        return 'bg-amber-600 hover:bg-amber-700';
      case 'sky':
        return 'bg-sky-600 hover:bg-sky-700';
      default:
        return 'bg-blue-700 hover:bg-blue-800';
    }
  }

  // Form validation helpers
  hasError(controlName: string, errorName: string): boolean {
    const control = this.projectForm.get(controlName);
    return (control?.touched && control?.hasError(errorName)) as boolean;
  }

  getFormArrayItemError(
    formArray: FormArray,
    index: number,
    controlName: string,
    errorName: string
  ): boolean {
    const control = formArray.at(index).get(controlName);
    return (control?.touched && control?.hasError(errorName)) as boolean;
  }
}
