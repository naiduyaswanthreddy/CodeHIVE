
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  connectWithKeychain, 
  disconnectWallet, 
  getConnectedUsername, 
  isKeychainInstalled, 
  getKeychainDownloadLink,
  fetchAccountInfo,
  getStoredAccountInfo
} from "@/utils/hive";

export const useHiveWallet = () => {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [connectedUser, setConnectedUser] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isKeychainAvailable, setIsKeychainAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const keychainAvailable = isKeychainInstalled();
    setIsKeychainAvailable(keychainAvailable);
    
    const storedUsername = getConnectedUsername();
    if (storedUsername) {
      setConnectedUser(storedUsername);
      setConnected(true);
      
      const storedAccountInfo = getStoredAccountInfo();
      if (storedAccountInfo) {
        setAccountInfo(storedAccountInfo);
      } else {
        fetchUserAccountInfo(storedUsername);
      }
    }
  }, []);

  const fetchUserAccountInfo = async (username: string) => {
    try {
      setIsRefreshing(true);
      const info = await fetchAccountInfo(username);
      setAccountInfo(info);
    } catch (error) {
      console.error("Failed to fetch account info:", error);
      toast({
        title: "Error fetching account info",
        description: "Could not retrieve your Hive account details",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleConnect = async () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter your Hive username",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await connectWithKeychain(username);
      
      if (result.success) {
        setConnectedUser(username);
        setConnected(true);
        setIsDialogOpen(false);
        
        if (result.account) {
          setAccountInfo(result.account);
        }
        
        toast({
          title: "Connected to Hive",
          description: result.message,
        });
      } else {
        toast({
          title: "Connection failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setConnected(false);
    setConnectedUser(null);
    setAccountInfo(null);
    toast({
      title: "Disconnected",
      description: "You have been disconnected from your Hive wallet",
    });
  };

  return {
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
  };
};
