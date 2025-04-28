import { NextRequest, NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
      'PLAID-SECRET': process.env.PLAID_SECRET!,
    },
  },
});

const plaidClient = new PlaidApi(config);

export async function POST(req: NextRequest) {
  try {
    const { public_token } = await req.json();

    if (!public_token) {
      return NextResponse.json({ error: 'Missing public token' }, { status: 400 });
    }

    // Exchange public_token for access_token
    const response = await plaidClient.itemPublicTokenExchange({ public_token });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    console.log('✅ Access Token:', accessToken);
    console.log('✅ Item ID:', itemId);

    // 🛠 Later: Save access_token securely tied to the user (Supabase, database, etc)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Plaid Token Exchange Error:', error);
    return NextResponse.json({ error: 'Failed to exchange public token' }, { status: 500 });
  }
}
