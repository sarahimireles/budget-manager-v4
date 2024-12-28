import {
  ref,
  push,
  set,
  update,
  remove,
  get,
  Database,
} from "firebase/database"

// Class that serves as a base for all services
export abstract class ServiceBase<T extends object> {
  protected db: Database
  protected userId: string
  protected serviceUrl: string | undefined

  constructor(db: Database, userId: string | undefined) {
    this.db = db
    this.userId = userId || ""
  }

  protected getAllRef() {
    return ref(this.db, `${this.userId}/${this.serviceUrl}`)
  }

  protected getSingleRef(objectId: string) {
    return ref(this.db, `${this.userId}/${this.serviceUrl}/${objectId}`)
  }

  // Convert object to T and add key
  private mapWithKey(key: string, value: T): T {
    return {
      ...value,
      key,
    }
  }

  // Return all T objects
  async getAll(): Promise<T[] | null> {
    const snapshot = await get(this.getAllRef())
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([key, value]) =>
        this.mapWithKey(key, value as T)
      )
    } else {
      return null
    }
  }

  // Create a new object
  async create(data: T): Promise<string | null> {
    const typeRef = push(this.getAllRef())
    await set(typeRef, data)
    return typeRef.key
  }

  // Read a single T object by ID
  async getById(objectId: string): Promise<T | null> {
    const snapshot = await get(this.getSingleRef(objectId))
    if (snapshot.exists()) {
      return this.mapWithKey(objectId, snapshot.val())
    } else {
      return null
    }
  }

  // Update
  async update(objectId: string, updatedData: T): Promise<void> {
    await update(this.getSingleRef(objectId), updatedData)
  }

  // Delete
  async delete(objectId: string): Promise<void> {
    await remove(this.getSingleRef(objectId))
  }
}
