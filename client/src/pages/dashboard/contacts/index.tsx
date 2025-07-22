import React, { useState } from 'react';
import { 
  FiMessageSquare, 
  FiTrash2, 
  FiMail, 
  FiEye, 
  FiArchive, 
  FiCheck, 
  FiStar,
  FiCalendar
} from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';
import { format } from 'date-fns';

// Mock data for contact messages
const mockContactMessages = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Website Development Inquiry',
    message: 'Hello, I\'m interested in your web development services. I have a small business and need a new website. Could you provide me with some information about your services and pricing? Thanks!',
    date: '2023-09-15T14:30:00',
    status: 'unread',
    starred: false,
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    subject: 'Collaboration Opportunity',
    message: 'Hi there, I came across your portfolio and I\'m really impressed with your work. I\'m working on a project that I think would be a great fit for your skills. Would you be interested in discussing a potential collaboration?',
    date: '2023-09-12T09:45:00',
    status: 'read',
    starred: true,
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    subject: 'Question about your React tutorial',
    message: 'I recently went through your React tutorial and found it very helpful. However, I\'m having some issues with the state management part. Could you clarify how the context API is being used in the example? Thanks in advance!',
    date: '2023-09-10T16:20:00',
    status: 'replied',
    starred: false,
  },
  {
    id: '4',
    name: 'Sarah Davis',
    email: 'sarah.davis@example.com',
    subject: 'Job Opportunity',
    message: 'Hello, I represent XYZ Company and we\'re impressed with your portfolio. We have an opening for a senior developer position that might interest you. Would you be available for a brief call to discuss this opportunity?',
    date: '2023-09-08T11:15:00',
    status: 'read',
    starred: true,
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    subject: 'Bug report on your portfolio site',
    message: 'Hi, I noticed that the contact form on your portfolio site isn\'t working properly on mobile devices. The submit button seems to be unresponsive on iOS. Just wanted to let you know!',
    date: '2023-09-05T13:50:00',
    status: 'archived',
    starred: false,
  },
];

const ContactsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter contact messages based on search query and filters
  const filteredMessages = mockContactMessages.filter((message) => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? message.status === statusFilter : true;
    
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
  const handleBulkAction = (action: 'read' | 'archive' | 'delete') => {
    if (selectedMessages.length === 0) return;
    
    const actionMessages = {
      read: 'mark as read',
      archive: 'archive',
      delete: 'delete'
    };
    
    if (window.confirm(`Are you sure you want to ${actionMessages[action]} ${selectedMessages.length} selected message(s)?`)) {
      // In a real app, you would call an API to perform the action
      console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} messages with IDs: ${selectedMessages.join(', ')}`);
      setSelectedMessages([]);
    }
  };

  // Handle single message actions
  const handleMessageAction = (id: string, action: 'read' | 'unread' | 'archive' | 'delete' | 'star') => {
    // In a real app, you would call an API to perform the action
    console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} message with ID: ${id}`);
    
    // If deleting or archiving the active message, clear the active message
    if ((action === 'delete' || action === 'archive') && activeMessage === id) {
      setActiveMessage(null);
    }
  };

  // Get the active message
  const getActiveMessage = () => {
    return mockContactMessages.find(message => message.id === activeMessage);
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

  // Get status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
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
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                title="Mark as Read"
              >
                <FiCheck className="mr-1" />
                <span className="hidden sm:inline">Read</span>
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                title="Archive"
              >
                <FiArchive className="mr-1" />
                <span className="hidden sm:inline">Archive</span>
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                title="Delete"
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
              { value: 'replied', label: 'Replied' },
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
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="animate-pulse p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                ))
              ) : filteredMessages.length === 0 ? (
                <div className="p-6 text-center">
                  <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No messages found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchQuery || statusFilter
                      ? "Try adjusting your search or filter to find what you're looking for."
                      : 'There are no contact messages yet.'}
                  </p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                      activeMessage === message.id ? 'bg-purple-50' : ''
                    } ${message.status === 'unread' ? 'border-l-4 border-blue-500' : ''}`}
                    onClick={() => setActiveMessage(message.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedMessages.includes(message.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleMessageSelection(message.id);
                          }}
                          className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="truncate max-w-[150px]">{message.name}</span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <FiCalendar className="mr-1 text-gray-400" size={12} />
                        {(() => {
                          try {
                            return format(new Date(message.date), 'MMM d');
                          } catch (error) {
                            return 'Invalid date';
                          }
                        })()}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">
                      {message.subject}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {message.message}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusStyles(
                          message.status
                        )}`}
                      >
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMessageAction(message.id, 'star');
                        }}
                        className={`p-1 rounded-full hover:bg-gray-200 ${
                          message.starred ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                      >
                        <FiStar
                          size={16}
                          className={message.starred ? 'fill-current' : ''}
                        />
                      </button>
                    </div>
                  </div>
                ))
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

                  return (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-medium text-gray-900">{message.subject}</h2>
                          <div className="mt-1 flex items-center">
                            <span className="text-sm text-gray-500">From:</span>
                            <span className="ml-1 text-sm font-medium text-gray-900">{message.name}</span>
                            <span className="mx-1 text-gray-500">&lt;{message.email}&gt;</span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {formatDate(message.date)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleMessageAction(message.id, 'archive')}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                            title="Archive"
                          >
                            <FiArchive size={18} />
                          </button>
                          <button
                            onClick={() => handleMessageAction(message.id, 'delete')}
                            className="p-2 rounded-full text-red-500 hover:bg-red-50"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="prose max-w-none">
                          <p className="whitespace-pre-line">{message.message}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-4 mt-6">
                        <div className="flex space-x-3">
                          <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`, '_blank')}
                          >
                            <FiMail className="mr-2" />
                            Reply via Email
                          </button>
                          <button
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            onClick={() => handleMessageAction(message.id, message.status === 'unread' ? 'read' : 'unread')}
                          >
                            {message.status === 'unread' ? (
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
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <FiMessageSquare className="h-16 w-16 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No message selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a message from the list to view its details
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactsManagement;
