import React, { useState, useEffect } from 'react';
import { 
  FiMessageSquare, 
  FiTrash2, 
  FiMail, 
  FiEye, 
  FiArchive, 
  FiCheck, 
  FiCalendar
} from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';
import { format } from 'date-fns';
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';

const ContactsManagement: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { fetchContacts, markContactRead, archiveContact, deleteContact } = useAdmin();

  // Fetch contact messages
  useEffect(() => {
    const getContactMessages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchContacts();
        if (response?.messages) {
          setMessages(response.messages);
        } else {
          setError('No contact messages found');
        }
      } catch (err) {
        console.error('Failed to fetch contact messages:', err);
        setError('Failed to load contact messages');
      } finally {
        setIsLoading(false);
      }
    };
    
    getContactMessages();
  }, [fetchContacts]);

  // Filter contact messages based on search query and filters
  const filteredMessages = messages.filter((message) => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter) {
      switch (statusFilter) {
        case 'unread':
          matchesStatus = !message.read && !message.archived;
          break;
        case 'read':
          matchesStatus = message.read && !message.archived;
          break;
        case 'archived':
          matchesStatus = message.archived;
          break;
      }
    }
    
    return matchesSearch && matchesStatus;
  });

  // Handle message selection
  const toggleMessageSelection = (id: string) => {
    setSelectedMessages(prev => 
      prev.includes(id) 
        ? prev.filter(messageId => messageId !== id) 
        : [...prev, id]
    );
  };

  // Handle bulk actions
  const handleBulkAction = async (action: 'read' | 'archive' | 'delete') => {
    if (selectedMessages.length === 0) return;
    
    const actionMessages = {
      read: 'mark as read',
      archive: 'archive',
      delete: 'delete'
    };
    
    if (window.confirm(`Are you sure you want to ${actionMessages[action]} ${selectedMessages.length} selected message(s)?`)) {
      setIsLoading(true);
      
      try {
        // Handle each selected message
        for (const id of selectedMessages) {
          switch (action) {
            case 'read':
              await markContactRead(id);
              break;
            case 'archive':
              await archiveContact(id);
              break;
            case 'delete':
              await deleteContact(id);
              break;
          }
        }
        
        // Refresh message list
        const response = await fetchContacts();
        if (response?.messages) {
          setMessages(response.messages);
        }
        
        // Clear selection and active message
        setSelectedMessages([]);
        setActiveMessage(null);
        
        toast.success(`Successfully ${actionMessages[action]}ed ${selectedMessages.length} messages`);
      } catch (error) {
        console.error(`Failed to ${action} messages:`, error);
        toast.error(`Failed to ${action} some messages`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle single message actions
  const handleMessageAction = async (id: string, action: 'read' | 'unread' | 'archive' | 'delete') => {
    try {
      setIsLoading(true);
      
      switch (action) {
        case 'read':
        case 'unread':
          await markContactRead(id);
          break;
        case 'archive':
          await archiveContact(id);
          break;
        case 'delete':
          if (!window.confirm('Are you sure you want to delete this message?')) {
            setIsLoading(false);
            return;
          }
          await deleteContact(id);
          break;
      }
      
      // Refresh message list
      const response = await fetchContacts();
      if (response?.messages) {
        setMessages(response.messages);
      }
      
      // If deleting or archiving the active message, clear the active message
      if ((action === 'delete' || action === 'archive') && activeMessage === id) {
        setActiveMessage(null);
      }
      
      toast.success(`Message ${action === 'unread' ? 'marked as unread' : action === 'read' ? 'marked as read' : action + 'd'} successfully`);
    } catch (error) {
      console.error(`Failed to ${action} message:`, error);
      toast.error(`Failed to ${action} message`);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the active message
  const getActiveMessage = () => {
    return messages.find(message => message._id === activeMessage);
  };

  // Handle message click
  const handleMessageClick = async (id: string) => {
    setActiveMessage(id);
    
    // If the message is unread, mark it as read
    const message = messages.find(msg => msg._id === id);
    if (message && !message.read) {
      try {
        await markContactRead(id);
        
        // Update the local state to reflect the change
        setMessages(prev => 
          prev.map(msg => 
            msg._id === id ? { ...msg, read: true } : msg
          )
        );
      } catch (error) {
        console.error('Failed to mark message as read:', error);
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy h:mm a');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Get message status
  const getMessageStatus = (message: any) => {
    if (message.archived) return 'archived';
    if (!message.read) return 'unread';
    return 'read';
  };

  // Get status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-6">
      <SectionHeader
        title="Contact Messages"
        description="Manage and respond to contact form submissions"
        icon={<FiMessageSquare size={24} />}
      >
        <div className="flex space-x-2">
          {selectedMessages.length > 0 && (
            <>
              <button
                onClick={() => handleBulkAction('read')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                title="Mark as Read"
                disabled={isLoading}
              >
                <FiCheck className="mr-1" />
                <span className="hidden sm:inline">Read</span>
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                title="Archive"
                disabled={isLoading}
              >
                <FiArchive className="mr-1" />
                <span className="hidden sm:inline">Archive</span>
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                title="Delete"
                disabled={isLoading}
              >
                <FiTrash2 className="mr-1" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </>
          )}
        </div>
      </SectionHeader>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TextInput
              id="search"
              label="Search Messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, subject or content..."
              type="text"
            />
          </div>
          <Select
            id="status"
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Messages' },
              { value: 'unread', label: 'Unread' },
              { value: 'read', label: 'Read' },
              { value: 'archived', label: 'Archived' },
            ]}
          />
        </div>
      </Card>

      {/* Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card noPadding className="h-full">
            <div className="divide-y divide-white/10 max-h-[600px] overflow-y-auto">
              {isLoading && messages.length === 0 ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="animate-pulse p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 bg-white/5 rounded w-1/3"></div>
                      <div className="h-4 bg-white/5 rounded w-1/4"></div>
                    </div>
                    <div className="h-4 bg-white/5 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                  </div>
                ))
              ) : filteredMessages.length === 0 ? (
                <div className="p-6 text-center">
                  <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-white">No messages found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {searchQuery || statusFilter
                      ? "Try adjusting your search or filter to find what you're looking for."
                      : 'There are no contact messages yet.'}
                  </p>
                </div>
              ) : (
                filteredMessages.map((message) => {
                  const messageStatus = getMessageStatus(message);
                  return (
                    <div
                      key={message._id}
                      className={`p-4 cursor-pointer hover:bg-white/5 transition-colors duration-150 ${
                        activeMessage === message._id ? 'bg-white/10' : ''
                      } ${messageStatus === 'unread' ? 'border-l-4 border-blue-500' : ''}`}
                      onClick={() => handleMessageClick(message._id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-white flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedMessages.includes(message._id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleMessageSelection(message._id);
                            }}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-black/30"
                          />
                          <span className="truncate max-w-[150px]">{message.name}</span>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <FiCalendar className="mr-1 text-gray-400" size={12} />
                          {(() => {
                            try {
                              return format(new Date(message.createdAt), 'MMM d');
                            } catch (error) {
                              return 'Invalid date';
                            }
                          })()}
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-gray-300 mb-1 truncate">
                        {message.subject}
                      </h3>
                      <p className="text-xs text-gray-400 truncate">
                        {message.message}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusStyles(
                            messageStatus
                          )}`}
                        >
                          {messageStatus.charAt(0).toUpperCase() + messageStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            {activeMessage ? (
              <div>
                {(() => {
                  const message = getActiveMessage();
                  if (!message) return null;
                  const messageStatus = getMessageStatus(message);

                  return (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-medium text-white">{message.subject}</h2>
                          <div className="mt-1 flex items-center">
                            <span className="text-sm text-gray-400">From:</span>
                            <span className="ml-1 text-sm font-medium text-white">{message.name}</span>
                            <span className="mx-1 text-gray-400">&lt;{message.email}&gt;</span>
                          </div>
                          <div className="mt-1 text-sm text-gray-400">
                            {formatDate(message.createdAt)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleMessageAction(message._id, 'archive')}
                            className="p-2 rounded-full text-gray-300 hover:bg-white/10"
                            title={message.archived ? "Unarchive" : "Archive"}
                            disabled={isLoading}
                          >
                            <FiArchive size={18} />
                          </button>
                          <button
                            onClick={() => handleMessageAction(message._id, 'delete')}
                            className="p-2 rounded-full text-red-400 hover:bg-red-900/20"
                            title="Delete"
                            disabled={isLoading}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-4 mt-4">
                        <div className="prose max-w-none prose-invert">
                          <p className="whitespace-pre-line text-gray-300">{message.message}</p>
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-4 mt-6">
                        <div className="flex space-x-3">
                          <a
                            href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FiMail className="mr-2" />
                            Reply via Email
                          </a>
                          {!message.archived && (
                            <button
                              className="inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-md shadow-sm text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              onClick={() => handleMessageAction(message._id, messageStatus === 'unread' ? 'read' : 'unread')}
                              disabled={isLoading}
                            >
                              {messageStatus === 'unread' ? (
                                <>
                                  <FiCheck className="mr-2" />
                                  Mark as Read
                                </>
                              ) : (
                                <>
                                  <FiEye className="mr-2" />
                                  Mark as Unread
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <FiMessageSquare className="h-16 w-16 text-gray-500" />
                <h3 className="mt-4 text-lg font-medium text-white">No message selected</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Select a message from the list to view its details
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {error && !isLoading && messages.length === 0 && (
        <div className="bg-red-900/20 backdrop-blur-lg border border-red-900/30 rounded-xl shadow-lg p-6 text-center mt-4">
          <h3 className="text-lg font-medium text-red-400">Error</h3>
          <p className="mt-1 text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;
