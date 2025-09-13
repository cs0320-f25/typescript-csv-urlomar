import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

// Define paths to the test CSV files
const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");


test("parseCSV handles header row with schema", async () => {
  const PersonSchema = z
  .tuple([z.string(), z.coerce.number()])
  .transform(([name, age]) => ({ name, age }));

  
  await expect(
    parseCSV<{ name: string; age: number }>(PEOPLE_CSV_PATH, PersonSchema)
  ).rejects.toThrow("Schema validation failed");
});




const MISSING_ROW_CSV_PATH = path.join(__dirname, "../data/missing_row.csv");
const EXTRA_COMMAS_CSV_PATH = path.join(__dirname, "../data/extra_commas.csv");
const MISSING_COLUMNS_CSV_PATH = path.join(__dirname, "../data/missing_columns.csv");




test("parseCSV handles double quotes", async () => {
  const DOUBLE_QUOTES_CSV_PATH = path.join(__dirname, "../data/double_quotes.csv");
  const results = await parseCSV(DOUBLE_QUOTES_CSV_PATH)
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["name1", "name2", "course", "role"]);
  expect(results[1]).toEqual(["Nim", "Telson", "CSCI 0320", "student"]);
  expect(results[2]).toEqual(['"Ryler, Ryler"', "CSCI 0320", "student"]);
});



test("parseCSV handles missing columns", async () => {
  const results = await parseCSV(MISSING_COLUMNS_CSV_PATH)
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["name1", "name2", "course", "role"]);
  expect(results[1]).toEqual(["Tim", "Nelson", "instructor"]);
 // missing column
  expect(results[2]).toEqual(["Nim", "Telson", "CSCI 0320", "student"]);
 
});

test("parseCSV handles missing rows", async () => {
  const results = await parseCSV(MISSING_ROW_CSV_PATH)


  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]);
  expect(results[3]).toEqual([""]); // missing row
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
    for(const entry of row) {
      expect(typeof entry).toBe("string");
    }
  }
});

test("parseCSV handles extra commas", async () => {
  const EXTRA_COMMAS_CSV_PATH = path.join(__dirname, "../data/extra_commas.csv");
  const results = await parseCSV(EXTRA_COMMAS_CSV_PATH)
  expect(results[0]).toEqual(["name1", "name2", "course", "role"]);
  expect(results[1]).toEqual(["Tim", "Nelson", "CSCI 0320", "instructor"]);
  expect(results[2]).toEqual(["Nim", "Telson", "CSCI 0320", "student"]);
  expect(results[3]).toEqual(["Zion", "Zion", '"CSCI 0320, SNC"', "student"]);
  expect(results[4]).toEqual(['"Zion, Zion"', '"Zion, Zion"', '"CSCI 0320, SNC"', "student"]);

});


test("parseCSV handles empty file", async () => {
  const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv");
  const results = await parseCSV(EMPTY_CSV_PATH)
  expect(results).toHaveLength(0);
});