import express from 'express';
import path from 'path';
import fs from 'fs';
import Cronjob from './core/cronjob';
import EbayAuth from './core/auth/ebay';
import EbayGetInformationUrls from './domain/ebay/EbayGetInformationUrls';
import EbayNotifierAvailable from './domain/ebay/EbayNotifierAvailable';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uris = process.env.URIS;

const watcher = new Cronjob('*/30 * * * * *');

watcher.exec(async (context) => {
    const uriItems = uris?.split(',');
    if(!uriItems || uriItems?.length === 0) {
        return;
    }
    const accessToken = await EbayAuth.getAuthToken();
    if(!accessToken) {
        return;
    }
    const service = new EbayGetInformationUrls(uriItems, accessToken);
    const items = await service.exec();
    if(!items) {
        return;
    }
    const sounds = path.join(__dirname, '/assets/sound.mp3');
    const isExistedPath = fs.existsSync(sounds);
    const notifierAvailable = EbayNotifierAvailable.getInstance();
    notifierAvailable.exec(items, {
        sound: isExistedPath ? 'sound' : undefined
    });
})


app.listen(process.env.PORT || 3000);