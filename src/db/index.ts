import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), './dbtmp.db') //path.join(__dirname, './dbtmp.db')
})
export default db
