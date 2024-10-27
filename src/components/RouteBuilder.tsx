import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import type { RoutePlace } from '../types';

interface RouteBuilderProps {
  places: RoutePlace[];
  onPlacesChange: (places: RoutePlace[]) => void;
}

export default function RouteBuilder({ places, onPlacesChange }: RouteBuilderProps) {
  const [currentDay, setCurrentDay] = useState(1);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(places);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onPlacesChange(items);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Build Your Route</h3>
          <div className="flex items-center gap-2">
            <select
              value={currentDay}
              onChange={(e) => setCurrentDay(Number(e.target.value))}
              className="rounded-md border-gray-300 text-sm"
            >
              {[1, 2, 3, 4, 5].map((day) => (
                <option key={day} value={day}>
                  Day {day}
                </option>
              ))}
            </select>
            <button className="btn">
              <Plus className="h-4 w-4 mr-1" />
              Add Place
            </button>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="route-places">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-4 space-y-2"
            >
              {places
                .filter((place) => place.day === currentDay)
                .map((place, index) => (
                  <Draggable
                    key={place.id}
                    draggableId={place.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                      >
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            Place Name
                          </h4>
                          <p className="text-sm text-gray-500">Location</p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}