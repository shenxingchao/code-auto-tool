import Datastore from 'nedb'
// import path from 'path'
// import { remote } from 'electron'

type Query<T> = Partial<T> & {
  [prop: string]: string
}

// type 类似于interface 但是是用=号
// & 相当于extends 一个接口
// 使用 [prop: string] 定义了任意属性取 string 类型的值。其他属性必须是string的字书写
// Partial<T> 相当于解构 T {a:string|undefined,b:number|undefined}

class Db<T> {
  //db属性
  db: Datastore

  //构造方法
  constructor() {
    this.db = new Datastore({
      autoload: true,
      filename: './dbtmp.db' //path.join(__dirname, './dbtmp.db')  //path.join(remote.app.getPath('userData'), './dbtmp.db')
    })
  }

  /**
   * 新增一条或多条记录
   * @param data | array | object 数据对象或数组
   * @returns 新增的数据
   */
  insert(data: T): Promise<T> {
    return new Promise((reslove, reject) => {
      this.db.insert(data, function (err: any, newDoc: T) {
        if (err) return reject(err)
        reslove(newDoc)
      })
    })
  }

  /**
   * 查找符合条件的所有数据
   * @param query | object 查找条件
   * @returns 数据集
   */
  find(query: Query<T>): Promise<T[]> {
    return new Promise((reslove, reject) => {
      this.db.find(query, function (err: any, docs: T[]) {
        if (err) return reject(err)
        reslove(docs)
      })
    })
  }

  /**
   * 查找符合条件的一条记录 例如查找ID
   * @param query | object 查找条件
   * @returns 一条记录
   */
  findOne(query: Query<T>): Promise<T> {
    return new Promise((reslove, reject) => {
      this.db.findOne(query, function (err: any, doc: T) {
        if (err) return reject(err)
        reslove(doc)
      })
    })
  }

  // count(query: Query<T>): Promise<number> {
  //   return new Promise((res, rej) => {
  //     this.db.count(query, function (err, amount) {
  //       if (err) return rej(err)
  //       res(amount)
  //     })
  //   })
  // }

  // update(query: Query<T>, update: Partial<T>, options: UpdateOptions = {}): Promise<number> {
  //   return new Promise((res, rej) => {
  //     this.db.update(query, update, options, function (err, numAffected) {
  //       if (err) return rej(err)
  //       res(numAffected)
  //     })
  //   })
  // }

  // remove(query: Query<T>, options?: RemoveOptions): Promise<number> {
  //   return new Promise((res, rej) => {
  //     this.db.remove(query, options, function (err, numRemoved) {
  //       if (err) return rej(err)
  //       res(numRemoved)
  //     })
  //   })
  // }
}

export default new Db()
// export default new Db().db  db是nedb的属性 调用时候用ctx.$db.insert()
