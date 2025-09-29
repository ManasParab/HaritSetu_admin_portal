import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Search, 
  Filter, 
  Shield, 
  CheckCircle, 
  Clock, 
  User,
  FileText,
  Award,
  Building,
  Eye,
  Download
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function UserManagement() {
  const [tierFilter, setTierFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock user data
  const users = [
    {
      id: "USR-001",
      name: "Coastal Communities Org",
      email: "admin@coastalcommunities.org",
      type: "Organization",
      currentTier: "2",
      targetTier: "3",
      dateRegistered: "2023-12-15",
      status: "pending-verification",
      submittedDocuments: ["Aadhaar", "80G Certificate", "Land Ownership"],
      location: "Sundarbans, Bangladesh"
    },
    {
      id: "USR-002",
      name: "Green Earth Foundation",
      email: "verify@greenearth.org",
      type: "NGO",
      currentTier: "3",
      targetTier: "3",
      dateRegistered: "2023-11-20",
      status: "verified",
      submittedDocuments: ["Organization Certificate", "Tax Exemption", "Environmental License"],
      location: "Kuala Lumpur, Malaysia"
    },
    {
      id: "USR-003",
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@marinelab.in",
      type: "Individual",
      currentTier: "1",
      targetTier: "2",
      dateRegistered: "2024-01-05",
      status: "document-review",
      submittedDocuments: ["Aadhaar", "Academic Credentials"],
      location: "Chennai, India"
    },
    {
      id: "USR-004",
      name: "Marine Life Institute",
      email: "admin@marinelife.au",
      type: "Research Institution",
      currentTier: "3",
      targetTier: "3",
      dateRegistered: "2023-10-10",
      status: "verified",
      submittedDocuments: ["Institution License", "Research Permit", "Environmental Compliance"],
      location: "Sydney, Australia"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "default";
      case "pending-verification": return "secondary";
      case "document-review": return "destructive";
      case "rejected": return "outline";
      default: return "secondary";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "3": return "default";
      case "2": return "secondary";
      case "1": return "outline";
      default: return "outline";
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesTier = tierFilter === "all" || user.currentTier === tierFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">324</p>
                <p className="text-sm text-muted-foreground">Tier 3 Users</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">589</p>
                <p className="text-sm text-muted-foreground">Tier 2 Users</p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">334</p>
                <p className="text-sm text-muted-foreground">Tier 1 Users</p>
              </div>
              <User className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Verification Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search users or organizations..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="1">Tier 1</SelectItem>
                <SelectItem value="2">Tier 2</SelectItem>
                <SelectItem value="3">Tier 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Current Tier</TableHead>
                  <TableHead>Target Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {user.type === "Individual" ? user.name.split(' ').map(n => n[0]).join('') : 
                             user.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {user.type === "Individual" ? <User className="h-4 w-4 mr-2" /> : 
                         <Building className="h-4 w-4 mr-2" />}
                        {user.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTierColor(user.currentTier)}>
                        Tier {user.currentTier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTierColor(user.targetTier)}>
                        Tier {user.targetTier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)}>
                        {user.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.dateRegistered}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>User Profile: {user.name}</DialogTitle>
                          </DialogHeader>
                          <UserProfile user={user} />
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

function UserProfile({ user }: { user: any }) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile Information</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="history">Verification History</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Name/Organization</p>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground">{user.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{user.location}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Current Tier</p>
                <Badge variant={getTierColor(user.currentTier)}>
                  Tier {user.currentTier}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Target Tier</p>
                <Badge variant={getTierColor(user.targetTier)}>
                  Tier {user.targetTier}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={getStatusColor(user.status)}>
                  {user.status.replace('-', ' ')}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Registration Date</p>
                <p className="text-sm text-muted-foreground">{user.dateRegistered}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {user.status === "pending-verification" && (
          <div className="flex space-x-2">
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Tier {user.targetTier}
            </Button>
            <Button variant="outline">
              Request Additional Documents
            </Button>
            <Button variant="destructive">
              Reject Application
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Submitted Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {user.submittedDocuments.map((doc: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-3" />
                  <div>
                    <p className="text-sm font-medium">{doc}</p>
                    <p className="text-xs text-muted-foreground">Uploaded on {user.dateRegistered}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="text-xs">Verified</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Verification History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border-l-4 border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Tier 2 verification completed</p>
                  <p className="text-xs text-muted-foreground">Verified by: Admin User • Dec 20, 2023</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                <FileText className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Documents submitted for Tier 2</p>
                  <p className="text-xs text-muted-foreground">Submitted by: User • Dec 18, 2023</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border-l-4 border-gray-500 bg-gray-50">
                <User className="h-4 w-4 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Account registered</p>
                  <p className="text-xs text-muted-foreground">Registration date: {user.dateRegistered}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function getTierColor(tier: string) {
  switch (tier) {
    case "3": return "default";
    case "2": return "secondary";
    case "1": return "outline";
    default: return "outline";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "verified": return "default";
    case "pending-verification": return "secondary";
    case "document-review": return "destructive";
    case "rejected": return "outline";
    default: return "secondary";
  }
}