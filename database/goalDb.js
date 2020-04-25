class GoalDB {
  static get DB_NAME() {
    return 'goal-db'
  }

  static get GOALS_STORE_NAME() {
    return 'goals'
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this)
        return
      }
      const req = indexedDB.open(GoalDB.DB_NAME)

      req.onupgradeneeded = (event) => {
        const db = event.target.result
        db.createObjectStore(GoalDB.GOALS_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        })
      }

      req.onsuccess = (event) => {
        this.db = event.target.result
        resolve(this)
      }
    })
  }

  getTransaction(stores, readWrite = 'readwrite') {
    return this.db.transaction(stores, readWrite)
  }

  goalGoalsStore() {
    return this.getTransaction([GoalDB.GOALS_STORE_NAME]).objectStore(
      GoalDB.GOALS_STORE_NAME
    )
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const goals = []
      const store = this.goalGoalsStore()
      store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          goals.push(cursor.value)
          cursor.continue()
        }
        resolve(goals)
      }
      store.openCursor().onerror = (err) => {
        reject(err)
      }
    })
  }

  add(goal) {
    return new Promise((resolve, reject) => {
      const req = this.goalGoalsStore().add(goal)
      req.onsuccess = () => {
        goal.id = req.result
        resolve(goal)
      }
      req.onerror = (err) => {
        reject(err)
      }
    })
  }

  put(goal) {
    return new Promise((resolve, reject) => {
      const req = this.goalGoalsStore().put(goal)
      req.onsuccess = () => {
        resolve(goal)
      }
      req.onerror = (err) => {
        reject(err)
      }
    })
  }

  remove(goalId) {
    this.goalGoalsStore().delete(goalId)
  }
}

export default new GoalDB()
