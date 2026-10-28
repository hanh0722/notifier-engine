export type EstimatedAvailabilityStatus = 'IN_STOCK' | 'OUT_OF_STOCK';

export interface EstimatedAvailable {
    deliveryOptions: string[];
    estimatedAvailabilityStatus: EstimatedAvailabilityStatus;
    estimatedAvailableQuantity: number;
    estimatedSoldQuantity: number;
    estimatedRemainingQuantity: number;
}

export interface EbayItemImage {
    imageUrl: string;
}

export interface EbayItem {
    estimatedAvailabilities: EstimatedAvailable[];
    image: EbayItemImage;
    itemId: string;
    title: string;
    condition: string;
    uri: string;
}
