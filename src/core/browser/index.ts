import puppeteer, { Browser as BrowserContext } from "puppeteer";

class Browser {
    private static _browser: BrowserContext;

    public static async getBrowser() {
        if (!this._browser) {
            this._browser = await puppeteer.launch({
                executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
                headless: true,
            });
            return this._browser;
        }
        return this._browser;
    }

    public static close() {
        if(!this._browser) {
            return;
        }
        this._browser.close();
    }
}

export default Browser;