using System.Collections.Generic;
using ChatHubService.Data;
using ChatHubService.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

builder.Services.AddSingleton<Dictionary<string, UserConnection>>(options => new());
builder.Services.AddSignalR();

var app = builder.Build();
app.UseCors(builder =>
    builder
      .WithOrigins("https://chat-hub.burakyuz.com")
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials());

app.MapHub<ChatHub>("/chat");

app.Run();
