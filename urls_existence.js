import urlExists from 'url-exists-nodejs'
import csv from 'csv-parser'
import fastcsv from 'fast-csv'
import fs from 'fs'

const urls = []

/*fs.createReadStream("./files/EXPOSANT.csv")
.pipe(csv())
.on('data', (row) => {
    urls.push(row["SRV_INTERNET"])
})
.on('end', () => {
    urls.forEach(element => {
        console.log(await urlExists('http://www.roche-bobogis.com/'))
    });
})*/
const readDataFromCsvPromise = (filePath) => {
    return new Promise(function(resolve, reject) {
      const tab = []
      fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        tab.push(row)
      })
      .on('end', () => {
        resolve(tab)
    })
    })
}
const exposants = await readDataFromCsvPromise("./files/EXPOSANT.csv")

exposants.forEach(exposant => {
    urlExists(exposant["SRV_INTERNET"])
    .then(data=>{
        urls.push({nom_exposant : exposant["NOM"], siteweb : exposant["SRV_INTERNET"], siteweb_existence : data})
    })
    .catch(err=>console.log(err))
})
const ws = fs.createWriteStream("./results/urls_existence.csv");
    fastcsv
      .write(urls, { headers: true })
      .pipe(ws)



 