import { environment } from '../../environments/environment';
import { ProjectType, ProjectInResponseType } from '../../types/projects';

export function castToProject(project: ProjectInResponseType): ProjectType {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    field: { id: project.fieldId, title: '', description: '' },
    type: project.type,
    year: project.year,
    students: [...project.students],
    supervisors: [project.supervisor],
    technologies: [...project.technologies],
    images: project.images.map((image) => `${environment.apiUrl}${image}`),
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
  };
}
