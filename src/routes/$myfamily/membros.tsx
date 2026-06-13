import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$myfamily/membros')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$myfamily/membros"!</div>
}
