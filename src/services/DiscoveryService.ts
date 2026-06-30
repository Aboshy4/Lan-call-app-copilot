import dgram from 'react-native-udp';
import { EventBus } from '../utils/EventBus';
import { DiscoveredHost } from '../types';
import { NetworkInfoService } from './NetworkInfoService';
export const DISCOVERY_PORT = 49495;
export class DiscoveryService extends EventBus {
  private socket: any; private timer: any;
  async advertise(sessionCode: string, tcpPort: number) {
    const ip = await NetworkInfoService.getLocalIp();
    const broadcast = await NetworkInfoService.getBroadcast();
    this.socket = dgram.createSocket({ type: 'udp4', reusePort: true });
    this.socket.bind(DISCOVERY_PORT);
    this.socket.once('listening', () => { try { this.socket.setBroadcast(true); } catch {} });
    const send = () => {
      const payload = JSON.stringify({ app: 'LAN_CALL_PRIVATE', name: 'LAN Call Host', ip, port: tcpPort, sessionCode, ts: Date.now() });
      this.socket.send(payload, 0, payload.length, DISCOVERY_PORT, broadcast, () => {});
    };
    send(); this.timer = setInterval(send, 1600);
  }
  listen() {
    this.socket = dgram.createSocket({ type: 'udp4', reusePort: true });
    this.socket.on('message', (msg: any, rinfo: any) => {
      try {
        const data = JSON.parse(msg.toString());
        if (data.app !== 'LAN_CALL_PRIVATE') return;
        const host: DiscoveredHost = { id: `${data.ip}:${data.port}`, name: data.name, ip: data.ip || rinfo.address, port: data.port, sessionCode: data.sessionCode, lastSeen: Date.now() };
        this.emit('host', host);
      } catch {}
    });
    this.socket.bind(DISCOVERY_PORT);
  }
  stop() { if (this.timer) clearInterval(this.timer); try { this.socket?.close(); } catch {} }
}
