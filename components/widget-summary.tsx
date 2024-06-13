import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  header: string;
  value: string | number;
  description: string;
  icon: React.JSX.Element;
}

export function SummaryWidget({ header, value, icon, description }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{header}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
