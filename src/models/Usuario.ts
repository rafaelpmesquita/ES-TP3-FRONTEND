export default class Usuario {
    public username!: string;
    public password!: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
