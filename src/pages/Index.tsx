import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  Globe, 
  Users, 
  TrendingUp,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { StatCard } from '@/components/StatCard';
import { CampaignCard } from '@/components/CampaignCard';
import { DonationModal } from '@/components/DonationModal';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { campaigns, stats, Campaign } from '@/data/mockData';

const Index = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const activeCampaigns = campaigns.filter(c => c.status === 'active').slice(0, 3);

  const handleDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setModalOpen(true);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Powered by Blockchain Technology</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transparent Disaster Relief Donations Using{' '}
              <span className="text-accent">Blockchain</span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Every donation is tracked on the blockchain, ensuring complete transparency 
              and accountability from donor to recipient.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="gap-2 bg-gradient-accent text-accent-foreground hover:opacity-90 shadow-lg"
              >
                <Link to="/campaigns">
                  Donate Securely
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <WalletConnectButton variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Donations"
              value={`$${(stats.totalDonations / 1000000).toFixed(2)}M`}
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Active Campaigns"
              value={stats.activeCampaigns}
              icon={Heart}
            />
            <StatCard
              title="Completed Campaigns"
              value={stats.completedCampaigns}
              icon={CheckCircle2}
            />
            <StatCard
              title="Global Donors"
              value={stats.totalDonors.toLocaleString()}
              icon={Users}
              trend={{ value: 8, isPositive: true }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose ReliefChain?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines humanitarian values with cutting-edge technology 
              to maximize the impact of every donation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Complete Transparency',
                description: 'Every transaction is recorded on the blockchain, providing an immutable record of fund allocation.',
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Support disaster relief efforts anywhere in the world with instant, borderless transactions.',
              },
              {
                icon: Users,
                title: 'Verified Organizations',
                description: 'All campaign organizers are thoroughly vetted to ensure your donations reach those in need.',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-card">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Active Campaigns
              </h2>
              <p className="text-muted-foreground">
                Make a difference today by supporting these urgent relief efforts
              </p>
            </div>
            <Button asChild variant="outline" className="border-border">
              <Link to="/campaigns">
                View All Campaigns
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onDonate={handleDonate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join thousands of donors worldwide who trust ReliefChain for transparent, 
            secure disaster relief contributions.
          </p>
          <Button 
            asChild
            size="lg"
            className="gap-2 bg-gradient-accent text-accent-foreground hover:opacity-90 shadow-lg"
          >
            <Link to="/campaigns">
              Donate Securely
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <DonationModal 
        campaign={selectedCampaign}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </Layout>
  );
};

export default Index;
