import React, { useState } from 'react';
import { Plus, Trash2, Camera } from 'lucide-react';

export const EnhancedCmsSection = ({ portfolioImages, addPortfolioImage, deletePortfolioImage }) => {
  const [newImage, setNewImage] = useState({ url: '', alt_text: '', caption: '', category: 'general' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddImage = async (e) => {
    e.preventDefault();
    try {
      await addPortfolioImage(newImage);
      setNewImage({ url: '', alt_text: '', caption: '', category: 'general' });
      setShowAddForm(false);
    } catch (error) {
      alert('Failed to add image');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-[#F3E3C3]">Portfolio Management</h4>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#F3E3C3] text-[#1a1a1a] px-4 py-2 rounded-md font-semibold hover:bg-[#E6D5B8] transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add Image
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddImage} className="bg-[#1a1a1a] p-6 rounded-lg space-y-4">
          <input
            type="url"
            placeholder="Image URL"
            value={newImage.url}
            onChange={(e) => setNewImage({...newImage, url: e.target.value})}
            required
            className="w-full bg-[#262626] border border-white/20 rounded-md py-2 px-3 text-[#F3E3C3]"
          />
          <input
            type="text"
            placeholder="Alt text"
            value={newImage.alt_text}
            onChange={(e) => setNewImage({...newImage, alt_text: e.target.value})}
            className="w-full bg-[#262626] border border-white/20 rounded-md py-2 px-3 text-[#F3E3C3]"
          />
          <input
            type="text"
            placeholder="Caption"
            value={newImage.caption}
            onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
            className="w-full bg-[#262626] border border-white/20 rounded-md py-2 px-3 text-[#F3E3C3]"
          />
          <select
            value={newImage.category}
            onChange={(e) => setNewImage({...newImage, category: e.target.value})}
            className="w-full bg-[#262626] border border-white/20 rounded-md py-2 px-3 text-[#F3E3C3]"
          >
            <option value="general">General</option>
            <option value="portraits">Portraits</option>
            <option value="weddings">Weddings</option>
            <option value="commercial">Commercial</option>
          </select>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-[#262626] text-[#F3E3C3] py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#F3E3C3] text-[#1a1a1a] py-2 px-4 rounded-md"
            >
              Add Image
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioImages.map(image => (
          <div key={image.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
            <img
              src={image.url}
              alt={image.alt_text}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-[#F3E3C3] text-sm mb-2">{image.caption}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-[#262626] px-2 py-1 rounded text-[#F3E3C3]">
                  {image.category}
                </span>
                <button
                  onClick={() => deletePortfolioImage(image.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {portfolioImages.length === 0 && (
        <div className="text-center py-12 text-[#F3E3C3]/70">
          <Camera size={48} className="mx-auto mb-4 opacity-30" />
          <p>No portfolio images yet</p>
          <p className="text-sm mt-2">Add some images to get started</p>
        </div>
      )}
    </div>
  );
};
