import {getEmbeddedAppCodeResponse} from "@/utils/utils";
import {embeddedAppCodeMutationFragment} from "@/gql/mutations/embeddedAppCode";
import {mockVariables, mockEmbeddedAppCode, mockResponse, mockErrorResponse} from "@/utils/mocks";

describe('getEmbeddedAppCodeResponse', () => {
    it('should return the embedded app code when successful', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });
        global.fetch = mockFetch;

        const result = await getEmbeddedAppCodeResponse(mockVariables);
        expect(result).toBe(mockEmbeddedAppCode);

        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(URL),
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: embeddedAppCodeMutationFragment,
                    variables: mockVariables,
                }),
            })
        );
    });

    it('should return empty string if errors are thrown', async () => {
        const mockFetch = jest.fn().mockRejectedValue({
            json: jest.fn().mockRejectedValue(mockErrorResponse),
        });
        global.fetch = mockFetch;

        const result = await getEmbeddedAppCodeResponse(mockVariables);
        expect(result).toBe('');
    });
});
