export const mockEmbeddedAppCode = 'mockEmbeddedAppCode';

export const mockVariables = {
    clientId: process.env.EMBEDDED_APP_SCRIPT_CLIENT_ID!,
    clientSecret: process.env.EMBEDDED_APP_SCRIPT_CLIENT_SECRET!,
    metadata: {
        tenantId: "tenantId_demo"
    }
};

export const mockResponse = {
    data: {
        embeddedAppCode: {
            code: mockEmbeddedAppCode,
        },
    },
    errors: null,
};

export const mockErrorMessage = 'Mock error message';
export const mockErrorResponse = {
    errors: [
        {
            message: mockErrorMessage,
        },
    ],
};

