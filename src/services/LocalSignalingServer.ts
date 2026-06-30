import TcpSocket from 'react-native-tcp-socket';
import { EventBus } from '../utils/EventBus';
import { SignalMessage } from '../types';
export const SIGNAL_PORT = 49494;
const encode = (m: SignalMessage) => JSON.stringify(m) + '\n';
export class LocalSignalingServer extends EventBus {
  private server: any; private socket: any; private buffer = '';
  async start(port = SIGNAL_PORT) {
    this.server = TcpSocket.createServer((socket: any) => {
      this.socket = socket;
      this.emit('status', 'connected');
      socket.on('data', (data: any) => this.consume(data.toString()));
      socket.on('error', (e: any) => this.emit('error', String(e?.message || e)));
      socket.on('close', () => this.emit('status', 'closed'));
    });
    await new Promise<void>((resolve, reject) => {
      this.server.on('error', reject);
      this.server.listen({ port, host: '0.0.0.0' }, resolve);
    });
    this.emit('status', 'listening');
  }
  private consume(chunk: string) {
    this.buffer += chunk;
    let i = this.buffer.indexOf('\n');
    while (i >= 0) {
      const line = this.buffer.slice(0, i);
      this.buffer = this.buffer.slice(i + 1);
      if (line.trim()) { try { this.emit('message', JSON.parse(line)); } catch {} }
      i = this.buffer.indexOf('\n');
    }
  }
  send(msg: SignalMessage) { if (this.socket) this.socket.write(encode(msg)); }
  stop() { try { this.socket?.destroy(); this.server?.close(); } catch {} this.emit('status', 'closed'); }
}
