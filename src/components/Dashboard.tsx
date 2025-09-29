import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { 
  TrendingUp, 
  Users, 
  Leaf, 
  Recycle,
  MapPin,
  Activity,
  ArrowUpRight,
  Eye,
  LineChart as LineChartIcon
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import { SatelliteMap } from "./SatelliteMap";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { DashboardSkeleton } from "./SkeletonLoaders";

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartLegendHover, setChartLegendHover] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mock data for charts
  const creditData = [
    { month: "Jan", issued: 1200, retired: 800 },
    { month: "Feb", issued: 1900, retired: 1200 },
    { month: "Mar", issued: 2100, retired: 1600 },
    { month: "Apr", issued: 2800, retired: 2000 },
    { month: "May", issued: 3200, retired: 2400 },
    { month: "Jun", issued: 3800, retired: 2900 },
  ];

  const activityData = [
    { time: "9:45 AM", action: "Project 'Sundarbans Delta' submitted for validation", type: "project", status: "pending" },
    { time: "9:32 AM", action: "New User 'Org ABC' completed Tier 2 verification", type: "user", status: "completed" },
    { time: "9:15 AM", action: "Credit batch #BC-2024-0156 issued for 'Mangrove Restoration KL'", type: "credit", status: "completed" },
    { time: "8:58 AM", action: "Auditor 'Environmental Solutions Ltd' approved MRV data", type: "validation", status: "completed" },
    { time: "8:43 AM", action: "User 'Coastal Communities Org' requested Tier 3 verification", type: "user", status: "pending" },
  ];

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border">
          <p className="font-medium text-sm mb-2">{`Month: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="transition-all duration-250 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">Total Projects</CardTitle>
              <Leaf className="h-4 w-4 text-green-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors cursor-pointer">142</div>
              <div className="flex flex-wrap items-center gap-1 mt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="text-xs hover:bg-secondary/80 cursor-help">68 Active</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total number of currently active projects</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs hover:bg-muted cursor-help">52 Pending</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Projects awaiting validation or approval</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="default" className="text-xs hover:bg-primary/80 cursor-help">22 Completed</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Successfully completed projects</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-250 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">Verified Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors cursor-pointer">1,247</div>
              <div className="flex flex-wrap items-center gap-1 mt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="default" className="text-xs hover:bg-primary/80 cursor-help">324 Tier 3</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Highest tier verified organizations</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="text-xs hover:bg-secondary/80 cursor-help">589 Tier 2</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mid-tier verified organizations</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs hover:bg-muted cursor-help">334 Tier 1</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Basic tier verified organizations</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-250 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">Credits Issued</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors cursor-pointer">18,642</div>
              <p className="text-xs text-muted-foreground">
                Total carbon credits issued
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +24%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-250 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">Credits Retired</CardTitle>
              <Recycle className="h-4 w-4 text-orange-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors cursor-pointer">12,389</div>
              <p className="text-xs text-muted-foreground">
                Total carbon credits retired
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +18%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
      </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Charts */}
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Credits Issued vs Retired Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={creditData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend
                        onMouseEnter={(e) => setChartLegendHover(e.dataKey)}
                        onMouseLeave={() => setChartLegendHover(null)}
                        wrapperStyle={{ cursor: 'pointer' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="issued" 
                        stackId="1"
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={chartLegendHover === 'retired' ? 0.2 : 0.6}
                        name="Credits Issued"
                        className="transition-all duration-200"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="retired" 
                        stackId="1"
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        fillOpacity={chartLegendHover === 'issued' ? 0.2 : 0.6}
                        name="Credits Retired"
                        className="transition-all duration-200"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>India Project Distribution</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Map
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-64 w-full overflow-hidden rounded-lg">
                  <SatelliteMap onProjectClick={handleProjectClick} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Recent Activity
              </CardTitle>
              <Badge variant="secondary" className="animate-pulse">Live</Badge>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              {/* Animated timeline line */}
              {/* <div 
                className="absolute left-8 top-20 w-0.5 bg-gradient-to-b from-blue-500 to-green-500 animate-pulse z-0"
                style={{
                  height: `${Math.min(activityData.length * 80, 320)}px`,
                  animation: 'drawLine 2s ease-in-out'
                }}
              /> */}
              {activityData.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-3 rounded-lg border bg-card/50 hover:bg-gray-50 transition-colors duration-200 cursor-pointer relative z-10"
                >
                  <div className="flex-shrink-0 relative">
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-blue-500 flex items-center justify-center">
                      {activity.type === "project" && <Leaf className="h-3 w-3 text-green-600" />}
                      {activity.type === "user" && <Users className="h-3 w-3 text-blue-600" />}
                      {activity.type === "credit" && <TrendingUp className="h-3 w-3 text-emerald-600" />}
                      {activity.type === "validation" && <LineChartIcon className="h-3 w-3 text-purple-600" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <Badge 
                        variant={activity.status === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full hover:bg-muted transition-colors duration-200">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </TooltipProvider>
  );
}