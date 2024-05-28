import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./App.css";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    async function fetchTotalSpend() {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.totalSpend);
    }
    fetchTotalSpend();
  }, []);

  return (
    <>
      <Card className="w-[350px] m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent}</p>
        </CardContent>
        <CardFooter>
          <Button>Button</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default App;
