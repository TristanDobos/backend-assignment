import { FormRepository, SelectField, TextualField } from "../repositories/FormRepository";

import { ReportRepository } from "../repositories/ReportRepository";

export class ReportingService {
    // Submits a report with user responses
    public async submitReport(reportData: ReportSubmission): Promise<Report> {
        try {
            // Validate all the responses, ensure to await since validateReportData is async
            if (!await this.validateReportData(reportData)) {
                throw new Error("Invalid report data");
            }
            const reportRepository = new ReportRepository();
            // Await the save operation to ensure it completes before returning
            return await reportRepository.save(reportData);
        } catch (error) {
            console.error("Failed to submit report:", error);
            // Re-throw the error to let the caller handle it, or handle it based on your application's error handling policy
            throw new Error("Error submitting report: " + error.message);
        }
    }

    // Retrieves detailed information about a specific report
    public async getReportDetail(submissionId: number): Promise<Report | null> {
        try {
            if (!submissionId) {
                throw new Error("Submission ID is required to fetch report details");
            }
            const reportRepository = new ReportRepository();
            // Await the findOne method to ensure it completes before proceeding
            const report = await reportRepository.findOne(submissionId);
            return report;
        } catch (error) {
            console.error("Failed to retrieve report details:", error);
            // Optionally return null or handle the error as per your error handling strategy
            return null; // Returning null if there's an error, could throw an error instead based on your use case
        }
    }

    // Helper method to validate the report submission data
    private async validateReportData(data: ReportSubmission): Promise<boolean> {
        // Ensure all required fields in the report are filled and valid
        const validationPromises = data.responses.map(response =>
            this.validateResponse(response.value, response.fieldId)
        );

        // Use Promise.all to wait for all validation promises to resolve
        try {
            const results = await Promise.all(validationPromises);
            // Return true if all validations pass (i.e., all are true)
            return results.every(result => result === true);
        } catch (error) {
            console.error("Validation failed:", error);
            // Optionally handle the error, e.g., logging or throwing
            return false; // Assuming validation should fail if there's an error
        }
    }

    // Helper method to validate individual responses based on field specifications
    private async validateResponse(response: string, fieldId: number): Promise<boolean | Error> {
        const formRepository = new FormRepository();
        const field = await formRepository.findOne(fieldId);
        // If the field couldn't be retrieved by its id, it doesn't exist. 
        if (!field) {
            new Error("Invalid field ID");
        }

        if (field?.type === 'textual') {
            const textualField = field as TextualField;
            return typeof response === 'string' && response.length >= textualField.min_length && response.length <= textualField.max_length;
        } else if (field?.type === 'select') {
            const selectField = field as SelectField;
            return selectField.options.includes(response);
        }
        return false;
    }
}

// Typings for parameters and entities
interface ReportSubmission {
    responses: FieldResponse[];
}

interface Report {
    submissionId: number;
    timestamp: Date;
    responses: FieldResponse[];
}

interface FieldResponse {
    fieldId: number;
    value: string;  // 'value' would be textual or one of the options in 'select'
}
