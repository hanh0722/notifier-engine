import * as cherrio from 'cheerio';
import Http from '../http';
import axios from 'axios';

class Scraft {
    constructor(public uri: string) {}

    public async load() {
        try {
            console.log(await axios.get(this.uri))
            // const http = Http.getInstance();
            // const content = await http.get(this.uri, {
            //     headers: {
            //         responseType: 'text',
            //         Accept:
            //         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            //         "Accept-Language": "en-US,en;q=0.9",
            //         "Upgrade-Insecure-Requests": "1",
            //     }
            // });
            // if(content.data && content.data instanceof String) {
            //     return cherrio.load(content.data as string);
            // }
        } catch (err) {
            console.log(Scraft.name, err);
        }
    }
}

export default Scraft;