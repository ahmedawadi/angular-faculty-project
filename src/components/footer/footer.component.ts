import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [CommonModule, RouterLink],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
