# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
As far as bugs or enhancements that we can look at or think about, I would say focusing on improving the already existing bugs that we have such as the double quotes, missing columns, extra columns, and when a row or the CSV is empty. But I would also say I want the user interface to be more clear. For example, do users type the info into the CSV manually? Are they entering fields themselves, like do they create the fields they want to input data into, or do they always have to follow a specific format, like for example for the people.csv: name: insert_name, etc? Or do they just type in the row information all at once, like the name and then the age? I would want to have it in a way that's as easy for them to input the data as possible, so thinking about ways we can prompt the user to enter the desired info and give them instructions as to what info to input and when to input it. Also just being aware that we need to be able to parse through all the bugs like commas, extra quotes, empty CSVs, and everything that comes with that. And then also for error handling just being more specific about what's going on with the code or what's causing the bug, whether it's an incorrect number of fields, datatype issues, etc.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    For the sprint, I have identified 4 major enhancements and edge cases for the CSV parser.

    On the functionality side, one issue the LLM brought up is the problem of inconsistent field counts. As a developer using the parser, I am able to catch when a row has the wrong number of values compared to the amount of labels, so that I can be sure that the data stays accurate and nothing extra slips in that could mess up processing/cause some errors to occur. For example, using the people.csv if there are 2 column names, but one row has 4 items, the parser should flag it.

    Another functionality issue I was able to identify, with help from the LLM is handling quotes, commas, etc. As a developer I am able to parse CSVs that contain quoted text with commas, double quotes, and line breaks, so that I can safely work with real world files where people may type things like "New York, NY" or paste multi line addresses. This makes the parser follow the CSV rules more closely and prevents it from splitting or merging rows incorrectly.

    On the extensibility side that I was able to come up with is better error reporting. So, as a developer, I am able to see clear error messages that tell me exactly what went wrong and where, so I know what the issue is, where to look, and a better idea of how to fix it. Right now, the parser fails very vaguely, it lets me know that a test failed but doesn't tell me why or how, but with this change it would be easier to debug and adapt to different use cases. I think this also ties into the functionality side like the missing row/values I think error reporting would be helpful in identifying that from the get go rather than manual search - automating this would be much more efficient.

    Finally, me and the LLM agreed that it would be really helpful if the parser could automatically convert values into the right types instead of leaving everything as plain text. As a developer, I am able to have the parser turn things like "42" into a number, "true" into a boolean, or an empty cell into a null value so that I dont have to write a bunch of extra code to clean up the data myself. This way the parser gives me data that's already in the format I actually want to use, which makes working with it a lot easier.







    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

The LLM helped me to expand my thinking a lot especially with it generating a list of edge cases, missing improvements, and developer friendly improvements. I noticed similar results across trying 3 different prompts, one in which I encouraged the LLM to think like an Amazon Software Engineer, and the other where I encouraged the LLM to think of as many edge cases as possible. The main difference was the organization/presentation of the info but overall it was pretty much the same suggestions. One thing I noticed was that the Amazon prompt focused on how to handle parsing large CSV datasets. The edge case prompt focused on security and safety such as maliciously large files + zip bombs as well as encoding so having a multi language processor.

### Design Choices

### 1340 Supplement

- #### 1. Correctness
- The number of fields in the headers should match the number of values in each row, else an error should be thrown
- Strings like "thirty" will result in an error in the entire csv even though everything else is correct because, especially if we use zod.coercenumber it will convert it into a NaN value but that might be dependent on what zod method we use
- Empty lines in the dataset like in the rows or columns should still output a CSV to reflect correct/real world like practices where not every value in the data will be filled out (not to be confused with having extra rows/columns)
- Commas in the dataset, as long as they're in quotes should be fine to reflect real life example data such as "New York, NYC" or multi-line info such as addresses

- #### 2. Random, On-Demand Generation
I guess I would get a better understanding of different use cases being that the datasets are random. Perhaps it could expand my thinking and help me to consider extra test cases I wasn't considering before it could also help me to realize that the tests and error handling I have already is durable already, which would help me to improve my confidence in my tests to make sure Im handling all edge cases

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs: Some bugs also came from not having ran npm install in my terminal but I was able to fix that pretty quickly.
#### Tests: I think I had a lot of bugs with the way I wrote my tests and CSV files so I had to go back in and change my tests, for example, some of my tests didn't pass because I accidentally added an extra space before text so I had to go back and fix that.
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
