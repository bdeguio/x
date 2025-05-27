'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type ConnectedAccount = {
  id: string;
  account_id: string;
  account_name: string;
  institution_name: string;
  mask?: string | null;
};

export default function ConnectedAccounts() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch('/api/connected-accounts');
      if (res.ok) {
        const data = await res.json();
        setAccounts(data.accounts);
      } else {
        toast.error('Failed to load accounts');
      }
    };

    fetchAccounts();
  }, []);

  const handleRemove = async (account_id: string) => {
    const confirmed = confirm("Are you sure you want to unlink this account?");
    if (!confirmed) return;

    setLoading(true);
    const res = await fetch('/api/plaid/remove-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account_id }),
    });

    if (res.ok) {
      setAccounts((prev) => prev.filter((acc) => acc.account_id !== account_id));
      toast.success('Account removed');
    } else {
      toast.error('Failed to remove account');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {accounts.length === 0 && <p className="text-gray-500">No connected accounts yet.</p>}
      {accounts.map((acc) => (
        <div
          key={acc.id}
          className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
        >
          <div>
            <p className="font-semibold">
              {acc.institution_name} • {acc.account_name} {acc.mask && `****${acc.mask}`}
            </p>
          </div>
          <button
            onClick={() => handleRemove(acc.account_id)}
            disabled={loading}
            className="text-red-500 hover:underline disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

