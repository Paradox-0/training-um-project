export class User {
    constructor(
        public userName: string,
        public userId: number,
        private _token: string,
        public expirationDate: Date,
        public roleName?: string,
    ) { }

    get token() {
        if (!this.expirationDate || new Date() > this.expirationDate) {
            console.log('no user');
            return null;
        }
        console.log('user yes');
        return this._token;
    }
}