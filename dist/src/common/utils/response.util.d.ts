export declare const success: (data: any, message?: string) => {
    success: boolean;
    message: string;
    data: any;
};
export declare const failure: (message?: string, errors?: any) => {
    success: boolean;
    message: string;
    errors: any;
};
