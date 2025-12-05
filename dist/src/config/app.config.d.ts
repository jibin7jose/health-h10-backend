declare const _default: () => {
    port: number;
    jwt: {
        secret: string;
        expiration: string;
    };
    database: {
        url: string | undefined;
    };
};
export default _default;
