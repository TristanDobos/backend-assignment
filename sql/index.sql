-- Use the public schema for simplicity
SET search_path TO public;

-- Creating table for form fields
CREATE TABLE fields (
    field_id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    field_type VARCHAR(50) CHECK (field_type IN ('textual', 'select')), -- Restrict to 'textual' or 'select'
    min_length INT,
    max_length INT,
    field_order INT,
    CONSTRAINT chk_lengths CHECK ((field_type = 'textual' AND min_length IS NOT NULL AND max_length IS NOT NULL) OR (field_type = 'select' AND min_length IS NULL AND max_length IS NULL))
);

-- Creating table for options in select fields
CREATE TABLE field_options (
    option_id SERIAL PRIMARY KEY,
    field_id INT NOT NULL REFERENCES fields(field_id) ON DELETE CASCADE,
    option_value VARCHAR(255) NOT NULL,
    UNIQUE (field_id, option_value) -- Ensure unique options per field
);

-- Creating index for faster retrieval of fields by order
CREATE INDEX idx_field_order ON fields(field_order);

-- Creating table for form submissions
CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,
    submission_time TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() -- Automatically set the submission time
);

-- Creating table for storing user responses
CREATE TABLE responses (
    response_id SERIAL PRIMARY KEY,
    submission_id INT NOT NULL REFERENCES submissions(submission_id) ON DELETE CASCADE,
    field_id INT NOT NULL REFERENCES fields(field_id) ON DELETE RESTRICT,
    response_text VARCHAR(255) NOT NULL,
    CONSTRAINT fk_field_submission UNIQUE (submission_id, field_id) -- Ensure each field is filled once per submission
);

-- Creating index for faster retrieval of responses by submission
CREATE INDEX idx_submission ON responses(submission_id);
