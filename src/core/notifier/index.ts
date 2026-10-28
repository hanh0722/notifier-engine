import notifier, { NodeNotifier } from 'node-notifier';

class Notifier {
    private static _instance: NodeNotifier;

    public static getInstance() {
        if(!this._instance) {
            this._instance = notifier;
            return this._instance;
        }

        return this._instance;
    }
}

export default Notifier;
