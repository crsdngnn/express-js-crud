// paginationUtils.js

/**
 * Parse pagination parameters
 * @param {Object} req - The request object
 * @returns {Object} - Parsed page and limit
 */
export const parsePaginationParams = (req) => {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    return { page, limit };
};

/**
 * Paginate an array of items
 * @param {Array} items - The array of items to paginate
 * @param {Number} page - Current page number
 * @param {Number} limit - Number of items per page
 * @returns {Object} - Paginated result
 */
export const paginate = (items, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const paginatedItems = items.slice(skip, skip + limit);
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        totalItems,
        totalPages,
        currentPage: page,
        items: paginatedItems,
    };
};

