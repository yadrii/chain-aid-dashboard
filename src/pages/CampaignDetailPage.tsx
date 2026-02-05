import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Shield, 
  CheckCircle2,
  User,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { ProgressBar } from '@/components/ProgressBar';
import { TransactionTable } from '@/components/TransactionTable';
import { campaigns, transactions } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const CampaignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [donationAmount, setDonationAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const campaign = campaigns.find(c => c.id === id);
  const campaignTransactions = transactions.filter(t => t.campaignId === id);

  if (!campaign) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Campaign Not Found</h1>
          <Button asChild>
            <Link to="/campaigns">Back to Campaigns</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleDonate = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid donation amount.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Donation Successful!',
      description: `Thank you for donating $${donationAmount}. Your transaction is being processed on the blockchain.`,
    });
    
    setIsProcessing(false);
    setDonationAmount('');
  };

  const isCompleted = campaign.status === 'completed';

  return (
    <Layout>
      {/* Banner */}
      <div className="hero-gradient h-48 md:h-64 relative">
        <div className="absolute inset-0 bg-primary/20" />
        <div className="container mx-auto px-4 h-full flex items-end pb-6">
          <Button 
            asChild 
            variant="outline" 
            size="sm"
            className="bg-card/90 backdrop-blur-sm border-border"
          >
            <Link to="/campaigns">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Campaigns
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge 
                  variant="secondary"
                  className={cn(
                    'gap-1',
                    isCompleted 
                      ? 'bg-success/10 text-success border-success/20' 
                      : 'bg-accent/10 text-accent border-accent/20'
                  )}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </>
                  ) : (
                    'Active Campaign'
                  )}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {campaign.location}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {campaign.name}
              </h1>
              
              <p className="text-muted-foreground leading-relaxed">
                {campaign.description}
              </p>
            </div>

            {/* Progress */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Funding Progress</h2>
              <ProgressBar 
                current={campaign.collectedAmount} 
                target={campaign.targetAmount}
                size="lg"
              />
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Started: {new Date(campaign.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Ends: {new Date(campaign.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Campaign Organizer</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{campaign.organizer.name}</p>
                    {campaign.organizer.verified && (
                      <Badge variant="secondary" className="gap-1 bg-success/10 text-success text-xs">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    {campaign.organizer.wallet}
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Blockchain Transaction History
              </h2>
              {campaignTransactions.length > 0 ? (
                <TransactionTable transactions={campaignTransactions} />
              ) : (
                <div className="bg-card rounded-xl p-8 text-center border border-border">
                  <p className="text-muted-foreground">No transactions yet. Be the first to donate!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Donation Form */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {isCompleted ? 'Campaign Completed' : 'Make a Donation'}
              </h2>
              
              {!isCompleted ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-foreground">Amount (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="pl-8 bg-background border-border"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {[25, 50, 100, 250].map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        size="sm"
                        onClick={() => setDonationAmount(preset.toString())}
                        className={donationAmount === preset.toString() ? 'border-accent bg-accent/10' : 'border-border'}
                      >
                        ${preset}
                      </Button>
                    ))}
                  </div>

                  <Button 
                    className="w-full gap-2 bg-gradient-accent text-accent-foreground hover:opacity-90"
                    onClick={handleDonate}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      'Processing...'
                    ) : (
                      <>
                        <Wallet className="h-4 w-4" />
                        Donate Now
                      </>
                    )}
                  </Button>

                  <div className="bg-secondary/50 rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-success" />
                      <span className="text-foreground">Secured by blockchain</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your transaction will be recorded on the blockchain for complete transparency.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    This campaign has successfully reached its funding goal. Thank you to all donors!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetailPage;
