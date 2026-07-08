import { createContext, useContext, useState, useCallback } from 'react';

const EnquiryModalContext = createContext(null);

export function useEnquiryModal() {
  const ctx = useContext(EnquiryModalContext);
  if (!ctx) throw new Error('useEnquiryModal must be used within EnquiryModalProvider');
  return ctx;
}

export function EnquiryModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const openEnquiry = useCallback(() => setIsOpen(true), []);
  const closeEnquiry = useCallback(() => setIsOpen(false), []);
  return (
    <EnquiryModalContext.Provider value={{ isOpen, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryModalContext.Provider>
  );
}
