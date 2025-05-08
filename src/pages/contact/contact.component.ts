import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../types';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import this

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  formSuccess = false;
  formError = false;

  departments: Department[] = departmentsData;

  activeTab = 'general';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9+\\s-]+$')]],
      subject: ['', Validators.required],
      department: ['general'],
      message: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, Validators.requiredTrue],
    });
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.contactForm.valid) {
      // In a real application, you would send the form data to a server here
      console.log('Form submitted:', this.contactForm.value);

      // Simulate API call
      setTimeout(() => {
        // Simulate successful submission
        this.formSuccess = true;
        this.formError = false;
        this.contactForm.reset();
        this.formSubmitted = false;

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.formSuccess = false;
        }, 5000);
      }, 1500);
    } else {
      this.formError = true;
    }
  }

  // Form validation helpers
  get nameControl() {
    return this.contactForm.get('name');
  }

  get emailControl() {
    return this.contactForm.get('email');
  }

  get phoneControl() {
    return this.contactForm.get('phone');
  }

  get subjectControl() {
    return this.contactForm.get('subject');
  }

  get messageControl() {
    return this.contactForm.get('message');
  }

  get consentControl() {
    return this.contactForm.get('consent');
  }
}

const departmentsData = [
  {
    id: 'computer-science',
    name: 'Computer Science Department',
    email: 'cs@fss.tn',
    phone: '+216 74 123 456',
    head: 'Prof. Nadia Hamdi',
  },
  {
    id: 'mathematics',
    name: 'Mathematics Department',
    email: 'math@fss.tn',
    phone: '+216 74 123 457',
    head: 'Prof. Karim Ben Salem',
  },
  {
    id: 'physics',
    name: 'Physics Department',
    email: 'physics@fss.tn',
    phone: '+216 74 123 458',
    head: 'Prof. Leila Trabelsi',
  },
  {
    id: 'chemistry',
    name: 'Chemistry Department',
    email: 'chemistry@fss.tn',
    phone: '+216 74 123 459',
    head: 'Prof. Mohamed Kammoun',
  },
  {
    id: 'biology',
    name: 'Biology Department',
    email: 'biology@fss.tn',
    phone: '+216 74 123 460',
    head: 'Prof. Sonia Gharbi',
  },
];
