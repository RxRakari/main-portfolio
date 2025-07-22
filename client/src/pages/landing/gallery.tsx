import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/page-header';
import { doodle } from '../../assets'; // Using the doodle as placeholder, replace with actual images

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Gallery data - replace with your actual images
  const galleryItems = [
    {
      id: 1,
      image: doodle,
      title: "Design Exploration",
      category: "UI/UX",
      description: "Exploring new design concepts for the dashboard interface."
    },
    {
      id: 2,
      image: doodle,
      title: "Code Architecture",
      category: "Development",
      description: "Planning the architecture for a scalable application."
    },
    {
      id: 3,
      image: doodle,
      title: "Team Collaboration",
      category: "Workspace",
      description: "Working together with the team on new features."
    },
    {
      id: 4,
      image: doodle,
      title: "Product Launch",
      category: "Events",
      description: "Celebrating the successful launch of our latest product."
    },
    {
      id: 5,
      image: doodle,
      title: "User Testing",
      category: "Research",
      description: "Conducting user testing sessions for the new interface."
    },
    {
      id: 6,
      image: doodle,
      title: "Conference Talk",
      category: "Speaking",
      description: "Presenting at the annual developer conference."
    }
  ];

  // Function to handle image click and show modal
  const openImageModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Function to close modal
  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      <PageHeader
        heading="Gallery"
        paragraph="Some of the memories I've shared"
      />
      
      {/* Gallery grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id}
              className={`relative overflow-hidden rounded-[25px] border border-gray-800 
                ${index % 3 === 0 ? 'md:col-span-2 lg:col-span-1 aspect-square' : 
                  index % 5 === 0 ? 'lg:col-span-2 aspect-video' : 'aspect-square'}
                cursor-pointer transition-transform duration-500 hover:scale-[1.02] group`}
              onClick={() => openImageModal(index)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
                <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-300 text-lg mb-1">{item.category}</p>
                <p className="text-gray-400 text-base">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white text-4xl z-10 hover:text-gray-300"
              onClick={closeImageModal}
            >
              &times;
            </button>
            <img 
              src={galleryItems[selectedImage].image} 
              alt={galleryItems[selectedImage].title} 
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-6">
              <h3 className="text-2xl font-medium mb-2">{galleryItems[selectedImage].title}</h3>
              <p className="text-gray-300">{galleryItems[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};