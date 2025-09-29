import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X, MapPin, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Project {
  id: string;
  name: string;
  status: "Active" | "Pending" | "Completed";
  coordinates: [number, number][];
  creditsIssued: number;
  creditsRetired: number;
  areaCovered: number;
  verificationStatus: "Verified" | "Under Review" | "Approved";
  description: string;
  images: string[];
  recentActivity: Array<{
    date: string;
    event: string;
    type: string;
  }>;
}

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "verification":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "credit":
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case "monitoring":
        return <MapPin className="h-4 w-4 text-orange-600" />;
      case "engagement":
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl">{project.name}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">Project ID: {project.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <Badge className={getVerificationColor(project.verificationStatus)}>
                  {project.verificationStatus}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Image Carousel */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`${project.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{project.creditsIssued.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Credits Issued</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{project.creditsRetired.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Credits Retired</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{project.areaCovered.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Area (Ha)</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((project.creditsRetired / project.creditsIssued) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Retirement Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground mb-4">{project.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium mb-2">Location Details</h4>
                        <p className="text-muted-foreground">
                          Coordinates: {project.coordinates[0]?.[0]?.toFixed(2)}°, {project.coordinates[0]?.[1]?.toFixed(2)}°
                        </p>
                        <p className="text-muted-foreground">
                          Coverage Area: {project.areaCovered.toLocaleString()} hectares
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Carbon Impact</h4>
                        <p className="text-muted-foreground">
                          Total Credits: {project.creditsIssued.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground">
                          Retired Credits: {project.creditsRetired.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                          <div className="flex-shrink-0 mt-0.5">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.event}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(activity.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {activity.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t bg-muted/30">
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>
                View Full Report
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}