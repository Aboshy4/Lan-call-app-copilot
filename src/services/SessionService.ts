import { EventBus } from '../utils/EventBus';
import { Role, SignalMessage } from '../types';
import { LocalSignalingServer, SIGNAL_PORT } from './LocalSignalingServer';
import { LocalSignalingClient } from './LocalSignalingClient';
export class SessionService extends EventBus {
  role: Role | null = null; sessionCode = ''; hostIp = ''; port = SIGNAL_PORT; private transport: any;
  bindTransport(role: Role, t: LocalSignalingServer | LocalSignalingClient) {
    this.role = role; this.transport = t;
    t.on('message', (m: SignalMessage) => this.emit('message', m));
    t.on('status', (s: string) => this.emit('status', s));
    t.on('error', (e: string) => this.emit('error', e));
  }
  send(type: SignalMessage['type'], payload?: any) {
    const msg: SignalMessage = { type, payload, sessionCode: this.sessionCode, from: this.role || undefined, ts: Date.now() };
    this.transport?.send(msg);
  }
  close() { this.transport?.stop?.(); this.removeAll(); this.role = null; }
}
export const sessionService = new SessionService();
