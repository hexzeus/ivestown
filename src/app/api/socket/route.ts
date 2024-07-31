export const dynamic = 'force-dynamic';

let isSocketInitialized = false;

export async function GET(req: Request) {
    if (!isSocketInitialized) {
        // We'll initialize the socket in the server.js file
        isSocketInitialized = true;
    }

    return new Response('Socket is ready', {
        status: 200,
    });
}