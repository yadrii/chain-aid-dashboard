import { MapPin, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from './ProgressBar';
import { Campaign } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CampaignCardProps {
  campaign: Campaign;
  onDonate?: (campaign: Campaign) => void;
}

export function CampaignCard({ campaign, onDonate }: CampaignCardProps) {
  const isCompleted = campaign.status === 'completed';

  return (
    <div className="campaign-card flex flex-col">
      <div className="h-40 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute bottom-3 left-3">
          <Badge 
            variant="secondary"
            className={cn(
              'gap-1',
              isCompleted 
                ? 'bg-success/90 text-success-foreground' 
                : 'bg-accent/90 text-accent-foreground'
            )}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                Active
              </>
            )}
          </Badge>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-2 mb-2">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{campaign.location}</span>
        </div>
        
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
          {campaign.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {campaign.shortDescription}
        </p>
        
        <ProgressBar 
          current={campaign.collectedAmount} 
          target={campaign.targetAmount}
          size="sm"
          className="mb-4"
        />
        
        <div className="flex gap-2">
          <Button 
            asChild 
            variant="outline" 
            className="flex-1 border-border hover:bg-secondary"
          >
            <Link to={`/campaign/${campaign.id}`}>View Details</Link>
          </Button>
          {!isCompleted && (
            <Button 
              className="flex-1 bg-gradient-accent text-accent-foreground hover:opacity-90"
              onClick={() => onDonate?.(campaign)}
            >
              Donate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
