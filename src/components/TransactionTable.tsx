import { ExternalLink, CheckCircle, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="font-semibold">Transaction Hash</TableHead>
            <TableHead className="font-semibold">Donor</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id} className="hover:bg-secondary/30">
              <TableCell>
                <a 
                  href="#" 
                  className="flex items-center gap-1 text-primary hover:underline font-mono text-sm"
                >
                  {truncateHash(tx.txHash)}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {tx.donor}
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                ${tx.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDate(tx.timestamp)}
              </TableCell>
              <TableCell>
                <Badge 
                  variant="secondary"
                  className={cn(
                    'gap-1',
                    tx.status === 'confirmed' 
                      ? 'bg-success/10 text-success border-success/20' 
                      : 'bg-warning/10 text-warning border-warning/20'
                  )}
                >
                  {tx.status === 'confirmed' ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  {tx.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
