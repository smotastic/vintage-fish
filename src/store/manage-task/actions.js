import Service from '../../service/';

export function startTask(context, task) {
    return new Promise((resolve, reject) => {
        Service.startTask(task).then(code => {
            context.commit("changeTask", code.object);
            resolve(code);
        }).catch(reject);
    });
}

export function stopTask(context, task) {
    return new Promise((resolve, reject) => {
        Service.stopTask(task).then(code => {
            context.commit("changeTask", {});
            resolve(code);
        }).catch(reject);
    });
}

export function create(context, task) {
    return new Promise((resolve, reject) => {
        Service.create(task)
            .then(code => {
                resolve(code);
            }).catch(reject);
    });
}

export function update(context, task) {
    return new Promise((resolve, reject) => {
        Service.update(task)
            .then(code => {
                // running task changed
                if (code.object.id === context.state.id) {
                    context.commit("changeTask", code.object)
                }
                resolve(code);
            }).catch(reject);
    });
}
