// Database module — re-exports from local-first adapter
// All pages import from here, so switching backends only requires changing this file.
export {
  getCustomers,
  createCustomer,
  getProducts,
  createProduct,
  getOrders,
  createOrder,
  receivePurchaseOrder,
  getSession,
  setSession,
  clearSession,
} from "@/lib/local-db";
