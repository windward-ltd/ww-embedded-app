import { render } from '@testing-library/react';
import Index, { getServerSideProps, WINDWARD_EMBEDDED_SCRIPT_ID, WINDWARD_EMBEDDED_CLASSNAME } from '../pages/index';
import * as utils from '@/utils/utils';
import {mockEmbeddedAppCode} from "@/utils/mocks";

const DATA_TENANT_CODE_ATTR = 'data-tenant-code';

jest.mock('../utils/utils', () => ({
    getEmbeddedAppCodeResponse: jest.fn()
}));

describe('Index page', () => {
    beforeAll(() => {
        jest.spyOn(utils, 'getEmbeddedAppCodeResponse').mockResolvedValue(mockEmbeddedAppCode);
    });

    it('renders the embedded app code', async () => {
        const { container } = render(<Index code={mockEmbeddedAppCode} searchTerms={''} filters={''} />);

        const divElement = container.querySelector(`.${WINDWARD_EMBEDDED_CLASSNAME}`);
        expect(divElement).toBeInTheDocument();
        expect(divElement).toHaveAttribute(
            DATA_TENANT_CODE_ATTR,
            mockEmbeddedAppCode
        );

        setTimeout(() => {
            const scriptElement = container.querySelector(`script[data-id="${WINDWARD_EMBEDDED_SCRIPT_ID}"]`);
            expect(scriptElement).toBeInTheDocument();
            expect(scriptElement).toHaveAttribute(
                'src',
                `${process.env.NEXT_PUBLIC_EMBEDDED_APP_SCRIPT_ORIGIN}/embed.min.js`
            );
        }, 0)
    });

    it('fetches the embedded app code', async () => {
        const { props } = await getServerSideProps();

        expect(props.code).toBe(mockEmbeddedAppCode);
    });
});