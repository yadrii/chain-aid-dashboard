import { useState } from 'react';
import { 
  Plus, 
  TrendingUp, 
  Target, 
  BarChart3,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { StatCard } from '@/components/StatCard';
import { ProgressBar } from '@/components/ProgressBar';
import { campaigns, stats } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    targetAmount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.location || !formData.targetAmount) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Campaign Created!',
      description: `"${formData.name}" has been created and is pending approval.`,
    });

    setFormData({ name: '', description: '', location: '', targetAmount: '' });
  };

  const totalRaised = campaigns.reduce((sum, c) => sum + c.collectedAmount, 0);
  const totalTarget = campaigns.reduce((sum, c) => sum + c.targetAmount, 0);
  const completionRate = Math.round((totalRaised / totalTarget) * 100);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage campaigns and monitor donation analytics
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Funds Raised"
            value={`$${(totalRaised / 1000000).toFixed(2)}M`}
            icon={TrendingUp}
          />
          <StatCard
            title="Target Amount"
            value={`$${(totalTarget / 1000000).toFixed(2)}M`}
            icon={Target}
          />
          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            icon={BarChart3}
          />
          <StatCard
            title="Total Campaigns"
            value={campaigns.length}
            icon={Plus}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Campaign Form */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Campaign
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Hurricane Relief Fund"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Disaster Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Florida, USA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount (USD) *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="targetAmount"
                      type="number"
                      placeholder="0"
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                      className="pl-8 bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the campaign and how funds will be used..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background border-border min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2 bg-gradient-accent text-accent-foreground hover:opacity-90"
                >
                  <Plus className="h-4 w-4" />
                  Create Campaign
                </Button>
              </form>
            </div>
          </div>

          {/* Campaign Management Table */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Campaign Management</h2>
                <p className="text-sm text-muted-foreground">View and manage all campaigns</p>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                      <TableHead className="font-semibold">Campaign</TableHead>
                      <TableHead className="font-semibold">Progress</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="hover:bg-secondary/30">
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{campaign.name}</p>
                            <p className="text-sm text-muted-foreground">{campaign.location}</p>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[180px]">
                          <ProgressBar 
                            current={campaign.collectedAmount} 
                            target={campaign.targetAmount}
                            size="sm"
                            showLabels={false}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            ${campaign.collectedAmount.toLocaleString()} / ${campaign.targetAmount.toLocaleString()}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            className={cn(
                              campaign.status === 'completed' 
                                ? 'bg-success/10 text-success' 
                                : campaign.status === 'active'
                                ? 'bg-accent/10 text-accent'
                                : 'bg-muted text-muted-foreground'
                            )}
                          >
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              asChild
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Link to={`/campaign/${campaign.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Analytics Overview */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Campaign Analytics Overview</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Overall Funding Progress</span>
                    <span className="font-medium text-foreground">{completionRate}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-accent rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">
                      {campaigns.filter(c => c.status === 'active').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Active Campaigns</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <p className="text-2xl font-bold text-success">
                      {campaigns.filter(c => c.status === 'completed').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
