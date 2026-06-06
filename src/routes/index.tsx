// src/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Bell, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Progress } from "~/components/ui/progress";

const filePath = "count.txt";

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0"),
  );
}

const getCount = createServerFn({
  method: "GET",
}).handler(() => {
  return readCount();
});

const updateCount = createServerFn({ method: "POST" })
  .inputValidator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();
  const [count, setCounter] = useState(0);

  const handle = () => {
    setCounter(count + 1);
  };

  const [progress, setProgress] = React.useState(13);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className="px-6 py-2 flex justify-between items-center">
        <Link to="/" className="font-bold text-3xl text-primary">
          Family Hearth
        </Link>
        <nav className="space-x-12 font-semibold">
          <Link
            to="#"
            className="text-primary border-2 border-t-0 border-r-0 border-l-0 font-bold pb-1"
          >
            Inicio
          </Link>
          <Link
            to="#"
            className="text-on-surface-variant hover:text-primary hover:border-2 hover:border-t-0 hover:border-r-0 hover:border-l-0 pb-1 duration-100"
          >
            Funcionalidade
          </Link>
          <Link
            to="#"
            className="text-on-surface-variant hover:text-primary hover:border-2 hover:border-t-0 hover:border-r-0 hover:border-l-0 pb-1 duration-100"
          >
            Sobre
          </Link>
        </nav>
        <div className="flex gap-x-3 items-center">
          <Search className="text-primary font-bold size-5 cursor-pointer" />
          <Bell className="text-primary font-bold size-5 cursor-pointer" />
          <Settings className="text-primary font-bold size-5 cursor-pointer" />
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CFA</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="px-6 py-40">
        <div className="flex items-center justify-between">
          <div className="space-y-6 w-xl">
            <span className="px-18 py-1 bg-destructive/20 rounded-full font-semibold">
              O coração da sua família online
            </span>
            <h1 className="font-bold text-5xl text-primary mt-8">
              Reúna quem você ama em um espaço só.
            </h1>
            <p className="text-chart-3">
              O Digital Hearth é o lugar seguro e acolhedor para coordenar
              eventos, compartilhar finanças e manter a união familiar viva, não
              importa a distância.
            </p>
            <div className="pt-4 space-x-3">
              <Button className="px-8 py-6 font-bold rounded-md">
                Criar página famíliar
              </Button>
              <Button className="px-8 py-6 font-bold rounded-md bg-background text-foreground border-border hover:bg-accent">
                Saiba mais
              </Button>
            </div>
          </div>
          <div className="w-3xl flex justify-center items-center">
            <div className=" p-3 w-xl rotate-3 bg-white rounded-md shadow">
              <div className="h-100 border-yellow-500 bg-foreground/40 rounded-md">
                img
              </div>
              <div className="p-6 space-y-2">
                <div className="text-primary text-2xl font-semibold">
                  Próximo Evento: Natal 2024
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[14px] text-chart-2">
                    <span>Meta de Arrecadação</span>
                    <span>1.456 kz / 2.000 Kz</span>
                  </div>
                  <Progress value={progress} className="w-full h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-10 py-20"></div>
      </main>
      <Button onClick={handle}>Add 1 = {count}</Button>
    </>
  );
}
