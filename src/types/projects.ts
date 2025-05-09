import { FieldType } from './fields';

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  field: FieldType;
  type: 'PFA' | 'Course' | 'Summary Internship';
  year: number;
  students: string[];
  supervisors: string[];
  technologies: string[];
  images: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ProjectInResponseType {
  id: string;
  title: string;
  description: string;
  fieldId: string;
  type: 'PFA' | 'Course' | 'Summary Internship';
  year: number;
  students: string[];
  supervisor: string;
  technologies: string[];
  images: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ProjectSubmission {
  title: string;
  description: string;
  fieldId: string;
  type: 'PFA' | 'Course' | 'Summary Internship';
  year: number;
  students: string[];
  supervisor: string;
  technologies: string[];
  images: File[];
  imagePreviewUrls: string[];
  githubUrl?: string;
  demoUrl?: string;
}
