import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Search, 
  Filter, 
  FileText, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Download,
  MessageSquare
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function ProjectManagement() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock project data
  const projects = [
    {
      id: "BC-2024-001",
      name: "Sundarbans Delta Restoration",
      entity: "Coastal Communities Org",
      dateSubmitted: "2024-01-15",
      status: "pending-mrv",
      type: "Mangrove",
      location: "Bangladesh",
      area: "2,450 hectares",
      expectedCredits: 12500
    },
    {
      id: "BC-2024-002", 
      name: "Mangrove Restoration KL",
      entity: "Green Earth Foundation",
      dateSubmitted: "2024-01-12",
      status: "pending-validation",
      type: "Mangrove",
      location: "Malaysia",
      area: "1,800 hectares",
      expectedCredits: 9200
    },
    {
      id: "BC-2024-003",
      name: "Seagrass Conservation Project",
      entity: "Marine Life Institute",
      dateSubmitted: "2024-01-10",
      status: "approved",
      type: "Seagrass",
      location: "Australia",
      area: "3,200 hectares",
      expectedCredits: 15800
    },
    {
      id: "BC-2024-004",
      name: "Salt Marsh Rehabilitation",
      entity: "Coastal Restoration LLC",
      dateSubmitted: "2024-01-08",
      status: "pending-pdd",
      type: "Salt Marsh",
      location: "United States",
      area: "950 hectares",
      expectedCredits: 4800
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "pending-validation": return "secondary";
      case "pending-mrv": return "destructive";
      case "pending-pdd": return "outline";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved": return "Approved";
      case "pending-validation": return "Pending Validation";
      case "pending-mrv": return "Pending MRV Data";
      case "pending-pdd": return "Pending PDD Review";
      default: return status;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.entity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Project Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search projects or entities..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending-pdd">Pending PDD Review</SelectItem>
                <SelectItem value="pending-mrv">Pending MRV Data</SelectItem>
                <SelectItem value="pending-validation">Pending Validation</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{project.entity}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {project.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.dateSubmitted}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{project.name}</DialogTitle>
                          </DialogHeader>
                          <ProjectDetails project={project} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectDetails({ project }: { project: any }) {
  const mockMRVData = [
    {
      id: "MRV-001",
      date: "2024-01-15",
      type: "Photo",
      description: "Mangrove seedling progress - North section",
      location: { lat: 22.1568, lng: 89.1339 },
      status: "verified"
    },
    {
      id: "MRV-002", 
      date: "2024-01-14",
      type: "Measurement",
      description: "Water salinity levels - monitoring station 3",
      location: { lat: 22.1498, lng: 89.1405 },
      status: "pending"
    },
    {
      id: "MRV-003",
      date: "2024-01-13", 
      type: "Video",
      description: "Community engagement session",
      location: { lat: 22.1634, lng: 89.1278 },
      status: "verified"
    }
  ];

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summary">Summary & Documents</TabsTrigger>
        <TabsTrigger value="mrv">MRV Data Audit</TabsTrigger>
        <TabsTrigger value="audit">Audit Trail</TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Project Area</p>
                <p className="text-sm text-muted-foreground">{project.area}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Expected Credits</p>
                <p className="text-sm text-muted-foreground">{project.expectedCredits.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Ecosystem Type</p>
                <Badge variant="outline">{project.type}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="text-sm">Project Design Document</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="text-sm">Environmental Impact Assessment</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="text-sm">Community Consent Forms</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Project
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Request More Information
          </Button>
          <Button variant="destructive">
            <AlertCircle className="h-4 w-4 mr-2" />
            Reject Project
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="mrv" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">MRV Data Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {mockMRVData.map((item) => (
                <div key={item.id} className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={item.status === "verified" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-sm font-medium">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interactive Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center space-y-2">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Interactive map view</p>
                  <p className="text-xs text-muted-foreground">Geo-tagged MRV data points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="audit" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Audit Trail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border-l-4 border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Project submitted for review</p>
                  <p className="text-xs text-muted-foreground">By: Coastal Communities Org • Jan 15, 2024 at 9:45 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                <Eye className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">PDD reviewed by Admin User</p>
                  <p className="text-xs text-muted-foreground">By: Admin User • Jan 15, 2024 at 10:20 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border-l-4 border-yellow-500 bg-yellow-50">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Awaiting MRV data submission</p>
                  <p className="text-xs text-muted-foreground">Status: Pending • Current step in workflow</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}