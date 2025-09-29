import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  Download, 
  Calendar as CalendarIcon, 
  FileText, 
  BarChart3,
  PieChart,
  TrendingUp,
  Globe,
  Users,
  Leaf
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
// Remove this import since date-fns might not be available
// import { format } from "date-fns";

export function Reporting() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // Mock data for charts
  const sequestrationData = [
    { month: "Jan", mangrove: 1200, seagrass: 800, saltmarsh: 400 },
    { month: "Feb", mangrove: 1500, seagrass: 950, saltmarsh: 380 },
    { month: "Mar", mangrove: 1800, seagrass: 1100, saltmarsh: 450 },
    { month: "Apr", mangrove: 2100, seagrass: 1250, saltmarsh: 520 },
    { month: "May", mangrove: 2400, seagrass: 1400, saltmarsh: 580 },
    { month: "Jun", mangrove: 2800, seagrass: 1600, saltmarsh: 620 },
  ];

  const regionData = [
    { name: "Southeast Asia", value: 35, projects: 48 },
    { name: "Australia/Pacific", value: 28, projects: 32 },
    { name: "Americas", value: 22, projects: 31 },
    { name: "Africa", value: 10, projects: 18 },
    { name: "Europe", value: 5, projects: 13 },
  ];

  const engagementData = [
    { month: "Jan", communities: 25, individuals: 450, organizations: 12 },
    { month: "Feb", communities: 32, individuals: 580, organizations: 15 },
    { month: "Mar", communities: 38, individuals: 720, organizations: 18 },
    { month: "Apr", communities: 45, individuals: 890, organizations: 22 },
    { month: "May", communities: 52, individuals: 1050, organizations: 28 },
    { month: "Jun", communities: 58, individuals: 1200, organizations: 32 },
  ];

  const transactionData = [
    { month: "Jan", volume: 850, value: 12150 },
    { month: "Feb", volume: 1200, value: 17400 },
    { month: "Mar", volume: 950, value: 13680 },
    { month: "Apr", volume: 1800, value: 25920 },
    { month: "May", volume: 1350, value: 19440 },
    { month: "Jun", volume: 2100, value: 30240 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const reportTypes = [
    {
      title: "Environmental Impact Report",
      description: "Carbon sequestration by project and region",
      icon: Leaf,
      fields: ["Date Range", "Project Type", "Region"]
    },
    {
      title: "Community Engagement Report", 
      description: "Participation metrics and demographics",
      icon: Users,
      fields: ["Date Range", "Community Type", "Engagement Level"]
    },
    {
      title: "Market Transaction Summary",
      description: "Trading volume and value analysis",
      icon: TrendingUp,
      fields: ["Date Range", "Transaction Type", "Market Segment"]
    },
    {
      title: "Global Distribution Report",
      description: "Geographic project distribution and impact",
      icon: Globe,
      fields: ["Date Range", "Country/Region", "Ecosystem Type"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Report Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((report, index) => {
              const Icon = report.icon;
              return (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="h-8 w-8 text-primary" />
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                    <h3 className="font-medium mb-2">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                    <div className="space-y-1">
                      {report.fields.map((field, fieldIndex) => (
                        <span key={fieldIndex} className="inline-block text-xs bg-muted px-2 py-1 rounded mr-1">
                          {field}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Date Range Selector */}
          <div className="mt-6 p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-4">Custom Report Parameters</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? startDate.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? endDate.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Project Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="mangrove">Mangrove</SelectItem>
                    <SelectItem value="seagrass">Seagrass</SelectItem>
                    <SelectItem value="saltmarsh">Salt Marsh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Region</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="asia">Southeast Asia</SelectItem>
                    <SelectItem value="pacific">Australia/Pacific</SelectItem>
                    <SelectItem value="americas">Americas</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="mt-4">
              <FileText className="h-4 w-4 mr-2" />
              Generate Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pre-built Dashboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Sequestration Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-green-600" />
              Carbon Sequestration by Ecosystem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sequestrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} tons`, name]} />
                  <Area 
                    type="monotone" 
                    dataKey="mangrove" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.8}
                    name="Mangrove"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="seagrass" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.8}
                    name="Seagrass"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="saltmarsh" 
                    stackId="1"
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.8}
                    name="Salt Marsh"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              Project Distribution by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Community Engagement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Community Engagement Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="communities" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Communities"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="individuals" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Individuals"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="organizations" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Organizations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Market Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
              Market Transaction Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'volume' ? `${value} credits` : `$${value.toLocaleString()}`,
                      name === 'volume' ? 'Volume' : 'Value'
                    ]} 
                  />
                  <Bar yAxisId="left" dataKey="volume" fill="#3b82f6" name="volume" />
                  <Bar yAxisId="right" dataKey="value" fill="#10b981" name="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export All Charts (PDF)
            </Button>
            <Button variant="outline" className="justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Raw Data (CSV)
            </Button>
            <Button variant="outline" className="justify-start">
              <PieChart className="h-4 w-4 mr-2" />
              Executive Summary (PPT)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}