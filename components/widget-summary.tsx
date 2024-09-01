import React, { ComponentType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { LucideProps } from "lucide-react";

interface Props {
  header: string;
  value: string | number;
  description: string;
  Icon: ComponentType<LucideProps>;
  href?: string;
}

export function SummaryWidget({
  header,
  value,
  Icon,
  description,
  href,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {href ? <Link href={href}>{header}</Link> : <>{header}</>}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
