
export enum Department {
  // Service Departments
  FINANCE = 'Finance & Accounts',
  INTERNAL_AUDIT = 'Internal Audit',
  GENERAL_SERVICES = 'General Services',
  PROCUREMENT = 'Procurement',
  STORES = 'Stores & Inventory',
  
  // Offices
  MINISTER = 'Office of the Honourable Minister',
  MINISTER_STATE = 'Office of the Honourable Minister of State',
  PERM_SEC = 'Office of the Permanent Secretary',
  
  // Operational Departments & Units
  LEGAL = 'Legal Services',
  PRESS_PR = 'Press and Public Relations',
  LIBRARY = 'Library Services',
  SPECIAL_DUTIES = 'Special Duties',
  REFORMS = 'Reforms Coordination & Service Improvement',
  PLANNING_RD = 'Educational Planning, Research and Development',
  ICT = 'Information Communication and Technology (ICT)',
  FEQAS = 'Federal Education Quality Assurance Services',
  ESS = 'Educational Support Services',
  UNIVERSITY = 'University Education',
  COLLEGES_ED = 'Colleges of Education',
  POLYTECHNICS = 'Polytechnics and Other Allied Institutions',
  TECH_SCIENCE = 'Technology and Science Education',
  SSE = 'Senior Secondary Education',
  BASIC_ED = 'Basic Education',
  SCHOLARSHIP = 'Federal Scholarship Board'
}

export enum RequestType {
  VEHICLE_MAINTENANCE = 'Vehicle Maintenance',
  OFFICE_SPACE = 'Office Space Allocation',
  PROCUREMENT_NEED = 'Procurement Needs Assessment',
  PAYMENT_VOUCHER = 'Payment Voucher (Capital)',
  STORE_REQUISITION = 'Store Requisition',
  FUMIGATION = 'Fumigation Service',
  SECURITY_ALLOWANCE = 'Security Allowance'
}

export enum Status {
  DRAFT = 'Draft',
  PENDING_APPROVAL = 'Pending Approval',
  IN_REVIEW = 'In Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  COMPLETED = 'Completed'
}

export interface WorkflowStep {
  role: string;
  status: 'pending' | 'approved' | 'rejected' | 'current';
  date?: string;
  comment?: string;
}

export interface RequestItem {
  id: string;
  referenceNo: string;
  type: RequestType;
  department: Department;
  initiator: string;
  dateSubmitted: string;
  description: string;
  amount?: number;
  status: Status;
  workflow: WorkflowStep[];
  slaDeadline: string; // ISO Date
}

export interface BudgetLine {
  id: string;
  code: string;
  description: string;
  type: 'Capital' | 'Recurrent';
  allocated: number;
  utilized: number;
  balance: number;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  driver: string;
  status: 'Active' | 'Maintenance' | 'Boarded';
  fuelLevel: number; // percentage
  nextServiceDate: string;
}

export interface Tender {
  id: string;
  title: string;
  category: 'Works' | 'Goods' | 'Services';
  openingDate: string;
  closingDate: string;
  status: 'Open' | 'Evaluation' | 'Awarded';
  bidsReceived: number;
}
