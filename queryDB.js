import fs from 'fs';

export default async function queryDB(externalFunction) {
  try {
    let info = [];
    if (fs.existsSync('db.json')) {
      await fs.readFile('db.json', (err, data) => {
        info = JSON.parse(data.toString())
        console.log(info)

        if (err) {
          console.log(err)
          return;
        }
        if (externalFunction && !err) {
          externalFunction(info);
          return;
        }
      });
    } else {
      if (externalFunction) {
        externalFunction(info);
        return;
      }
    }
  } catch (error) {
    console.error(`something happened: ${error.message}`)
  }
}