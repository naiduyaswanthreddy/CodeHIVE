
import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { FooterSection } from "@/components/landing/FooterSection";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectModal } from "@/components/project/ProjectModal";
import { getConnectedUsername, fetchLatestProjects, formatPostToProject } from "@/utils/hive";
import { Loader2, AlertCircle, PlusCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JoinMovementSection } from "@/components/landing/JoinMovementSection";

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState("created");
  const [projects, setProjects] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const username = getConnectedUsername();
    
    if (!username) {
      toast({
        title: "Not connected",
        description: "Please connect your Hive wallet to view your projects",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    const fetchUserProjects = async () => {
      try {
        setIsLoading(true);
        
        // Fetch projects created by the user from Hive
        const hivePosts = await fetchLatestProjects('crowdhive', 'created', 50);
        
        // Filter posts by the current user
        const userPosts = hivePosts.filter(post => post.author === username);
        
        // Format the posts to match our project structure
        const formattedProjects = userPosts
          .map(post => formatPostToProject(post))
          .filter(Boolean); // Remove null values
        
        setProjects(formattedProjects);
        
        // Get draft projects from localStorage
        const storedDrafts = JSON.parse(localStorage.getItem('projectDrafts') || '[]');
        const userDrafts = storedDrafts.filter((draft: any) => draft.creator === username);
        setDrafts(userDrafts);
        
        // For contributions, we would fetch transfers from the blockchain
        // This is simplified for now
        setContributions([]);
        
      } catch (error) {
        console.error("Error fetching user projects:", error);
        toast({
          title: "Error",
          description: "Failed to load your projects. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProjects();
  }, [toast]);
  
  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const handleCreateProject = () => {
    // Get the create project button from JoinMovementSection
    document.getElementById('create-project-btn')?.click();
  };
  
  const handleDeleteDraft = (draftId: string) => {
    try {
      // Get drafts from localStorage
      const storedDrafts = JSON.parse(localStorage.getItem('projectDrafts') || '[]');
      // Filter out the draft to delete
      const updatedDrafts = storedDrafts.filter((draft: any) => draft.id !== draftId);
      // Save updated drafts back to localStorage
      localStorage.setItem('projectDrafts', JSON.stringify(updatedDrafts));
      // Update state
      setDrafts(drafts.filter(draft => draft.id !== draftId));
      
      toast({
        title: "Draft deleted",
        description: "Your project draft has been removed",
      });
    } catch (error) {
      console.error("Error deleting draft:", error);
      toast({
        title: "Error",
        description: "Failed to delete the draft. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const renderContent = () => {
    if (!getConnectedUsername()) {
      return (
        <div className="text-center py-20">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Please connect your Hive wallet to view your projects, drafts, and contributions.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Go to Home
          </Button>
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      );
    }
    
    if (activeTab === "created" && projects.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-4">You haven't created any projects yet</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Start a new project today and share your ideas with the Hive community!
          </p>
          <Button
            onClick={handleCreateProject}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
        </div>
      );
    }
    
    if (activeTab === "drafts" && drafts.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-4">No Drafts Found</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            You don't have any saved drafts. Start creating a project and save it as a draft to continue later.
          </p>
          <Button
            onClick={handleCreateProject}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
        </div>
      );
    }
    
    if (activeTab === "contributed" && contributions.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-4">No Contributions Yet</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            You haven't contributed to any projects yet. Explore projects and support creators!
          </p>
          <Button
            onClick={() => navigate('/projects')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Explore Projects
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeTab === "created" && projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
        
        {activeTab === "drafts" && drafts.map(draft => (
          <div key={draft.id} className="relative">
            <ProjectCard
              project={{
                id: draft.id,
                title: draft.title,
                creator: draft.creator,
                description: draft.description || "Draft project",
                image: draft.coverImage || "https://placehold.co/600x400/3a206e/e8b4b6?text=Draft",
                category: draft.category,
                target: `${draft.fundingGoal || 0} HIVE`,
                raised: "0 HIVE",
                progress: 0
              }}
              onClick={() => handleCreateProject()}
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDraft(draft.id);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {activeTab === "contributed" && contributions.map(contribution => (
          <ProjectCard
            key={contribution.id}
            project={contribution}
            onClick={() => handleProjectClick(contribution)}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20 pb-10">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-bold mb-4 gradient-text">My Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Manage your created projects, drafts, and contributions
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10">
            <TabsList className="mb-8">
              <TabsTrigger value="created">Created Projects</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="contributed">Contributions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="created" className="mt-6">
              {renderContent()}
            </TabsContent>
            
            <TabsContent value="drafts" className="mt-6">
              {renderContent()}
            </TabsContent>
            
            <TabsContent value="contributed" className="mt-6">
              {renderContent()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="container px-4 mx-auto py-8">
        <Button
          onClick={handleCreateProject}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </div>
      
      <div className="hidden">
        <JoinMovementSection />
      </div>
      
      <FooterSection />
      
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MyProjects;
