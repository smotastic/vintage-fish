import { LocalStorage } from 'quasar'
import { today } from '../util'
import Codes from '../codes'

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
            currentTasks.push(copiedTask);

            LocalStorage.set(key, currentTasks);
            resolve(Codes.success.TASK_CREATE(copiedTask));
        } else {
            reject(Codes.errors.TASK_CREATE_ALREADYEXISTS(task))
        }
    });
}

export const readToday = () => {
    return new Promise((resolve, reject) => {
        const key = today();
        resolve(LocalStorage.getItem(key) || []);
    });
}
