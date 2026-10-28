import cronjob, { ScheduledTask, TaskFn } from 'node-cron';

class Cronjob {

    private task: ScheduledTask | undefined;

    constructor(private expression: string) {};
    
    public exec(handler: TaskFn) {
        try{
            this.task = cronjob.schedule(this.expression, handler);
        }catch(err) {
            console.log(Cronjob.name, err);
        }
    }

    public getTask() {
        return this.task;
    }
}

export default Cronjob;