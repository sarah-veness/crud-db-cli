import inquirer from "inquirer";
import fs from 'fs';
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function removeData(info) {
  dbFileCheck();

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'recordID',
        message: 'Enter record ID',
      },
    ]);

    let remnantData = [];
    info.forEach((element) => {
      if (element.id !== answers.recordID) {
        remnantData.push(element);
      }
    })

    fs.writeFile('db.json', JSON.stringify(remnantData), err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Deleted!');
      }
    });
  } catch (err) {
    console.error(`something went wrong: ${err}`)
  }
}

queryDB(removeData);