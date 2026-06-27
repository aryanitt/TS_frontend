const performers = [
  { id: 1, name: "Alex Chen", role: "Senior AE", deals: 24, revenue: 412e3, productivity: 96, status: "active", avatar: "AC", department: "Sales" },
  { id: 2, name: "Maya Singh", role: "Account Executive", deals: 19, revenue: 318e3, productivity: 91, status: "remote", avatar: "MS", department: "Sales" },
  { id: 3, name: "Jordan Lee", role: "SDR", deals: 31, revenue: 184e3, productivity: 88, status: "active", avatar: "JL", department: "Sales" },
  { id: 4, name: "Priya Raman", role: "Solutions Eng", deals: 12, revenue: 24e4, productivity: 84, status: "remote", avatar: "PR", department: "Engineering" },
  { id: 5, name: "Tom Becker", role: "Designer", deals: 0, revenue: 0, productivity: 78, status: "on-leave", avatar: "TB", department: "Design" },
  { id: 6, name: "Lena Wu", role: "Product Manager", deals: 0, revenue: 0, productivity: 93, status: "active", avatar: "LW", department: "Product" },
  { id: 7, name: "Marcus Bell", role: "Support Lead", deals: 0, revenue: 0, productivity: 87, status: "active", avatar: "MB", department: "Support" },
  { id: 8, name: "Sarah Mitchell", role: "Marketing Lead", deals: 0, revenue: 0, productivity: 90, status: "remote", avatar: "SM", department: "Marketing" }
];
const salesKpis = [
  { label: "Pickup Rate", value: "78%", change: "+5%" },
  { label: "Qualified Leads", value: "146", change: "+12" },
  { label: "Missing Ratio", value: "9%", change: "-2%" },
  { label: "Proposal Sent", value: "62", change: "+8" },
  { label: "Revenue", value: "$1.24M", change: "+18%" },
  { label: "Avg Closing Time", value: "21d", change: "-3d" }
];
const revenueSeries = [
  { month: "Jan", revenue: 82, forecast: 78 },
  { month: "Feb", revenue: 94, forecast: 90 },
  { month: "Mar", revenue: 110, forecast: 105 },
  { month: "Apr", revenue: 128, forecast: 120 },
  { month: "May", revenue: 142, forecast: 138 },
  { month: "Jun", revenue: 168, forecast: 155 },
  { month: "Jul", revenue: 184, forecast: 172 },
  { month: "Aug", revenue: 201, forecast: 190 },
  { month: "Sep", revenue: 218, forecast: 210 },
  { month: "Oct", revenue: 240, forecast: 228 },
  { month: "Nov", revenue: 262, forecast: 248 },
  { month: "Dec", revenue: 284, forecast: 270 }
];
const conversionSeries = [
  { name: "New", value: 380 },
  { name: "Contacted", value: 240 },
  { name: "Qualified", value: 146 },
  { name: "Proposal", value: 86 },
  { name: "Negotiation", value: 52 },
  { name: "Won", value: 34 }
];
export {
  conversionSeries as c,
  performers as p,
  revenueSeries as r,
  salesKpis as s
};
