import urlExists from 'url-exists-nodejs'
import csv from 'csv-parser'
import fastcsv from 'fast-csv'
import fs from 'fs'


const verifyUrlsExistence = (pathFileToVerify, pathFileResult, propName, propUrl ) => {
    const tab =[]
    fs.createReadStream(pathFileToVerify)
    .pipe(csv())
    .on('data', async (exposant) => {
      const exist=await urlExists(exposant[propUrl])
       tab.push({nom_exposant : exposant[propName], siteweb : exposant[propUrl], siteweb_existence :exist})
    })
    .on('end', async () => {
        console.log(tab.length)
        const ws = fs.createWriteStream(pathFileResult)
        fastcsv
          .write(tab, { headers: true })
          .pipe(ws)
    })
}
 verifyUrlsExistence("./files/EXPOSANT_AVEC_SITEWEB.csv", "./results/urls_existence.csv", "NOM", "SRV_INTERNET")
/*const tab1 = []
const tab2 = []

fs.createReadStream("./results/urls_existence.csv")
.pipe(csv())
.on('data', async (row) => {
  tab1.push(row)
})
.on('end', async () => {
  fs.createReadStream("./files/EXPOSANT2.csv")
  .pipe(csv())
  .on('data', async (row2) => {
    if(!(tab1.find(element=>element["nom_exposant"]== row2["NOM"] && element["siteweb"] == row2["SRV_INTERNET"]))){
      tab2.push(row2)
    } 
  })
  .on('end', async () => {
    const ws = fs.createWriteStream("./files/EXPOSANT_AVEC_SITEWEB.csv")
    fastcsv
      .write(tab2, { headers: true })
      .pipe(ws)  
  })
})
*/