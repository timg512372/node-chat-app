const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            { id: 1, name: 'ghi', room: 'Node Course' },
            { id: 2, name: 'abc', room: 'React Course' },
            { id: 3, name: 'def', room: 'Node Course' }
        ];
    });

    it('Should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Andres',
            room: 'room'
        };

        let newusers = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should return names for courses', () => {
        let userList = users.getUserList('Node Course');
        expect(userList).toEqual(['ghi', 'def']);

        let user2list = users.getUserList('React Course');
        expect(user2list).toEqual['abc'];
    });

    it('Should remove a user', () => {
        users.removeUser(4), expect(users.users.length).toBe(3);

        users.removeUser(2), expect(users.users.length).toBe(2);

        users.removeUser(2), expect(users.users.length).toBe(2);
    });

    it('Should find user', () => {
        let find = users.getUser(1);
        expect(find.id).toBe(1);

        find = users.getUser(-1);
        expect(find).toBeNull();
    });
});
