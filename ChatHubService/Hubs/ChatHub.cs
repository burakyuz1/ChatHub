using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatHubService.Data;
using Microsoft.AspNetCore.SignalR;

namespace ChatHubService.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly Dictionary<string, UserConnection> _connections;

        public ChatHub(Dictionary<string, UserConnection> connections)
        {
            _connections = connections;
            _botUser = "ChatHub Bot";
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("recieveMessage", _botUser, $"{userConnection.User} has joined to {userConnection.Room}");

            await SendConnectedUsers(userConnection.Room);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Caller.SendAsync("recieveMessage", userConnection.User, message, true);
                await Clients.OthersInGroup(userConnection.Room).SendAsync("recieveMessage", userConnection.User, message, false);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                await Clients.Group(userConnection.Room).SendAsync("recieveMessage", _botUser, $"{userConnection.User} has left from {userConnection.Room}");

                await SendConnectedUsers(userConnection.Room);
            }

        }
        private async Task SendConnectedUsers(string room)
        {
            var users = _connections.Values
                .Where(x => x.Room == room)
                .Select(x => x.User);

            await Clients.Group(room).SendAsync("usersInRoom", users);
        }
    }
}