import {getEmbeddedAppCodeResponse} from "@/utils/utils";
import type {InferGetServerSidePropsType} from 'next';
import Script from "next/script";
import {isEmpty, omitBy} from "lodash";
import {useSearchParams} from "next/navigation";

export const WINDWARD_EMBEDDED_CLASSNAME = 'windward-embedded';
export const WINDWARD_EMBEDDED_SCRIPT_ID = 'windward-embedded-script';

const windwardEmbeddedDivStyle = {
    height: '800px',
    border: "2px solid black"
};

const FILTERS_URL_PARAM = 'filters';
const SEARCH_TERMS_PARAM = 'searchTerms';

// The following object contains a mapping of the available filter names and their url params.
// {
//     'Arriving soon (1-3 days)': 'soon',
//     'Arrived': 'arrived',
//     'Tracking completed': 'trackingCompleted',
//     'Rollover at PO':'RLV_POL',
//     'Rollover at TSP': 'RLV_TSP',
//     'Late departure': 'LTD',
//     'Transshipment delay': 'TSD',
//     'Insufficient T/S time': 'ITT',
//     'Routing deficiency': 'RDF',
//     'Late allocation': 'FVD',
//     'On Time': 'ot',
//     'Early (1+ days)': 'early',
//     'Significant delay (1-4 days)': 'sgndl',
//     'Critical delay (5+ days)': 'crtdl',
// }

function Index({code}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const searchParams = useSearchParams();

    const filters = searchParams?.get(FILTERS_URL_PARAM);
    const searchTerms = searchParams?.get(SEARCH_TERMS_PARAM);

    const urlParams = new URLSearchParams(omitBy({ filters, searchTerms }, isEmpty)).toString();

    return code ? (
        <>
            <div
                className={WINDWARD_EMBEDDED_CLASSNAME}
                data-tenant-code={code}
                style={windwardEmbeddedDivStyle}
            />
            {/* The following script must be placed below the div element.
                This ensures that the fetched script can find and interact with the div element it relies on. */}
            <Script data-id={WINDWARD_EMBEDDED_SCRIPT_ID}
                    src={`${process.env.NEXT_PUBLIC_EMBEDDED_APP_SCRIPT_ORIGIN}/embed.min.js?${urlParams}`}></Script>
        </>
    ) : null;
}

export default Index;

// Retrieves the embedded app code required for embedding the application.
// tenantId is optional and is needed to be able to show only a specific tenant shipments.
// If tenantId is not provided, all shipments of the client are shown.
export async function getServerSideProps() {
    const code: string = await getEmbeddedAppCodeResponse({
        clientId: process.env.EMBEDDED_APP_SCRIPT_CLIENT_ID!,
        clientSecret: process.env.EMBEDDED_APP_SCRIPT_CLIENT_SECRET!,
        metadata: {
            tenantId: "ben"
        }
    });

    return {
        props: {code}
    }
}