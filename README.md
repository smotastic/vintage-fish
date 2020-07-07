# vintage-fish
Tool to log the spent time on different Tasks

# Architectural Design

## Task
A task contains the following attributes:
* summary -> A summary of the task
* description -> A brief description of the done task
* adapterType -> Type to see by which adapter the task was created by
* started -> Time when the task is started
* finished -> Time when the task has stopped
* spentTimes -> An array of the previously spent times on this task ( a task can be stopped and resumed multiple times)
* running -> marks a task as "currently running"

# Functional Requirements

## Creating Tasks
Tasks can be created in a few different ways, and these tasks are handled differently depending on the way they were created.

### Create Task Manually (Manual Adapter)
A task can be manually added by the user.
The user has to provide at least a summary for this task.

Optionally the user can define a "started" time for this task. This will ensure that this task will be automatically started at the defined time (see *Automatically Start Task*)
Also a "stopped" time for this task can be defined, which will ensure that this task will be automatically stopped (see *Automatically End Task*)

Otherwise a manual added task, has to be started manually, there are no automatism to start or end such a task.

### Import Outlook Appointments (Outlook Adapter)
Multiple tasks can be imported by the users outlook calendar.
For each calendar appointment entry a task with the following attributes will be created:
* summary -> the title of the appointment
* description -> the description of the appointment
* started -> the start time of the appointment (ensures that this task is automatically started, see *Automatically Start Task*)
* stopped -> the stop time of the appointment (ensures that this task is automatically stopped, see *Automatically End Task*)


### Track Git Branches (Githook Adapter)
TODO

## Manually Start Task

A task, which is not running can be started / resumed.

The "started" attribute of this task will be set to the current time.
The "running" attribute of this task will be set to true.

## Manually Stop Task
A task, who is currently running, can be stopped.

The "stopped" attribute of this task will be set to the current time.

The current "started" and "stopped" time will also be added to the spentTimes array as a new object-entry. This will ensure that this task can be resumed again, and the previously spent time is not lost for the final time tracking.

The "started" and "stopped" time will then be emptied for this task, so it can be potentially resumed again.

The "running" attribute of this task will be set to false.


## Automatically Start Task
A task will be automatically started, if the user previously set a "started" time in the future for this task.

To find a task that has to be potentially started a poll will check every minute if a task should be automatically started. A task should be started if his "started" time is equals to the current time. 

A task can only be automatically started if no other task is currently running.
If a task should be started, but cannot, a warning is shown to the user.

If a task can be started, all conditions of ***Manually Start Task*** are applied as well.


## Automatically Stop Task
A running task will be automatically stopped, if the user previously set a "stopped" time in the future for this task.

To find a task that has to be potentially stopped a poll will check every minute if a task should be automatically stopped. A task should be stopped if his "stopped" time is equals to the current time. 

If the task will be stopped, all conditions of ***Manually Stop Task*** are applied as well.

## Log Task in Jira
Every task, which provides a ticketnumber in the summary, can be logged to a previously configured jira system.

### Configuration of Jira

### Parsing the ticketnumber

### Logging to Jira


# Nice to have
## Automatically create Jira Tasks
When a task is created without a ticketnumber in the summary, the application will ask you if you want to create a jiratask for this task.

## CLI 
CLI to create tasks via shell