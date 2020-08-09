import Codes from '../codes';
import { readToday, update } from './local.crud';
import { now } from '../util';

export const startTask = async (task) => {
    const allTasks = await readToday();
    return new Promise((resolve, reject) => {
        // a running task cannot be started again
        if (task.running) {
            reject(Codes.errors.TASK_START_ALREADYRUNNING(task));
        } else {
            // check for any other running tasks
            const alreadyRunningTask = allTasks.find(t => t.running);
            if (alreadyRunningTask) {
                reject(Codes.errors.TASK_START_ANOTHERTASKISRUNNING(task, alreadyRunningTask));
            } else {
                // set task to running
                try {
                    const updatingTask = { ...task };
                    updatingTask.running = true;
                    updatingTask.starttime = now();
                    updatingTask.endtime = "";
                    update(updatingTask).then(code => {
                        resolve(Codes.success.TASK_STARTED(code.object));
                    });
                } catch (e) {
                    reject(Codes.errors.UNKNOWN_ERROR(e));
                }
            }
        }
    });
}

export const stopTask = (task) => {
    return new Promise((resolve, reject) => {
        if (!task.running) {
            reject(Codes.errors.TASK_STOP_ALREADYSTOPPED(task));
        } else {
            const updatingTask = { ...task };
            updatingTask.running = false;
            updatingTask.endtime = now();
            // TODO add to spenttimes
            update(updatingTask).then(code => {
                resolve(Codes.success.TASK_STOPPED(code.object));
            });
        }
    });
}

export default { startTask, stopTask }
