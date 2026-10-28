import EbayAuthToken from 'ebay-oauth-nodejs-client';
import Http from '../../http';

class EbayAuth {
    public static _instance: EbayAuthToken;
    private static http = Http.getInstance();
    private static currentToken: string;
    private static expireTime: number;

    public static getInstance() {
        const { EBAY_CLIENT_ID, EBAY_CLIENT_SECRET_ID } = process.env;
        if(!EBAY_CLIENT_ID || !EBAY_CLIENT_SECRET_ID) {
            throw new Error('EBAY_CLIENT_ID and EBAY_CLIENT_SECRET_ID is required');
        }
        if (!this._instance) {
            this._instance = new EbayAuthToken({
                clientId: EBAY_CLIENT_ID,
                clientSecret: EBAY_CLIENT_SECRET_ID
            })
            return this._instance;
        }
        return this._instance;
    }

    public static async getAuthToken() {
        const { EBAY_PROD_CLIENT_ID, EBAY_PROD_CLIENT_SECRET_ID } = process.env;
        const credentials = Buffer.from(
            `${EBAY_PROD_CLIENT_ID}:${EBAY_PROD_CLIENT_SECRET_ID}`
        ).toString("base64");

        if (Date.now() < this.expireTime && this.currentToken) {
            return this.currentToken;
        }

        try {
            const response = await this.http.post(
                'https://api.ebay.com/identity/v1/oauth2/token',
                new URLSearchParams({
                    grant_type: "client_credentials",
                    scope: "https://api.ebay.com/oauth/api_scope",
                }),
                {
                    headers: {
                        Authorization: `Basic ${credentials}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    }
                }
            )
            const expiresIn = response.data?.expires_in;
            const token = response.data?.access_token;
            this.expireTime = Date.now() + expiresIn * 1000;
            this.currentToken = token;
            return this.currentToken;
        } catch(err) {
            console.log(EbayAuth.name, err);
        }
    }
}

export default EbayAuth;