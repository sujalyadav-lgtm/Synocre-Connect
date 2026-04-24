
export const mockKPIs = [
  { label: 'Total Revenue', value: '$1,284,500', trend: '+12.5%', status: 'up' },
  { label: 'Active Orders', value: '432', trend: '+5.2%', status: 'up' },
  { label: 'Inventory Value', value: '$840,200', trend: '-2.1%', status: 'down' },
  { label: 'Pending Shipments', value: '28', trend: '+18%', status: 'up' },
];

export const mockOrders = [
  { id: 'ORD-1001', customer: 'Acme Corp', status: 'Shipped', amount: '$12,400', date: '2023-10-25' },
  { id: 'ORD-1002', customer: 'Globex Ltd', status: 'Processing', amount: '$8,200', date: '2023-10-26' },
  { id: 'ORD-1003', customer: 'Soylent Inc', status: 'Pending', amount: '$2,100', date: '2023-10-27' },
  { id: 'ORD-1004', customer: 'Initech', status: 'Shipped', amount: '$15,000', date: '2023-10-27' },
  { id: 'ORD-1005', customer: 'Hooli', status: 'Cancelled', amount: '$4,500', date: '2023-10-28' },
];

export const mockCustomers = [
  { id: 'CUST-001', name: 'Acme Corp', industry: 'Manufacturing', orders: 12, value: '$145,000' },
  { id: 'CUST-002', name: 'Globex Ltd', industry: 'Technology', orders: 8, value: '$92,400' },
  { id: 'CUST-003', name: 'Soylent Inc', industry: 'Food Service', orders: 4, value: '$12,100' },
  { id: 'CUST-004', name: 'Initech', industry: 'Consulting', orders: 25, value: '$450,000' },
];

export const mockInventory = [
  { sku: 'SYN-X100', name: 'Standard Widget', stock: 1240, status: 'In Stock', price: '$12.00' },
  { sku: 'SYN-Y200', name: 'Premium Sprocket', stock: 45, status: 'Low Stock', price: '$45.00' },
  { sku: 'SYN-Z300', name: 'Deluxe Flux', stock: 0, status: 'Out of Stock', price: '$120.00' },
  { sku: 'SYN-A400', name: 'Basic Bolt', stock: 15400, status: 'In Stock', price: '$0.50' },
];

export const erpSampleDataString = `
Current Month Sales Performance:
- Region North: $450k (Exceeding target by 15%)
- Region South: $280k (Short of target by 5%)
- Region East: $320k (On track)

Inventory Alerts:
- Low stock for SYN-Y200 (45 units remaining, threshold 100)
- Overstock for SYN-A400 (15,400 units, threshold 8,000)

Top Customers:
1. Initech ($450k)
2. Acme Corp ($145k)
3. Globex Ltd ($92k)

Processing Delay:
Order fulfillment time increased by 14% this week due to warehouse maintenance.
`;
