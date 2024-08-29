import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

interface CardDashContentProps {
  title: string;
  Icon: LucideIcon;
  cardContent: string | Promise<string>;
  cardDescription: string;
}

function CardDashContent({
  title,
  Icon,
  cardContent,
  cardDescription,
}: CardDashContentProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cardContent}</div>
        <p className="text-xs text-muted-foreground">{cardDescription}</p>
      </CardContent>
    </Card>
  );
}

export default CardDashContent;
