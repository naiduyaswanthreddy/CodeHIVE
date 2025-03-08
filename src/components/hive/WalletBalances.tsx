
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";

interface WalletBalancesProps {
  accountInfo: any;
  isRefreshing: boolean;
}

export const WalletBalances = ({ accountInfo, isRefreshing }: WalletBalancesProps) => {
  if (isRefreshing) {
    return <Skeleton className="h-3 w-14" />;
  }

  if (!accountInfo) {
    return null;
  }

  return (
    <div className="flex flex-col items-start">
      <span className="text-xs font-medium text-foreground">
        {accountInfo.balance}
      </span>
      {accountInfo.hbd_balance && (
        <span className="text-xs text-muted-foreground">
          {accountInfo.hbd_balance}
        </span>
      )}
    </div>
  );
};
