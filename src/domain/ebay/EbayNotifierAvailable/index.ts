import Notifier from "../../../core/notifier";
import { EbayItem } from "../../../model/item/EbayItem";

export interface EbayNotifierAvailableOptions {
    sound?: string;
}

class EbayNotifierAvailable {
    private cachingItem: Record<string, string> = {};
    private notifier = Notifier.getInstance();
    private static _instace: EbayNotifierAvailable;

    public static getInstance() {
        if (this._instace) {
            return this._instace;
        }
        this._instace = new EbayNotifierAvailable();
        return this._instace;
    }

    public exec(items: EbayItem[], opts?: EbayNotifierAvailableOptions) {
        items.forEach(item => {
            const { itemId, image, estimatedAvailabilities, title, condition, uri } = item;
            const state = estimatedAvailabilities?.[0];
            const estimatedAvailabilityStatus = state?.estimatedAvailabilityStatus;

            const isOutOfStock = estimatedAvailabilityStatus === 'OUT_OF_STOCK';
            if(isOutOfStock) {
                this.cachingItem[itemId] = 'OUT_OF_STOCK';
                return;
            }
            const isNotified = this.cachingItem?.[itemId] === estimatedAvailabilityStatus;
            if(isNotified) {
                return;
            }
            this.cachingItem[itemId] = estimatedAvailabilityStatus;
            this.notifier.notify({
                sound: opts?.sound || 'Tink',
                open: uri,
                subtitle: title,
                contentImage: image?.imageUrl,
                message: [
                    `Available: ${state?.estimatedAvailableQuantity || 0}`,
                    `Sold: ${state?.estimatedSoldQuantity}`,
                    `Condition: ${condition}`,
                ].join('\n'),
            });
        })
    }
}

export default EbayNotifierAvailable;