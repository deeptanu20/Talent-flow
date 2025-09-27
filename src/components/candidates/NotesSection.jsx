import React, { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const NotesSection = ({ candidateId, notes = [], onAddNote }) => {
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [mentionSuggestions] = useState([
    { id: 1, name: 'John Smith', email: 'john@company.com' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com' },
    { id: 3, name: 'Mike Davis', email: 'mike@company.com' },
    { id: 4, name: 'Lisa Chen', email: 'lisa@company.com' }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsAdding(true);
    try {
      await onAddNote(candidateId, {
        content: newNote,
        author: 'Current User', // In real app, get from auth context
        timestamp: new Date().toISOString(),
        mentions: extractMentions(newNote)
      });
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const extractMentions = (text) => {
    const mentionRegex = /@(\w+)/g;
    const matches = text.match(mentionRegex) || [];
    return matches.map(match => match.substring(1));
  };

  const renderNoteContent = (content) => {
    // Simple mention highlighting
    return content.replace(/@(\w+)/g, '<span class="bg-blue-100 text-blue-800 px-1 rounded">@$1</span>');
  };

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const noteTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - noteTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Add Note Form */}
      <Card>
        <Card.Header>
          <Card.Title>Add Note</Card.Title>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note about this candidate... Use @name to mention team members"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>💡 Tip: Use @name to mention team members</span>
                </div>
                <div className="text-xs text-gray-500">
                  {newNote.length}/500 characters
                </div>
              </div>
            </div>
            
            {/* Mention Suggestions */}
            {newNote.includes('@') && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-2">Available team members:</p>
                <div className="flex flex-wrap gap-2">
                  {mentionSuggestions.map(person => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => setNewNote(prev => prev + person.name.split(' ')[0])}
                      className="px-2 py-1 bg-white text-xs border border-gray-200 rounded hover:bg-gray-100"
                    >
                      @{person.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!newNote.trim() || isAdding}
                loading={isAdding}
              >
                Add Note
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>

      {/* Notes List */}
      <Card>
        <Card.Header>
          <Card.Title>Notes History ({notes.length})</Card.Title>
        </Card.Header>
        <Card.Content>
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <p className="text-lg font-medium">No notes yet</p>
              <p className="text-sm">Add your first note about this candidate above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {note.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{note.author}</p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(note.timestamp)}</p>
                      </div>
                    </div>
                    
                    {/* Note actions */}
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="ml-10">
                    <div 
                      className="text-gray-700 text-sm"
                      dangerouslySetInnerHTML={{ __html: renderNoteContent(note.content) }}
                    />
                    
                    {/* Mentions */}
                    {note.mentions && note.mentions.length > 0 && (
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Mentioned:</span>
                        {note.mentions.map((mention, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            @{mention}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default NotesSection;