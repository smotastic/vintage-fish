export const errors = {
    TASK_CREATE_ALREADYEXISTS: (task) => ({
        msg: `The task with the summary '${task.summary}' already exists`,
        object: task,
        code: 0
    }),
    TASK_START_ALREADYRUNNING: (task) => ({
        msg: `The task '${task.summary}' is already running`,
        object: task,
        code: 100
    }),
    TASK_STOP_ALREADYSTOPPED: (task) => ({
        msg: `The task '${task.summary}' is already stopped`,
        object: task,
        code: 101
    }),
    TASK_START_ANOTHERTASKISRUNNING: (task, runningTask) => ({
        msg: `The task '${task.summary}' cannot be started, as task '${runningTask.summary}' is already running`,
        object: task,
        code: 102
    }),
    UNKNOWN_ERROR: (e) => ({
        msg: `An unkown error ${e} occured`,
        code: 999
    })

}

export const success = {
    TASK_CREATE: (task) => ({
        msg: `The task '${task.summary}' was successfully created`,
        object: task,
        code: 1000
    }),
    TASK_UPDATE: (task) => ({
        msg: `The task '${task.summary}' was successfully updated`,
        object: task,
        code: 1001
    }),
    TASK_STARTED: (task) => ({
        msg: `The task '${task.summary}' was successfully started`,
        object: task,
        code: 1002
    }),
    TASK_STOPPED: (task) => ({
        msg: `The task '${task.summary}' was successfully stopped`,
        object: task,
        code: 1003
    })
}

export default { errors, success }
