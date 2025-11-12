"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function DemoUser({
  onSelectDemo,
}: {
  onSelectDemo: (type: "user" | "admin") => void;
}) {
  return (
    <RadioGroup
      defaultValue=""
      onValueChange={(value) => {
        if (value === "user") onSelectDemo("user");
        if (value === "admin") onSelectDemo("admin");
      }}
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value="user" id="r2" />
        <Label htmlFor="r2">Demo User</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="admin" id="r3" />
        <Label htmlFor="r3">Demo Admin</Label>
      </div>
    </RadioGroup>
  );
}
