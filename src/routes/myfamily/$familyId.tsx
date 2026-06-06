import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/myfamily/$familyId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/myfamily/$familyId"!</div>
}
