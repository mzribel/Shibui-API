export class SessionResponseDto {
    constructor(
        public readonly accessToken:string,
        public readonly tokenType:string,
        public readonly expiresIn:number,
        public readonly expiresAt:number|undefined,
        public readonly refreshToken:string
    ){}
}