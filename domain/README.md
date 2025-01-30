# Business logic design

In this part, you will be asked to create a simple business logic model that supports the predefined services (application layer). You can expect that the services will be called by API endpoints with the type of data that you have specified, and the provided repositories will persist and create your entities from the DB storage.

## What to focus on
Decomposing the code reasonably while keeping in mind the requirements for consistency, maintainability, and extendability.
- Be aware of what happens in edge cases
- Meaningful entities, methods, types, validations and errors
- We like our code testable, so tests are welcome where they make sense to you.

## What not to focus on
- Calling or creating anything DB or API related.

## Wooah, but I like my logic functional
Not a problem. We do not resort to classes as a the go-to solution for everything. If you can satisfy the requirements for
maintainability, etc. choose what style suits you best.

## Application scenario
_(Same for domain, sql and api part)_

Our application should be a simple form editor.
In the base case, we would like to:
1. configure a form
2. submit the form

### Configuring the form
There will be only one fixed form. I have to be able to create and delete
fields. Additionally, I can change the order of the fields.

Each field has one of two types. Either the field is textual or option selection.

Textual fields have a minimum and a maximum length. Select fields have multiple options, but at least two, one of which can be chosen.

All fields have a label and are required by default (which is not changeable).

### Submitting the form
When configuration is ready, the application needs to be able to output the form fields. User will then fill out these fields and submit a report.

The report will be validated and, again, can be displayed with the respective answers to the form fields.