
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProjectValidationView() {
  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-7xl mx-auto w-full">
        <Card>
          <CardHeader>
            <CardTitle>Project Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Project Validation View - Content Coming Soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
