import { AxiosInstance } from "axios";
import chalk from 'chalk';
import Http from "../../../core/http";
import { EbayItem } from "../../../model/item/EbayItem";

class EbayGetInformationUrls {

    private http: AxiosInstance;

    constructor(public uris: Array<string>, public accessToken: string) {
        this.getItemIds = this.getItemIds.bind(this);
        this.http = Http.getInstance();
    }
    
    public async exec() {
        const itemIds = this.getItemIds();
        const itemUri = 'https://api.ebay.com/buy/browse/v1/item/get_item_by_legacy_id';
        try {
            const promises = itemIds.map(async (itemId) => {
                const response = await this.http.get(itemUri, {
                    params: {
                        legacy_item_id: itemId
                    },
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`
                    }
                });
                const data: EbayItem = response.data;
                const condition = data?.condition;
                const state = data?.estimatedAvailabilities?.[0];
                const sold = state?.estimatedSoldQuantity;
                console.log(`${chalk.gray('[INFO]')} - ${chalk.green(new Date().toString())} - ${data?.title} - ${chalk.bold(`Condition: ${condition}`)} - ${chalk.green.bold(`Sold: ${sold}`)}`)
                return {
                    ...data,
                    uri: itemUri
                };
            });
            return await Promise.all(promises);
        } catch(err) {
            console.log(EbayGetInformationUrls.name, err);
        }
    }

    public getItemIds() {
        const parseUris = this.uris.reduce<string[]>((acc, item) => {
            const uri = new URL(item);
            const path = uri.pathname;
            const splitter = path.split('/');
            const id = splitter[splitter.length - 1];
            const itemId = +id;
            if(isNaN(itemId)) {
                return acc;
            }
            return [...acc, id];
        }, []);
        return parseUris;
    }
}

export default EbayGetInformationUrls;