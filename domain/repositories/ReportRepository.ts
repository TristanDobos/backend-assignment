export class ReportRepository {
    public async findOne(submissionId: number): Promise<Report> {
        // you dont have to implement the DB part.
        return "Report" as unknown as Report 
    }

    public async save(reportData: ReportSubmission): Promise<Report> {
        // you dont have to implement the DB part.
        return "Report" as unknown as Report 
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
    value: string;  // Value could be text or selected option
}
