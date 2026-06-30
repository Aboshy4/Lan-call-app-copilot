import { mediaDevices, RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, MediaStream } from 'react-native-webrtc';
import { EventBus } from '../utils/EventBus';
import { sessionService } from './SessionService';
import { SignalMessage } from '../types';
export class WebRtcService extends EventBus {
  private pc: any; localStream?: MediaStream; remoteStream?: MediaStream; private unsub?: () => void;
  async init() {
    this.pc = new RTCPeerConnection({ iceServers: [], bundlePolicy: 'max-bundle' });
    this.pc.onicecandidate = (e: any) => { if (e.candidate) sessionService.send('webrtc-ice', e.candidate); };
    this.pc.ontrack = (e: any) => { this.remoteStream = e.streams[0]; this.emit('remoteStream', this.remoteStream); };
    this.localStream = await mediaDevices.getUserMedia({ audio: true, video: { facingMode: 'user', width: 640, height: 480, frameRate: 24 } });
    this.localStream.getTracks().forEach((track: any) => this.pc.addTrack(track, this.localStream));
    this.emit('localStream', this.localStream);
    this.unsub = sessionService.on('message', (m: SignalMessage) => this.handleSignal(m));
  }
  async startCall() {
    const offer = await this.pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
    await this.pc.setLocalDescription(offer); sessionService.send('webrtc-offer', offer);
  }
  async handleInitialOffer(offer: any) { await this.handleOffer(offer); }
  private async handleSignal(m: SignalMessage) {
    if (m.type === 'webrtc-offer') await this.handleOffer(m.payload);
    if (m.type === 'webrtc-answer') await this.handleAnswer(m.payload);
    if (m.type === 'webrtc-ice') await this.handleIce(m.payload);
    if (m.type === 'call-ended') this.close(false);
  }
  private async handleOffer(offer: any) {
    await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.pc.createAnswer(); await this.pc.setLocalDescription(answer); sessionService.send('webrtc-answer', answer);
  }
  private async handleAnswer(answer: any) { await this.pc.setRemoteDescription(new RTCSessionDescription(answer)); }
  private async handleIce(candidate: any) { try { await this.pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (e) { this.emit('error', String(e)); } }
  toggleMic(enabled: boolean) { this.localStream?.getAudioTracks().forEach((t: any) => t.enabled = enabled); }
  toggleCamera(enabled: boolean) { this.localStream?.getVideoTracks().forEach((t: any) => t.enabled = enabled); }
  switchCamera() { const track: any = this.localStream?.getVideoTracks()[0]; if (track && typeof track._switchCamera === 'function') track._switchCamera(); }
  close(notify = true) { if (notify) sessionService.send('call-ended'); this.unsub?.(); this.localStream?.getTracks().forEach((t: any) => t.stop()); this.pc?.close(); this.emit('closed', true); }
}
