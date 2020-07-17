import { LocalStorage } from 'quasar'
import { today } from '../util'

export const create = (task) => {
    const key = today();
    let currentTasks = LocalStorage.getItem(key);
    if (!currentTasks) {
        currentTasks = [];
    }
    currentTasks.push(task);
    LocalStorage.set(key, currentTasks);
}

export const readToday = () => {
    const key = today();
    return LocalStorage.getItem(key) || [];
}
