import { useRuntimeConfig } from '#app';

/**
 * Get base URL for API calls
 * @returns {string} The base URL for transactions API
 */
const getBaseUrl = () => {
    const config = useRuntimeConfig();
    return config.public.BILLING_MICROSERVICE_API + "/transactions";
};

/**
 * Fetch all transactions with optional pagination
 * @param {Object} options - Query parameters
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {string} options.sortBy - Field to sort by
 * @param {string} options.order - Sort order (asc or desc)
 * @returns {Promise<Object>} Response with transactions data
 */
export const getTransactions = async () => {
    try {

        const url = getBaseUrl();
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching transactions: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('TransactionService error:', error);
        throw error;
    }
};

/**
 * Get a single transaction by ID
 * @param {string} id - Transaction ID
 * @returns {Promise<Object>} Transaction data
 */
export const getTransactionById = async (id) => {
    try {
        const url = `${getBaseUrl()}/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching transaction: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('TransactionService error:', error);
        throw error;
    }
};

/**
 * Create a new transaction
 * @param {Object} transaction - Transaction data
 * @returns {Promise<Object>} Created transaction
 */
export const createTransaction = async (transaction) => {
    try {
        const url = getBaseUrl();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });

        if (!response.ok) {
            throw new Error(`Error creating transaction: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('TransactionService error:', error);
        throw error;
    }
};

/**
 * Update an existing transaction
 * @param {string} id - Transaction ID
 * @param {Object} transaction - Updated transaction data
 * @returns {Promise<Object>} Updated transaction
 */
export const updateTransaction = async (id, transaction) => {
    try {
        const url = `${getBaseUrl()}/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });

        if (!response.ok) {
            throw new Error(`Error updating transaction: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('TransactionService error:', error);
        throw error;
    }
};

/**
 * Delete a transaction
 * @param {string} id - Transaction ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteTransaction = async (id) => {
    try {
        const url = `${getBaseUrl()}/${id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting transaction: ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error('TransactionService error:', error);
        throw error;
    }
};