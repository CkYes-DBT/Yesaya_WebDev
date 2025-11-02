import axios from 'axios';

const API_URL = 'http://localhost:8000/basic/';

export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    // Ensure cover URLs are absolute so the frontend can load them
    const books = Array.isArray(response.data)
      ? response.data.map((book) => {
          // Some backends may name the image field 'cover' or 'image'
          let cover = book.cover || book.image || null;
          if (cover && typeof cover === 'string' && cover.startsWith('/')) {
            cover = `http://localhost:8000${cover}`;
          }
          return { ...book, cover };
        })
      : response.data;
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    // Jika ada file cover, kirim sebagai multipart/form-data
    if (bookData.cover instanceof File) {
      const formData = new FormData();
      formData.append('name', bookData.name);
      formData.append('author', bookData.author);
      formData.append('rating', bookData.rating);
  // backend model uses field name 'image' — send file under 'image'
  formData.append('image', bookData.cover);

      console.log('Mengirim FormData ke API:', API_URL);
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response from API (form):', response.data);
      return response.data;
    }

    // Kalau tidak ada file, kirim JSON biasa
    const data = {
      name: bookData.name,
      author: bookData.author,
      rating: bookData.rating,
    };
    console.log('Mengirim JSON ke API:', data);
    const response = await axios.post(API_URL, data);
    console.log('Response from API (json):', response.data);
    return response.data;
  } catch (error) {
    console.error('Error menambahkan buku:', error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${API_URL}${bookId}/`);
    return response.data;
  } catch (error) {
    console.error('Error menghapus buku:', error);
    throw error;
  }
};

export const updateBook = async (bookId, bookData) => {
  try {
    // Jika ada file cover (upload baru), kirim FormData
    if (bookData.cover instanceof File) {
      const formData = new FormData();
      formData.append('name', bookData.name);
      formData.append('author', bookData.author);
      formData.append('rating', bookData.rating);
      formData.append('image', bookData.cover);
      const response = await axios.put(`${API_URL}${bookId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }

    // Otherwise send JSON
    const data = {
      name: bookData.name,
      author: bookData.author,
      rating: bookData.rating,
    };
    const response = await axios.put(`${API_URL}${bookId}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error mengupdate buku:', error);
    throw error;
  }
};