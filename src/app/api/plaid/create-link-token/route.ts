import { NextRequest, NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid'; // 🛠 updated

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

export async function POST() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'test-user',
      },
      client_name: 'Arena',
      products: [Products.Investments], // 🛠 fixed
      country_codes: [CountryCode.Us],   // 🛠 fixed
      language: 'en',
      redirect_uri: undefined,
    });

    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Plaid Link Token Error:', error);
    return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 });
  }
}
