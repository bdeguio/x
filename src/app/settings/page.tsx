import ConnectedAccounts from '@/components/ConnectedAccounts';
import PlaidLinkButton from '@/components/PlaidLinkButton';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-2">Connected Accounts</h2>
        <ConnectedAccounts />
      </section>

      <div className="border-t pt-4 mb-6">
        <h2 className="text-sm font-medium text-gray-500">Linked Accounts</h2>
        <PlaidLinkButton />
      </div>

      <section>
        <h2 className="text-lg font-medium mb-2">Subscription</h2>
        <p className="text-sm text-muted">Manage your plan or billing info here.</p>
      </section>
    </div>
  );
}
