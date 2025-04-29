import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// 1️⃣ Setup Plaid client config
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
      'PLAID-SECRET': process.env.PLAID_SECRET!,
    },
  },
});

// 2️⃣ Export the client to use in API routes
export const plaidClient = new PlaidApi(config);
