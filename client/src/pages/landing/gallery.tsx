import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/ui/page-header';
import { useApp } from '../../context/app-context';
import EmptyState from '../../components/states/empty';
import ErrorState from '../../components/states/error';
import Skeleton from '../../components/states/skeleton-loading';
import { GalleryProps } from '../../types/gallery';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryItems, setGallery] = useState<GalleryProps[] | any>();
  const { fetchGalleryItems, isLoading, error } = useApp();
  useEffect(() => {
    const handleFetchGallery = async () => {
        const res = await fetchGalleryItems()
        setGallery(res?.data?.gallery)
    }

    handleFetchGallery();
}, [galleryItems])

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
          {galleryItems?.map((item: any, index: number) => (
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

      {error && (
        <ErrorState title={"Error loading gallery data"} message={"Please try again"} />
      )}

      {isLoading && (
        <Skeleton variant={"rectangular"} animation={"pulse"} />
      )}

      {!galleryItems || galleryItems.length === 0 && (
        <EmptyState title={"No gallery found"} message={"No gallery available at the moment"}  />
      )}

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