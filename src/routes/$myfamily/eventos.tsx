import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$myfamily/eventos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$myfamily/eventos"!</div>
}
