import inquirer from "inquirer";
import fs from 'fs';
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateData(info) {
  dbFileCheck();

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'recordID',
        message: 'Enter record ID',
      },
    ]);

    let current;
    info.forEach((element) => {
      if (element.id === answers.recordID) {
        current = element;

        updateDetails(current, info)
      }
    });
  } catch (err) {
    console.error('something went wrong: ', err)
  }
}

async function updateDetails(current, info) {
  try {
    const feedback = await inquirer.prompt([
      {
        type: 'input',
        default: current.name,
        name: 'name',
        message: 'whats your name?'
      },
      {
        type: 'number',
        default: current.number,
        name: 'phone',
        message: 'whats your number?'
      },
      {
        type: 'list',
        default: current.phone,
        name: 'age',
        message: 'are you an adult?',
        choices: [
          { name: 'Y', value: 'Adult' },
          { name: 'N', value: 'Minor' }
        ],
      },
    ])
    current.name = feedback.name;
    current.phone = feedback.phone;
    current.age = feedback.age;

    await fs.writeFile('db.json', JSON.stringify(info), err => {
      if (err) {
        console.error(err);
      } else {
        console.log('updated!');
      }
    })
  } catch (err) {
    console.error('something went wrong: ', err)
  }
}

queryDB(updateData);