import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookCard from './components/BookCard';
import {
  getBooks,
  createBook,
  updateBook, 
  deleteBook
} from './services/bookservice';

function App() {
  const [books, setBooks] = useState([]);
  const [bookEdit, setBookEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data buku. Pastikan server jalan yaa sayang!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (bookEdit) {
        const updateData = { ...formData };
        if (formData.cover instanceof File) {
          await updateBook(bookEdit.id, formData); // perlu updateBook saat edit
        } else {
          delete updateData.cover; // Don't send cover if not changed
          await updateBook(bookEdit.id, updateData);
        }
        alert('Buku berhasil di Update!');
        setBookEdit(null);
      } else {
        await createBook(formData);
        alert('Buku berhasil ditambahkan!');
      }
      loadBooks(); // Reload books after successful operation
    } catch (err) {
      alert('Terjadi kesalahan saat menyimpan buku. Silakan coba lagi.');
      console.error(err);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
      alert('Buku berhasil dihapus!');
      loadBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (book) => {
    setBookEdit(book);
  };

  const handleCancelEdit = () => {
    setBookEdit(null);
  };

  // Filter books based on search query and rating
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = selectedRating === 'all' || book.rating.toLowerCase() === selectedRating.toLowerCase();
    return matchesSearch && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Perpustakaan Digital
          </h1>
          <p className="text-gray-600">
            Kelola koleksi buku favoritmu dengan mudah!
          </p>
        </div>

        {/* Form Tambah/Edit Buku */}
        <BookForm
          onSubmit={handleSubmit}
          bookEdit={bookEdit} 
          onCancel={handleCancelEdit}
        />

        {/* Tampilkan Loading */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">⏳ Memuat data...</p>
          </div>
        )}

        {/* Tampilkan Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Rating</option>
              <option value="excellent">Sangat Bagus</option>
              <option value="average">Biasa</option>
              <option value="bad">Kurang Bagus</option>
            </select>
          </div>
        </div>

        {/* Daftar Buku */}
        {!loading && !error && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Daftar Buku ({filteredBooks.length})
            </h2>

            {books.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-500">
                  📭 Belum ada buku. Yuk tambah buku pertamamu!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
