import BaseError from "./baseError";

export default class BusinessError extends BaseError {
    constructor(errorMessage) {
        super({            
            message: errorMessage,
            name: 'BusinessError'
        })
    }
}