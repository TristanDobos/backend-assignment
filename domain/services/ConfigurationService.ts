import { FormRepository } from "../repositories/FormRepository";

export class ConfigurationService {
    public async getForm(): Promise<Field[]> {
        const formRepository = new FormRepository();
        try {
            // Await the repository's find method to ensure proper asynchronous operation
            return await formRepository.find();
        } catch (error) {
            console.error("Failed to retrieve forms:", error);
            // Rethrow or handle it according to your error handling strategy
            throw new Error("Error retrieving forms: " + error.message);
        }
    }

    public async createFormItem(fieldDetails: FieldDetails): Promise<Field | null> {
        const formRepository = new FormRepository();
        try {
            if (this.validateFieldDetails(fieldDetails)) {
                // Await the save operation to ensure it completes before proceeding
                return await formRepository.save(fieldDetails);
            } else {
                throw new Error("The field must satisfy the requirements");
            }
        } catch (error) {
            console.error("Failed to create form item:", error);
            // Rethrow or handle it according to your error handling strategy
            throw new Error("Error creating form item: " + error.message);
        }
    }

    // Function to ensure all required field details are provided and valid
    private validateFieldDetails(details: FieldDetails): boolean {
        // For 'textual' fields, check min_length and max_length
        if (details.type === 'textual' && details.min_length && details.max_length) {
            return details.min_length >= 0 && details.max_length >= details.min_length;
            // For 'select' fields, ensure there are at least two options
        } else if (details.type === 'select') {
            return !!details.options && (details.options.length >= 2);
        }
        return false;
    }

    // Deletes a form item by its ID
    public async deleteFormItem(fieldId: number): Promise<void> {
        if (!fieldId) {
            throw new Error("Field ID must be provided for deletion");
        }
        const formRepository = new FormRepository();
        
        try {
            // Ensure that the delete operation is awaited
            await formRepository.delete(fieldId);
        } catch (error) {
            console.error("Failed to delete form item:", error);
            // Re-throw the error or handle it appropriately
            throw new Error("Error deleting form item: " + error.message);
        }
    }

    public async changeFormItemOrder(fieldIds: number[]): Promise<Field[] | null> {
        const formRepository = new FormRepository();
        // Prepare an array of promises for updating the order of each field
        const updatePromises = fieldIds.map((fieldId, index) => {
            // Ensure that each update order call is awaited
            return formRepository.updateOrder(fieldId, index);
        });

        // Await all update promises at once using Promise.all
        try {
            const results = await Promise.all(updatePromises);
            return results; // This will be an array of Field objects
        } catch (error) {
            console.error("Failed to update field orders:", error);
            return null; // Return null or handle the error as appropriate
        }
    }
}

interface Field {
    id?: number;
    label: string;
    type: 'textual' | 'select';
    min_length?: number;
    max_length?: number;
    options?: string[];
}

interface FieldDetails extends Field { }
