import React, { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({
  children,
}: PageLayoutProps): React.ReactElement {
  return (
    <div className="w-full flex justify-center min-h-screen pt-8">
      <div className="max-w-4xl w-full flex flex-col space-y-4 px-8">
        {children}
      </div>
    </div>
  );
}
