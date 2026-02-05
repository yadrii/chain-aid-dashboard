import { useState } from 'react';
import { Wallet, Shield, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Campaign } from '@/data/mockData';
import { ProgressBar } from './ProgressBar';
import { useToast } from '@/hooks/use-toast';

interface DonationModalProps {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonationModal({ campaign, open, onOpenChange }: DonationModalProps) {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const presetAmounts = [50, 100, 250, 500];

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid donation amount.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Donation Successful!',
      description: `Thank you for donating $${amount} to ${campaign?.name}. Transaction is being processed on the blockchain.`,
    });
    
    setIsProcessing(false);
    setAmount('');
    onOpenChange(false);
  };

  if (!campaign) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Make a Donation</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Support {campaign.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <ProgressBar 
            current={campaign.collectedAmount} 
            target={campaign.targetAmount}
          />

          <div className="space-y-3">
            <Label htmlFor="amount" className="text-foreground">Donation Amount (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 bg-background border-border"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(preset.toString())}
                  className={amount === preset.toString() ? 'border-accent bg-accent/10' : 'border-border'}
                >
                  ${preset}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-foreground">Secured by blockchain technology</span>
            </div>
            <p className="text-xs text-muted-foreground">
              All transactions are recorded on the blockchain for complete transparency.
            </p>
          </div>

          <Button 
            className="w-full gap-2 bg-gradient-accent text-accent-foreground hover:opacity-90"
            onClick={handleDonate}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Wallet className="h-4 w-4" />
                Donate Now
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
