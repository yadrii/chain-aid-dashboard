import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WalletConnectButtonProps {
  variant?: 'default' | 'hero';
}

export function WalletConnectButton({ variant = 'default' }: WalletConnectButtonProps) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');

  const handleConnect = () => {
    // Simulate wallet connection
    setConnected(true);
    setAddress('0x7890...1234');
  };

  const handleDisconnect = () => {
    setConnected(false);
    setAddress('');
  };

  if (connected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 border-primary/20 bg-card hover:bg-secondary"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{address}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border">
          <DropdownMenuItem onClick={handleDisconnect}>
            Disconnect Wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      className={
        variant === 'hero' 
          ? 'gap-2 bg-gradient-accent text-accent-foreground hover:opacity-90 shadow-lg' 
          : 'gap-2 bg-primary text-primary-foreground hover:bg-primary/90'
      }
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
