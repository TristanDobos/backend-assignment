export class FormRepository {
    // Finds all the fields of the form
    public async find(): Promise<Field[]> {
        return "Field" as unknown as Field[];
    }

    // Finds a form field by its unique ID
    public async findOne(fieldId: number): Promise<Field> {
        return "Field" as unknown as Field;
    }

    // Saves a new form field
    public async save(field: InputField): Promise<Field> {
        return "Field" as unknown as Field;
    }

    public async updateOrder(fieldId: number, newOrder: number): Promise<Field> {
        return "Field" as unknown as Field;
    }

    // Deletes a form field
    public async delete(fieldId: number): Promise<void> {
        return;
    }
}

interface InputField {
    id?: number;
    label: string;
    type: 'textual' | 'select';
    min_length?: number;
    max_length?: number;
    options?: string[];
}

interface Field extends InputField {
    order: number;
}

export interface TextualField extends Field {
    type: 'textual';
    min_length: number;  // More relevant for textual fields
    max_length: number;  // More relevant for textual fields
}

export interface SelectField extends Field {
    type: 'select';
    options: string[];  // Required for select fields
}

