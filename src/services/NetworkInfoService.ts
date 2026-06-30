import { NetworkInfo } from 'react-native-network-info';
import NetInfo from '@react-native-community/netinfo';
export class NetworkInfoService {
  static async getLocalIp(): Promise<string> {
    return (await NetworkInfo.getIPV4Address()) || (await NetworkInfo.getIPAddress()) || '0.0.0.0';
  }
  static async getBroadcast(): Promise<string> {
    return (await NetworkInfo.getBroadcast()) || '255.255.255.255';
  }
  static async getSummary() {
    const state = await NetInfo.fetch();
    return { type: state.type, connected: !!state.isConnected, ip: await this.getLocalIp(), broadcast: await this.getBroadcast() };
  }
}
