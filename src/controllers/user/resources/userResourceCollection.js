export default class UserResourceCollection {
    constructor(data, total, page, limit) {
        this.data = data.map(item => item);
        this.meta = {
            total,
            page,
            limit,
            totalPages: total > 0 ? Math.ceil(total / limit) : 1,
            hasNextPage: total > 0 ? page < Math.ceil(total / limit) : false,
            hasPrevPage: page > 1,
          };
    }

    toJSON() {
        return {
            message: 'Operation completed successfully',
            data: this.data,
            meta: this.meta
        };
    }
}

