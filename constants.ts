import { BudgetLine, RequestItem, RequestType, Status, Department, Vehicle, Tender } from './types';

export const MOCK_BUDGET: BudgetLine[] = [
  { id: '1', code: '230101', description: 'Office Building Maintenance', type: 'Recurrent', allocated: 50000000, utilized: 12500000, balance: 37500000 },
  { id: '2', code: '230102', description: 'ICT Infrastructure Upgrade', type: 'Capital', allocated: 150000000, utilized: 45000000, balance: 105000000 },
  { id: '3', code: '230103', description: 'Vehicle Fueling & Lubricants', type: 'Recurrent', allocated: 25000000, utilized: 18000000, balance: 7000000 },
  { id: '4', code: '230104', description: 'Security Services & Allowances', type: 'Recurrent', allocated: 30000000, utilized: 28000000, balance: 2000000 },
];

export const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', plateNumber: 'FME-01-ABJ', model: 'Toyota Prada', driver: 'Musa Ibrahim', status: 'Active', fuelLevel: 75, nextServiceDate: '2024-06-15' },
  { id: '2', plateNumber: 'FME-04-ABJ', model: 'Toyota Hilux', driver: 'John Doe', status: 'Maintenance', fuelLevel: 10, nextServiceDate: '2024-05-20' },
  { id: '3', plateNumber: 'FME-12-LAG', model: 'Honda Accord', driver: 'Sarah Smith', status: 'Boarded', fuelLevel: 0, nextServiceDate: 'N/A' },
];

export const MOCK_TENDERS: Tender[] = [
  { id: '1', title: 'Renovation of Block C', category: 'Works', openingDate: '2024-05-01', closingDate: '2024-06-15', status: 'Open', bidsReceived: 12 },
  { id: '2', title: 'Supply of 500 Laptops', category: 'Goods', openingDate: '2024-04-01', closingDate: '2024-05-15', status: 'Evaluation', bidsReceived: 34 },
];

export const MOCK_REQUESTS: RequestItem[] = [
  {
    id: '101',
    referenceNo: 'REQ/2024/001',
    type: RequestType.VEHICLE_MAINTENANCE,
    department: Department.GENERAL_SERVICES,
    initiator: 'Transport Officer',
    dateSubmitted: '2024-05-18',
    description: 'Routine service for Toyota Hilux FME-04-ABJ',
    amount: 150000,
    status: Status.IN_REVIEW,
    slaDeadline: '2024-05-23',
    workflow: [
      { role: 'Transport Officer', status: 'approved', date: '2024-05-18' },
      { role: 'Chief Admin Officer (General Services)', status: 'current' },
      { role: 'Assistant Director (General Services)', status: 'pending' },
    ]
  },
  {
    id: '102',
    referenceNo: 'PAY/2024/089',
    type: RequestType.PAYMENT_VOUCHER,
    department: Department.FINANCE,
    initiator: 'Chief Accountant (Capital)',
    dateSubmitted: '2024-05-19',
    description: 'Payment for Cleaning Services - April 2024',
    amount: 2500000,
    status: Status.PENDING_APPROVAL,
    slaDeadline: '2024-05-24',
    workflow: [
      { role: 'Chief Accountant (Capital)', status: 'approved', date: '2024-05-19' },
      { role: 'Internal Audit (Prepayment)', status: 'current' },
      { role: 'Director (Finance)', status: 'pending' },
    ]
  },
  {
    id: '103',
    referenceNo: 'PROC/2024/012',
    type: RequestType.PROCUREMENT_NEED,
    department: Department.PROCUREMENT,
    initiator: 'Director (ICT)',
    dateSubmitted: '2024-05-10',
    description: 'Procurement of Internet Bandwidth',
    status: Status.APPROVED,
    slaDeadline: '2024-05-15',
    workflow: [
      { role: 'Director (ICT)', status: 'approved', date: '2024-05-10' },
      { role: 'Chief Procurement Officer (Needs)', status: 'approved', date: '2024-05-11' },
      { role: 'Director (Procurement)', status: 'approved', date: '2024-05-12' },
    ]
  }
];

export const ORGANOGRAM_ROLES = {
  [Department.INTERNAL_AUDIT]: ['Director (Internal Audit)', 'DD (Prepayment/System)', 'DD (Monitoring/Forensic)', 'AD (Prepayment)', 'Chief Accountant'],
  [Department.FINANCE]: ['Director (Finance)', 'DD (Capital)', 'DD (Revenue)', 'DD (Accounts)', 'DD (Fiscal)', 'Chief Accountant'],
  [Department.GENERAL_SERVICES]: ['Director (GS)', 'DD (GS)', 'AD (GS)', 'Chief Admin Officer', 'Transport Officer', 'CSO (Store)', 'CMO (Building)'],
  [Department.PROCUREMENT]: ['Director (Procurement)', 'DD (Capital Procurement)', 'DD (Recurrent Procurement)', 'AD (Tenders)', 'Chief Procurement Officer']
};