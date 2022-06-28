import { getDb, setDb} from "./db";

export const createTask = async(album) => {
    const dbLocal = [...getDb(), album];
    await setDb(dbLocal);
    return album;
}

export const getListTask = async() => {
    return await getDb();
}

export const deleteItem = async(id) => {
    const db = await getDb();
    const newList = db.filter(item => item.id !== id);
    return setDb(newList);
}

export const updateTask = async(id) => {
    const db = await getDb();
    const indexList = db.findIndex(item => item.id === id);
    db[indexList].marked = !db[indexList].marked;
    return setDb(db);
}