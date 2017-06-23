export class DelayedTask {
    private timeoutID:number;

    constructor(
        private readonly func:Function,
        private readonly ms:number
    ) {}

    delay() {
        this.cancel();
        this.timeoutID = setTimeout(this.func, this.ms);
    }

    run() {
        this.cancel();
        this.func();
    }

    cancel() {
        clearTimeout(this.timeoutID);
    }
}
