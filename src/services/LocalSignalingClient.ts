import TcpSocket from 'react-native-tcp-socket';
import { EventBus } from '../utils/EventBus';
import { SignalMessage } from '../types';
import { SIGNAL_PORT } from './LocalSignalingServer';
const encode = (m: SignalMessage) => JSON.stringify(m) + '\n';
export class LocalSignalingClient extends EventBus {
  private socket: any; private buffer = '';
  async connect(host: string, port = SIGNAL_PORT) {
    await new Promise<void>((resolve, reject) => {
      this.emit('status', 'connecting');
      this.socket = TcpSocket.createConnection({ host, port, timeout: 8000 }, () => { this.emit('status', 'connected'); resolve(); });
      this.socket.on('data', (d: any) => this.consume(d.toString()));
      this.socket.on('error', (e: any) => { this.emit('error', String(e?.message || e)); reject(e); });
      this.socket.on('close', () => this.emit('status', 'closed'));
    });
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
  send(msg: SignalMessage) { this.socket?.write(encode(msg)); }
  stop() { try { this.socket?.destroy(); } catch {} this.emit('status', 'closed'); }
}
