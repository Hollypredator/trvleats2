import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import EditEventModal from './EditEventModal';

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleSaveEvent = (updatedEvent: Event) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    } else {
      setEvents([...events, { ...updatedEvent, id: Date.now().toString() }]);
    }
    setEditingEvent(null);
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Etkinlik Yönetimi</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Etkinlik
        </button>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Henüz etkinlik eklenmemiş.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
          >
            İlk etkinliği ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <div className="flex items-center mt-2 text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {new Date(event.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                <div className="mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                    event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status === 'upcoming' ? 'Yaklaşan' :
                     event.status === 'ongoing' ? 'Devam Ediyor' :
                     'Geçmiş'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(editingEvent || showAddModal) && (
        <EditEventModal
          event={editingEvent}
          onClose={() => {
            setEditingEvent(null);
            setShowAddModal(false);
          }}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}