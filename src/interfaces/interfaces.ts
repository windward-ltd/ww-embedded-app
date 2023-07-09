export type Metadata = {
    tenantId: string;
}

export type EmbeddedAppCodeVariables = {
    clientId: string;
    clientSecret: string;
    metadata?: Metadata;
}

export type EmbeddedCodeResponse = {
    data: {
        embeddedAppCode: {
            code: string;
        }
    };
    errors?: Array<{ message: string }>;
};