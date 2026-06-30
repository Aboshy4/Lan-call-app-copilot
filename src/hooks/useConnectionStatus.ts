import { useEffect, useState } from 'react';
import { sessionService } from '../services/SessionService';
export const useConnectionStatus = () => { const [status, setStatus] = useState('idle'); useEffect(() => sessionService.on('status', setStatus), []); return status; };
