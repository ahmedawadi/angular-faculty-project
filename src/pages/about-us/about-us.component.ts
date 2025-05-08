import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutComponent {
  facultyStats = [
    { value: '1989', label: 'Founded' },
    { value: '5,000+', label: 'Students' },
    { value: '300+', label: 'Faculty Members' },
    { value: '25+', label: 'Research Labs' },
    { value: '40+', label: 'Academic Programs' },
    { value: '10,000+', label: 'Alumni Worldwide' },
  ];

  milestones: any[] = [
    {
      year: '1989',
      title: 'Foundation',
      description:
        'The Faculty of Science of Sfax was established to provide high-quality education in various scientific disciplines.',
    },
    {
      year: '1995',
      title: 'Research Expansion',
      description:
        'Expanded research capabilities with the opening of specialized laboratories and research centers.',
    },
    {
      year: '2003',
      title: 'International Partnerships',
      description:
        'Established partnerships with international universities and research institutions to enhance academic collaboration.',
    },
    {
      year: '2010',
      title: 'Curriculum Innovation',
      description:
        'Implemented innovative curriculum changes to align with global standards and industry requirements.',
    },
    {
      year: '2015',
      title: 'Technology Integration',
      description:
        'Integrated advanced technology into teaching and research methodologies to enhance learning experiences.',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description:
        'Embraced digital transformation with online learning platforms and virtual laboratories.',
    },
  ];

  leadershipTeam: any[] = [
    {
      id: 1,
      name: 'Prof. Ahmed Benali',
      position: 'Dean',
      department: 'Faculty of Science',
      image: 'assets/placeholder-person.jpg',
      bio: 'Prof. Benali has over 25 years of experience in academic leadership and scientific research. He holds a Ph.D. in Physics from the University of Paris and has published numerous papers in prestigious journals.',
    },
    {
      id: 2,
      name: 'Dr. Leila Kammoun',
      position: 'Vice Dean',
      department: 'Academic Affairs',
      image: 'assets/placeholder-person.jpg',
      bio: "Dr. Kammoun oversees academic programs and curriculum development. She has been instrumental in modernizing the faculty's teaching methodologies and implementing innovative educational approaches.",
    },
    {
      id: 3,
      name: 'Prof. Mohamed Trabelsi',
      position: 'Director',
      department: 'Research & Innovation',
      image: 'assets/placeholder-person.jpg',
      bio: "Prof. Trabelsi leads the faculty's research initiatives and innovation projects. His work has contributed significantly to establishing the faculty as a center of excellence in scientific research.",
    },
    {
      id: 4,
      name: 'Dr. Sonia Gharbi',
      position: 'Head',
      department: 'Student Affairs',
      image: 'assets/placeholder-person.jpg',
      bio: 'Dr. Gharbi is dedicated to enhancing student experience and ensuring their academic success. She has implemented several student support programs and career development initiatives.',
    },
  ];

  testimonials: any[] = [
    {
      id: 1,
      name: 'Youssef Mejri',
      role: 'Computer Science Graduate, 2022',
      image: 'assets/placeholder-person.jpg',
      quote:
        'The Faculty of Science of Sfax provided me with not just theoretical knowledge but practical skills that have been invaluable in my career. The professors are dedicated and the facilities are excellent.',
    },
    {
      id: 2,
      name: 'Amina Bouazizi',
      role: 'Mathematics Researcher',
      image: 'assets/placeholder-person.jpg',
      quote:
        'My time at the faculty shaped my approach to research and problem-solving. The collaborative environment and research opportunities prepared me well for my current role in mathematical research.',
    },
    {
      id: 3,
      name: 'Dr. Karim Jendoubi',
      role: 'Alumni & Industry Partner',
      image: 'assets/placeholder-person.jpg',
      quote:
        "As both an alumnus and now an industry partner, I've seen firsthand how the faculty consistently produces graduates who are well-prepared for the challenges of the modern scientific workplace.",
    },
  ];

  values = [
    {
      title: 'Excellence',
      description:
        'Striving for the highest standards in teaching, research, and community service.',
      icon: 'award',
    },
    {
      title: 'Innovation',
      description:
        'Encouraging creative thinking and innovative approaches to scientific challenges.',
      icon: 'lightbulb',
    },
    {
      title: 'Integrity',
      description:
        'Upholding ethical standards and academic honesty in all endeavors.',
      icon: 'shield',
    },
    {
      title: 'Collaboration',
      description:
        'Fostering partnerships and teamwork across disciplines and borders.',
      icon: 'users',
    },
    {
      title: 'Inclusivity',
      description:
        'Creating an environment where diversity is valued and everyone can thrive.',
      icon: 'heart',
    },
    {
      title: 'Impact',
      description:
        'Conducting research and education that makes a positive difference in society.',
      icon: 'target',
    },
  ];

  selectedMember: any | null = null;

  showMemberDetails(member: any): void {
    this.selectedMember = member;
  }

  closeMemberDetails(): void {
    this.selectedMember = null;
  }
}
