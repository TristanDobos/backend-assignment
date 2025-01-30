# API design
In this part, provide either a swagger file or GQL schema of the API you
would propose to design for the application.

## What to focus on
- Reasonable choices for the endpoints/queries and mutations.
- Having a clear understanding of what happens on the front end and what queries are needed from the BE.
- Make the Swagger or GQL schema detailed enough so any FE engineer can start using it straight away.

## What not to focus on
- Implementing the endpoints

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