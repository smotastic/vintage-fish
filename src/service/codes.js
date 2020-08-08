export const errors = {
    // 0..1000 = CRUD Errors
    TASK_CREATE_ALREADYEXISTS: (task) => ({
        msg: `The task with the summary '${task.summary}' already exists`,
        object: task,
        code: 0
    })
}

export const success = {
    // 0..1000 = CRUD Successes
    TASK_CREATE: (task) => ({
        msg: `The task '${task.summary}' was successfully created`,
        object: task,
        code: 0
    })
}

export default { errors, success }
