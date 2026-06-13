import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$myfamily/financas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$myfamily/financas"!</div>
}
