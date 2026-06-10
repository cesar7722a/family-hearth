// src/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Bell,
  CalendarDays,
  NotebookTabs,
  Search,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Progress } from "~/components/ui/progress";
import { Image } from "@unpic/react";

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
        <div className="px-10 py-20 space-y-14 bg-[#F8F9FA]">
          <div className="text-center">
            <h2 className="font-bold text-[32px] text-primary">
              Tudo o que sua família precisa
            </h2>
            <h3 className="text-center text-chart-2 text-lg">
              Ferramentas desenhadas para serem intuitivas para todas as
              gerações, dos netos aos avós.
            </h3>
          </div>
          <div className="space-y-12">
            <div className="flex justify-between items-center gap-10">
              <div className="rounded-md px-12 py-20 bg-background shadow-md flex items-center justify-between w-210">
                <div className="space-y-2 w-80.75">
                  <div className="bg-[#CCEACC] size-14 flex justify-center items-center rounded-md">
                    <NotebookTabs className="text-[#47614A]" />
                  </div>
                  <h2 className="font-semibold text-2xl text-primary">
                    Finanças Transparentes
                  </h2>
                  <p className="text-chart-2">
                    Gerencie contribuições para festas, viagens ou presentes
                    coletivos com clareza total. Sem cobranças desconfortáveis,
                    apenas colaboração.
                  </p>
                </div>

                <div className="bg-[#F3F4F5] p-6 w-86.75 h-43 rounded-md ">
                  <div className="space-y-2">
                    <div className="p-3 flex justify-between items-center bg-background rounded-md">
                      <div className="flex items-center gap-x-2">
                        <span className="bg-[#D5E3FF] size-8 flex rounded-full" />
                        <span className="text-[14px] text-chart-3">
                          Tia Maria
                        </span>
                      </div>
                      <span className="font-bold text-primary">150,00 Kz</span>
                    </div>

                    <div className="p-3 flex justify-between items-center bg-background rounded-md">
                      <div className="flex items-center gap-x-2">
                        <span className="bg-[#CCEACC] size-8 flex rounded-full" />
                        <span className="text-[14px] text-chart-3">
                          Primo João
                        </span>
                      </div>
                      <span className="font-bold text-primary">150,00 Kz</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#47614A] flex-1 p-12 rounded-md">
                <div className="space-y-2 text-background">
                  <div className="size-14 bg-[#5F7A61] rounded-md flex justify-center items-center">
                    <CalendarDays className="text-[#EFFFEC] size-5" />
                  </div>
                  <h3 className="font-semibold text-2xl">
                    Eventos Organizados
                  </h3>
                  <p>
                    Datas importantes, listas de tarefas e confirmações de
                    presença em um calendário compartilhado que todos conseguem
                    usar.
                  </p>
                </div>
                <div className="pt-12 flex">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <span
                      key={index}
                      className="size-10 bg-[#E7E8E9] rounded-full flex justify-center items-center z-10 -ml-3.5 border-2 border-[#5F7A61]"
                    />
                  ))}

                  <span className="size-10 bg-[#5F7A61] text-background rounded-full flex justify-center items-center z-30 -ml-3.5 border-2 border-[#5F7A61]">
                    +12
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-x-10">
              <div className="p-12 w-[384px] h-77.5 shadow rounded-md">
                <div className="space-y-2">
                  <div className="size-14 bg-[#D5E3FF] rounded-md flex justify-center items-center">
                    <Users className="text-[#505F79] size-5" />
                  </div>
                  <h3 className="font-semibold text-2xl text-primary">
                    União Familiar
                  </h3>
                  <p className="text-chart-2">
                    Mantenha as memórias vivas em um feed privado, longe do
                    ruído das redes sociais tradicionais.
                  </p>
                </div>
                <Progress value={progress} className="w-full h-2 mt-6" />
              </div>
              <div className="bg-[#E7E8E9] flex-1 rounded-md p-12">
                <div className="mt-12 flex justify-center gap-x-12 items-center">
                  <div className="w-85.5 space-y-3">
                    <h3 className="text-2xl font-semibold text-primary">
                      Privacidade em Primeiro Lugar
                    </h3>
                    <p className="text-chart-2">
                      Seus dados e fotos pertencem à sua família. Segurança de
                      nível bancário para suas finanças e memórias.
                    </p>
                  </div>
                  <div className="size-87 rounded-md">
                    <Image
                      src="../../public/imagemfamlyhearthmankey.png"
                      width={400}
                      height={400}
                      alt="A lovely bath"
                      className="rounded-t-md rounded-r-md rounded-b-md rounded-l-md size-87 mt-8 flex z-20 ml-25"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-20 px-10">
          <h3 className="text-4xl font-bold text-center text-primary">
            Acompanhe o Ritmo da sua Família
          </h3>
          <div className="flex justify-between items-center">
            <div>circle</div>
            <div className="w-xl">
              <div className="flex justify-between">
                <span className="bg-[#CCEACC] size-12 rounded-sm flex justify-center items-center">
                  <TrendingUp className="text-[#47614A]" />
                </span>
                <div>
                  <h4 className="font-semibold text-2xl text-primary">
                    Family Pulse
                  </h4>
                  <p className="leading-6 text-chart-2">
                    Uma visualização clara da saúde financeira e do engajamento
                    da sua família em projetos comuns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Button onClick={handle}>Add 1 = {count}</Button>
    </>
  );
}
