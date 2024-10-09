export default class UserResourceObject {
    constructor(data) {
        this.data = data;
    }

    toJSON() {
        return {
            message: 'Operation completed successfully',
            data: this.data,
        };
    }
}
