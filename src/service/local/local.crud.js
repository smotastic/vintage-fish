import { LocalStorage } from 'quasar'
import { today } from '../util'
import Codes from '../codes'

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const create = async (task) => {
    const existing = await readToday();
    return new Promise((resolve, reject) => {
        const alreadyExisting = existing.some(e => task.summary === e.summary);
        if (!alreadyExisting) {
            const key = today();
            let currentTasks = LocalStorage.getItem(key);
            if (!currentTasks) {
                currentTasks = [];
            }
            const copiedTask = { ...task };
            copiedTask.id = uuidv4();
            currentTasks.push(copiedTask);

            LocalStorage.set(key, currentTasks);
            resolve(Codes.success.TASK_CREATE(copiedTask));
        } else {
            reject(Codes.errors.TASK_CREATE_ALREADYEXISTS(task))
        }
    });
}

export const update = async (task) => {
    const existing = await readToday();
    return new Promise((resolve, reject) => {
        const updatingTask = existing.find(t => t.id === task.id);
        if (updatingTask) {
            // update
            const index = existing.indexOf(updatingTask);
            const key = today();
            const taskCopy = { ...task };
            existing[index] = taskCopy;
            LocalStorage.set(key, existing);
            resolve(Codes.success.TASK_UPDATE(taskCopy));
        } else {
            // create
            create(task).then(resolve).catch(reject);
        }
    });
}

export const readToday = () => {
    return new Promise((resolve, reject) => {
        const key = today();
        const l = LocalStorage.getItem(key);
        resolve(l ? [...l] : []);
    });
}
