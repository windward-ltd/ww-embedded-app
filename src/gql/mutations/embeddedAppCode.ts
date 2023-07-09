export const embeddedAppCodeMutationFragment = `
            mutation embeddedAppCode(
                $clientId: String!
                $clientSecret: String!
                $metadata: EmbeddedAppCodeMetadata
            ) {
                embeddedAppCode(
                    clientId: $clientId,
                    clientSecret: $clientSecret
                    metadata: $metadata
                ) {
                    code
                }
            }
`;