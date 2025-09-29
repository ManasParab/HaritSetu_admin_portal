import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Search,
  Shield,
  CheckCircle,
  Clock,
  Building
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function MarketplaceOversight() {
  // Mock market data
  const priceData = [
    { date: "Jan 1", price: 12.5 },
    { date: "Jan 8", price: 13.2 },
    { date: "Jan 15", price: 12.8 },
    { date: "Jan 22", price: 14.1 },
    { date: "Jan 29", price: 13.9 },
    { date: "Feb 5", price: 15.2 },
  ];

  const volumeData = [
    { date: "Jan 1", volume: 850 },
    { date: "Jan 8", volume: 1200 },
    { date: "Jan 15", volume: 950 },
    { date: "Jan 22", volume: 1800 },
    { date: "Jan 29", volume: 1350 },
    { date: "Feb 5", volume: 2100 },
  ];

  const orderBookData = {
    asks: [
      { price: 15.50, volume: 120, total: 120 },
      { price: 15.25, volume: 85, total: 205 },
      { price: 15.00, volume: 200, total: 405 },
      { price: 14.75, volume: 150, total: 555 },
      { price: 14.50, volume: 180, total: 735 },
    ],
    bids: [
      { price: 14.25, volume: 95, total: 95 },
      { price: 14.00, volume: 160, total: 255 },
      { price: 13.75, volume: 220, total: 475 },
      { price: 13.50, volume: 140, total: 615 },
      { price: 13.25, volume: 190, total: 805 },
    ]
  };

  const verifierAgencies = [
    {
      id: "VER-001",
      name: "Environmental Solutions Ltd",
      certifications: ["ISO 14064", "VCS", "Gold Standard"],
      walletAddress: "0x1234...5678",
      status: "active",
      projectsVerified: 45,
      dateRegistered: "2023-08-15"
    },
    {
      id: "VER-002", 
      name: "Carbon Trust International",
      certifications: ["ISO 14064", "CDM", "VCS"],
      walletAddress: "0x8765...4321",
      status: "active",
      projectsVerified: 72,
      dateRegistered: "2023-06-20"
    },
    {
      id: "VER-003",
      name: "Blue Carbon Auditing Co",
      certifications: ["VCS", "Blue Carbon Std"],
      walletAddress: "0x9876...1234",
      status: "pending",
      projectsVerified: 28,
      dateRegistered: "2024-01-10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">$14.25</p>
                <p className="text-sm text-muted-foreground">Average Credit Price</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">2,145</p>
                <p className="text-sm text-muted-foreground">24h Trading Volume</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">8,450</p>
                <p className="text-sm text-muted-foreground">Credits Listed</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">$30.4K</p>
                <p className="text-sm text-muted-foreground">24h Market Cap</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Price Trend (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Trading Volume (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Credits']} />
                  <Bar dataKey="volume" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Book */}
        <Card>
          <CardHeader>
            <CardTitle>Live Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Asks */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-red-600">Asks (Sell Orders)</h4>
                <div className="space-y-1">
                  {orderBookData.asks.map((ask, index) => (
                    <div key={index} className="grid grid-cols-3 text-sm p-2 bg-red-50 rounded">
                      <span className="text-red-600">${ask.price}</span>
                      <span>{ask.volume}</span>
                      <span className="text-muted-foreground">{ask.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Price */}
              <div className="text-center py-2 border-y">
                <span className="text-lg font-bold">$14.25</span>
                <span className="text-sm text-green-600 ml-2">+$0.52 (+3.8%)</span>
              </div>

              {/* Bids */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-green-600">Bids (Buy Orders)</h4>
                <div className="space-y-1">
                  {orderBookData.bids.map((bid, index) => (
                    <div key={index} className="grid grid-cols-3 text-sm p-2 bg-green-50 rounded">
                      <span className="text-green-600">${bid.price}</span>
                      <span>{bid.volume}</span>
                      <span className="text-muted-foreground">{bid.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Lifecycle Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Lifecycle Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Enter transaction or project ID..." 
                  className="pl-10"
                />
              </div>
              <Button className="w-full">Track Credit History</Button>

              {/* Sample tracking result */}
              <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                <h5 className="font-medium mb-3">Sample: Credit BC-2024-0156</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Minted: Jan 15, 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Listed: Jan 16, 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Sold: Jan 20, 2024 → Corporate Buyer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Status: Active (Not Retired)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verifier Agency Registry */}
      <Card>
        <CardHeader>
          <CardTitle>Accredited Verifier Agency Registry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agency</TableHead>
                  <TableHead>Certifications</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Projects Verified</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verifierAgencies.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{agency.name}</p>
                          <p className="text-sm text-muted-foreground">{agency.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {agency.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {agency.walletAddress}
                      </code>
                    </TableCell>
                    <TableCell>{agency.projectsVerified}</TableCell>
                    <TableCell>
                      <Badge variant={agency.status === "active" ? "default" : "secondary"}>
                        {agency.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {agency.status === "pending" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Shield className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        )}
                      </div>
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