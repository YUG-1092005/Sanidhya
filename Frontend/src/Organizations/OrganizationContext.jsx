import React, { createContext, useState, useContext } from "react";

const OrganizationContext = createContext();

export const useOrganization = () => useContext(OrganizationContext);

export const OrganizationProvider = ({ children }) => {
  const [currentOrgId, setCurrentOrgId] = useState(null);

  return (
    <OrganizationContext.Provider value={{ currentOrgId, setCurrentOrgId }}>
      {children}
    </OrganizationContext.Provider>
  );
};
