import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`[+] client:`);
    const authHeader = client.handshake.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      client.disconnect(true);
      return;
    }
    const token = authHeader.substring(7);
    console.log(token);
    console.log();
  }

  handleDisconnect(client: Socket) {
    console.log(`[-] client:`);
  }
}
