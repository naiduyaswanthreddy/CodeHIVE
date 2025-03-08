
import { Button } from "@/components/ui/button";
import { Wallet, AlertCircle, ExternalLink } from "lucide-react";
import { getKeychainDownloadLink } from "@/utils/hive";
import { useHiveWallet } from "@/hooks/use-hive-wallet";
import { WalletMenu } from "./WalletMenu";
import { ConnectWalletDialog } from "./ConnectWalletDialog";
import { useToast } from "@/hooks/use-toast";

export const WalletConnect = () => {
  const { toast } = useToast();
  const {
    username,
    setUsername,
    connected,
    connectedUser,
    isDialogOpen,
    setIsDialogOpen,
    isKeychainAvailable,
    isLoading,
    isRefreshing,
    accountInfo,
    handleConnect,
    handleDisconnect,
    fetchUserAccountInfo
  } = useHiveWallet();

  const openConnectDialog = () => {
    if (!isKeychainAvailable) {
      const downloadLink = getKeychainDownloadLink();
      toast({
        title: "Hive Keychain not detected",
        description: (
          <div className="flex flex-col gap-2">
            <p>Please install the Hive Keychain browser extension to connect your wallet.</p>
            <a 
              href={downloadLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
            >
              Download Hive Keychain <ExternalLink size={14} />
            </a>
          </div>
        ),
        variant: "destructive",
      });
      return;
    }
    setIsDialogOpen(true);
  };

  const handleRefreshBalance = () => {
    if (connectedUser) {
      fetchUserAccountInfo(connectedUser);
    }
  };

  return (
    <>
      {connected && connectedUser ? (
        <WalletMenu
          connectedUser={connectedUser}
          accountInfo={accountInfo}
          isRefreshing={isRefreshing}
          onRefresh={handleRefreshBalance}
          onDisconnect={handleDisconnect}
        />
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={openConnectDialog}
          className="flex items-center gap-2 border-input text-foreground"
        >
          {!isKeychainAvailable ? (
            <AlertCircle size={16} className="text-yellow-500" />
          ) : (
            <Wallet size={16} className="text-foreground" />
          )}
          <span>Connect Wallet</span>
        </Button>
      )}

      <ConnectWalletDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        username={username}
        onUsernameChange={setUsername}
        onConnect={handleConnect}
        isLoading={isLoading}
      />
    </>
  );
};
