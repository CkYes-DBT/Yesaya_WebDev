import React, { useState, useEffect } from 'react';

function BookForm({ onSubmit, bookEdit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    rating: 'average',
    cover: null,
  });

  useEffect(() => {
    if (bookEdit) {
        setFormData({
            name: bookEdit.name,
            author: bookEdit.author,
            rating: bookEdit.rating,
            cover: bookEdit.cover || bookEdit.image || null,
        });
    }
  }, [bookEdit]);

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            author: '',
            rating: 'average',
            cover: null,
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {bookEdit ? 'Edit Buku' : 'Tambah Buku Baru'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-semibold">
                        Judul Buku:
                    </label>

                    <input type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='Masukkan judul buku!'
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-semibold">
                        Penulis Buku:
                    </label>

                    <input type="text" 
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='Masukkan nama penulis!'
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-semibold">
                        Rating:
                    </label>

                    <select name="rating" value={formData.rating}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="excellent">Sangat Bagus</option>
                        <option value="average">Biasa</option>
                        <option value="bad">Kurang Bagus</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-semibold">
                        Cover Buku:
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setFormData({
                            ...formData,
                            cover: e.target.files[0]
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        accept="image/*"
                    />
                    {formData.cover && (
                        <div className="mt-2">
                            <img
                                src={typeof formData.cover === 'string' ? formData.cover : URL.createObjectURL(formData.cover)}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        {bookEdit ? 'Update Buku' : 'Tambah Buku'}
                    </button>
                    {bookEdit && (
                        <button type="button" 
                        onClick={onCancel} className="bg-gray-500 text-gray px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                            Batal
                        </button>
                    )}
                </div>
                </form>
        </div>
    );

}

export default BookForm;

