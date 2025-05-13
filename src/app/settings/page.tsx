'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import PlaidLinkButton from '@/components/PlaidLinkButton';

export default function SettingsPage() {
  const { user } = useUser();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    if (!user) return;
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('connected_accounts') // update if your table is named differently
      .select('*')
      .eq('user_id', user.id);

    if (error) console.error('Error fetching accounts:', error);
    else setAccounts(data || []);
    setLoading(false);
  };

  const removeAccount = async (accountId: string) => {
    const supabase = createSupabaseClient();
    await supabase.from('connected_accounts').delete().eq('id', accountId);
    fetchAccounts();
  };

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-2">Connected Accounts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : accounts.length === 0 ? (
          <p className="text-sm text-muted">No accounts connected.</p>
        ) : (
          <ul className="space-y-3">
            {accounts.map((acc) => (
              <li
                key={acc.id}
                className="flex justify-between items-center border rounded px-4 py-2"
              >
                <span className="text-sm">{acc.account_name}</span>
                <button
                    className="px-3 py-1 text-sm border border-zinc-500 rounded hover:bg-zinc-800 hover:text-white transition-colors"
                    onClick={() => removeAccount(acc.id)}
                >
                    Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Plaid Section */}
      <div className="border-t pt-4">
        <h2 className="text-sm font-medium text-gray-500">Linked Accounts</h2>
        <PlaidLinkButton />
      </div>

      {/* Placeholder for subscription or other settings */}
      <section>
        <h2 className="text-lg font-medium mb-2">Subscription</h2>
        <p className="text-sm text-muted">Manage your plan or billing info here.</p>
      </section>
    </div>
  );
}
