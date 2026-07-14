export default interface ApiMailConfiguration {
    mailer: string;
    scheme: string;
    host: string;
    port: number;
    username: string;
    password: string;
    from_address: string;
    from_name: string;
}