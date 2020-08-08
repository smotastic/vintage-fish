import { Notify } from 'quasar'

const notify = function (type, msg) {
    Notify.create({
        message: msg, type
    });
}

export const success = function (msg) {
    notify('positive', msg);
}

export const error = function (msg) {
    notify('negative', msg);
}

export default { success, error }
