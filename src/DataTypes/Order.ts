/**
 * Contact information from the request
 */
export interface IContactRequest {
  mobileNumber: string;
  email: string;
  receiveUpdates?: boolean;
}

/**
 * Address information from the request
 */
export interface IAddressRequest {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  pincode: string;
}

/**
 * Individual order item
 */
export interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  unitPrice: number;
  discount: number;
}

/**
 * Order details from the request
 */
export interface IOrderRequest {
  items: IOrderItem[];
  grandTotal: number;
}

/**
 * Metadata for the order
 */
export interface IOrderMeta {
  source: 'cart' | 'buy_now';
  couponCode?: string | null;
  giftWrap?: boolean;
  giftMessage?: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Complete request body for createBill
 */
export interface ICreateBillRequest {
  contact: IContactRequest;
  address: IAddressRequest;
  order: IOrderRequest;
  meta?: IOrderMeta;
}

// ============================================
// DATABASE INTERFACES (stored in MongoDB)
// ============================================

/**
 * Contact information stored in database
 */
export interface IContact {
  name: string;
  email: string;
  receiveUpdates: boolean;
  mobileNumber: string; // Normalized phone number
}

/**
 * Address information stored in database
 */
export interface IAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

/**
 * User details stored with the bill
 */
export interface IUserDetails {
  contact: IContact;
  address: IAddress;
}

/**
 * Payment transaction details
 */
export interface ITransaction {
  transactionId: string;
  paymentId: string;
  orderId: string;
  signature: string;
  method: 'card' | 'upi' | 'wallet' | 'netbanking' | 'emi';
  paidAt: Date | string;
  failedAt?: Date | string;
}

/**
 * Bill status enum
 */
export enum BillStatus {
  NOT_PAID = 'not_paid',
  PAID = 'paid',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
  PENDING = 'pending'
}

/**
 * Complete bill document stored in MongoDB
 */
export interface IBill {
  _id?: string; // MongoDB ObjectId as string
  userId: string;
  amount: number;
  items: IOrderItem[];
  status: BillStatus | 'not_paid' | 'paid' | 'refunded' | 'cancelled' | 'pending';
  transaction: ITransaction | null;
  meta: IOrderMeta;
  created_at: Date | string;
  updated_at?: Date | string;
  userDetails: IUserDetails;
}

// ============================================
// RESPONSE INTERFACES
// ============================================

/**
 * Success response from createBill
 */
export interface ICreateBillResponse {
  success: true;
  billId: string;
}

/**
 * Error response
 */
export interface IErrorResponse {
  success?: false;
  error: string;
  details?: any;
}

/**
 * Get bill response
 */
export interface IGetBillResponse {
  success: true;
  data: IBill;
}

/**
 * List bills response
 */
export interface IListBillsResponse {
  success: true;
  data: IBill[];
  total: number;
  page: number;
  limit: number;
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Partial bill update (for PATCH operations)
 */
export type IUpdateBill = Partial<Omit<IBill, '_id' | 'userId' | 'created_at'>>;

/**
 * Bill with required fields for creation
 */
export type ICreateBill = Omit<IBill, '_id' | 'created_at' | 'updated_at'>;

/**
 * Bill query filters
 */
export interface IBillQueryFilters {
  userId?: string;
  status?: BillStatus | string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: Date | string;
  endDate?: Date | string;
  source?: 'cart' | 'buy_now';
}

/**
 * Pagination options
 */
export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: keyof IBill;
  sortOrder?: 'asc' | 'desc';
}