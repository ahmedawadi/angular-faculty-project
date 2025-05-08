import { ProjectType, ProjectInResponseType } from '../../types/projects';
import { castToFieldType } from './field.dto';

export function castToProject(project: ProjectInResponseType): ProjectType {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    field: castToFieldType(project.field),
    type: project.type,
    year: project.year,
    students: [...project.students],
    supervisors: [...project.supervisors],
    technologies: [...project.technologies],
    images: [...project.images],
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
  };
}
