export class Session {
    constructor(
        public readonly provider:string,
        public readonly externalUserId:string,
        public readonly email:string,
        public readonly accessToken:string,
        public readonly tokenType:string,
        public readonly expiresIn:number,
        public readonly expiresAt:number|undefined,
        public readonly refreshToken:string
    ){}
}