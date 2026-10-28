import { useEffect } from 'react';

export const AD_GATEWAY_PASSED_KEY = 'ad_gateway_passed';

interface AdGatewayProps {
  onContinue: () => void;
}

export function AdGateway({ onContinue }: AdGatewayProps) {
  useEffect(() => {
    onContinue();
  }, [onContinue]);

  return null;
}
