import { FieldInResponseType, FieldType } from '../../types/fields';

export function castToFieldType(field: FieldInResponseType): FieldType {
  return {
    id: field.id,
    title: field.title,
    description: field.description,
  };
}
