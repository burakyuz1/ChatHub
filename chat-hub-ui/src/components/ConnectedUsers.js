const ConnectedUsers = ({ users, room, openMenu }) => <div className={`user-list col-3 ${openMenu ? 'show' : ''}`}>
    <h4>Users in <span className="room-title">{room}</span> Room</h4>
    {users.map((user, id) =>
        <h5 key={id}>{user}</h5>
    )}
</div>

export default ConnectedUsers;

