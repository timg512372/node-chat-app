class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let selected = null;
        this.users = this.users.filter(user => {
            if (user.id === id) {
                selected = user;
            }

            return user.id !== id;
        });

        return selected;
    }

    getUser(id) {
        let selected = null;
        this.users.forEach(element => {
            if (element.id == id) selected = element;
        });

        return selected;
    }

    getUserList(room) {
        let names = this.users.filter(user => user.room === room);
        return names.map(user => user.name);
    }
}

module.exports = { Users };
