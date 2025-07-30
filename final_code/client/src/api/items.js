import apiClient from '../lib/axios';

/**
 * Get all items
 * @returns {Promise} - Promise resolving to items array
 */
export const getAllItems = async () => {
  try {
    const response = await apiClient.get('/items');
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

/**
 * Get item by ID
 * @param {string} id - Item ID
 * @returns {Promise} - Promise resolving to item object
 */
export const getItemById = async (id) => {
  try {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

/**
 * Create new item
 * @param {Object} itemData - Item data object
 * @returns {Promise} - Promise resolving to created item
 */
export const createItem = async (itemData) => {
  try {
    const response = await apiClient.post('/items', itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

/**
 * Request to borrow an item
 * @param {string} itemId - Item ID to request
 * @returns {Promise} - Promise resolving to request response
 */
export const requestBorrowItem = async (itemId) => {
  try {
    const response = await apiClient.post(`/items/${itemId}/request`);
    return response.data;
  } catch (error) {
    console.error('Error requesting item:', error);
    throw error;
  }
};
