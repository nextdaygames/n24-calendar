import axios from "axios";

export default class BackendClient {
    
    static #request(url, method, body, thenCallback, catchCallback) {
        if (thenCallback === null || thenCallback === undefined) {
            thenCallback = (response) => {}
        } 
        if (catchCallback === null || catchCallback === undefined) {
            catchCallback = (requestError) => {console.log(requestError)}
        } 
        var baseUrl = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://127.0.0.1:5000" : "https://nextdaygames-storefront.herokuapp.com"
        var uri = baseUrl + url
        var config = {
            method: method.toUpperCase(),
            url: uri,
            headers: { 
                'Content-Type': 'application/json'
            },
        };

        if (body !== null) {
            config["data"] = JSON.stringify(body);
        }

        axios(config)
        .then(thenCallback)
        .catch(catchCallback)
    }

    static getProducts(thenCallback, catchCallback) {
        this.#request('/products', "Get", null, thenCallback, catchCallback)
    }

    static createCart(thenCallback, catchCallback) {
        this.#request('/gamecrafter/cart', "POST", null, thenCallback, catchCallback)
    }

    static addSkuToCart(cartId, skuId, thenCallback, catchCallback) {
        var url = '/gamecrafter/cart/' + encodeURIComponent(cartId) + '/sku/' + encodeURIComponent(skuId)
        this.#request(url, "POST", null, thenCallback, catchCallback)
    }

    static getCart(cartId, thenCallback, catchCallback) {
        var url = '/gamecrafter/cart/' + cartId
        this.#request(url, 'GET', null, thenCallback, catchCallback)
    }    

    static getCartItems(cartId, thenCallback, catchCallback) {
        var url = '/gamecrafter/cart/' + cartId + "/items"
        this.#request(url, 'GET', null, thenCallback, catchCallback)
    }   

    static launchBilling(cartId,thenCallback,catchCallback) {
        var url = '/physical-games/create-checkout-session/' + cartId 
        this.#request(url, "POST", null, thenCallback, catchCallback)
    }

    static modifyCartSkuQuantityByValue(cartId, skuId, value, thenCallback, catchCallback) {
        var url = '/gamecrafter/cart/' + encodeURIComponent(cartId) + '/skus'
        var body = {
            "productQuantities": {
                [skuId]: value
            }
        }
        this.#request(url, "PUT", body, thenCallback, catchCallback)
    }
}