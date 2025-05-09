import { FieldInResponseType, FieldType } from '../../types/fields';

export function castToFieldType(field: FieldInResponseType): FieldType {
  return {
    id: field.id,
    title: field.name,
    description: field.description ? field.description : '',
  };
}
