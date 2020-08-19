export function changeTask(state, task) {
    state.summary = task.summary;
    state.starttime = task.starttime;
    state.id = task.id;
}
