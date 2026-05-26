import { useEffect, useState, useCallback } from 'react';
import API from '../services/api';

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/contacts');
      setContacts(response.data);
    } catch (err) {
      console.error('Failed to fetch contacts', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const createContact = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      await API.post('/contacts', payload);
      await fetchContacts();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      await API.put(`/contacts/${id}`, payload);
      await fetchContacts();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await API.delete(`/contacts/${id}`);
      await fetchContacts();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
  };
}
