import { LocalStorage } from 'quasar'

export const create = (task) => {
    console.log(task);
    LocalStorage.set("heute", task);
}
