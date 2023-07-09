import {EmbeddedAppCodeVariables, EmbeddedCodeResponse} from "@/interfaces/interfaces";
import {embeddedAppCodeMutationFragment} from "@/gql/mutations/embeddedAppCode";

export async function getEmbeddedAppCodeResponse(variables: EmbeddedAppCodeVariables) {
    const requestBody = {
        query: embeddedAppCodeMutationFragment,
        variables: variables
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    };

    try {
        const result = await fetch(new URL(process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_URL!), requestOptions);
        const { data, errors }: EmbeddedCodeResponse = await result.json();

        if (errors?.length) {
            throw new Error(errors.map(message => message).join(', '));
        }

        return data?.embeddedAppCode?.code;
    } catch (err) {
        console.error('Something went wrong...', err);

        return '';
    }
}