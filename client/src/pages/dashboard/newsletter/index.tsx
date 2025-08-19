import { useEffect, useState } from 'react';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { FiTrash2, FiUsers } from 'react-icons/fi';
import { useAdmin } from '../../../context/admin-context';
import { useTheme } from '../../../context/theme-context';
import DeleteModal from '../../../components/modals/delete-modal';

const NewsletterManagement = () => {
  const { fetchSubscribers, deleteSubscriber } = useAdmin();
  const { theme } = useTheme();
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchSubscribers();
      setSubscribers(res?.data?.subscribers || res?.subscribers || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteSubscriber(id);
    load();
  };

  return (
    <div className="py-6">
      <SectionHeader
        title="Newsletter Subscribers"
        description="View and manage newsletter subscribers"
        icon={<FiUsers size={24} />}
      />

      <div className={`mt-6 rounded-xl shadow-lg border ${theme === 'dark' ? 'bg-black/20 backdrop-blur-lg border-white/10' : 'bg-white border-gray-200'}`}>
        <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-white/10 text-white' : 'border-gray-200 text-gray-800'}`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">Subscribers</span>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subscribers.length} total</span>
          </div>
        </div>
        <div className="divide-y divide-gray-200/10">
          {loading ? (
            <div className="p-6 text-gray-400">Loading…</div>
          ) : subscribers.length === 0 ? (
            <div className={`p-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No subscribers found.</div>
          ) : (
            subscribers.map((s: any) => (
              <div key={s._id} className={`px-6 py-4 flex items-center justify-between ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-600'}`}>
                    {(s.name || s.email || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{s.email}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{s.name || '—'}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(s._id)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border transition-colors ${theme === 'dark' ? 'border-white/20 text-red-300 hover:bg-white/10' : 'border-gray-300 text-red-600 hover:bg-gray-100'}`}
                  title="Delete subscriber"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            ))
          )}

          <DeleteModal
            isOpen={!!selectedId}
            onClose={() => setSelectedId(null)}
            onConfirm={() => selectedId && handleDelete(selectedId)}
            title="Delete Subscriber"
            message="Are you sure you want to delete this subscriber? This action cannot be undone."
          />
        </div>
      </div>
    </div>
  );
};

export default NewsletterManagement;