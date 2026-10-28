import { Page } from "puppeteer";
import Scanner from "../../../core/scanner";

class ScannerEbay {
    
    constructor(private scanner: Scanner) {

    }
    
    public async scanEbay() {
        let page: Page | undefined;
        try {
            page = await this.scanner.scan();
            if (!page) {
                return;
            }
            console.log(await page.content())
        } catch (err) {

        } finally {
            if (page) {
                await page.close();
            }
        }
    }
}

export default ScannerEbay;