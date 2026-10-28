import Scraft from "../../../core/scraft";

class ScraftEbay {
    constructor(private scraftInstance: Scraft) {}

    public async checkAvailable() {
        try{
            const $ = await this.scraftInstance.load();
            // console.log($?.html());
        }catch(err) {
            console.log(ScraftEbay.name, err)
        }
    }
}

export default ScraftEbay;