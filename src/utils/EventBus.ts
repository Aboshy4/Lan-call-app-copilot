export type Listener<T = any> = (value: T) => void;
export class EventBus {
  private listeners = new Map<string, Set<Listener>>();
  on<T = any>(event: string, cb: Listener<T>) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(cb as Listener);
    return () => this.off(event, cb);
  }
  off<T = any>(event: string, cb: Listener<T>) { this.listeners.get(event)?.delete(cb as Listener); }
  emit<T = any>(event: string, value: T) { this.listeners.get(event)?.forEach(cb => cb(value)); }
  removeAll() { this.listeners.clear(); }
}
