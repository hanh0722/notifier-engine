import { Browser } from "puppeteer";

class Scanner {
    constructor(public browser: Browser, public uri: string) {}

    public async scan() {
        try{
            const page = await this.browser.newPage();
            await page.setViewport({
                width: 1080,
                height: 1024
            });
            const response = await page.goto(this.uri, {
                waitUntil: 'networkidle0',
                timeout: 60000,
            });
            console.log({
            status: response?.status(),
            ok: response?.ok(),
            url: page.url(),
            title: await page.title(),
            contentType: response?.headers()["content-type"],
            });

            await page.screenshot({
    path: "/tmp/ebay-debug.png",
    fullPage: true,
});
            return page;
        }catch(err) {
            console.log(`[${Scanner.name}]`, err);
        }
    }
}

export default Scanner;